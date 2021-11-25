from os import pardir
from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from authentication.views import RegisterUserView
from datetime import datetime, timedelta
from .pagination import BookingPagination
from .serializers import BookingSerializer

class BookingView(APIView):

    permission_classes = [AllowAny]

    def post(self,request,*args, **kwargs):

        deltaTime = datetime.now() - timedelta(days=1)
        qs = Booking.objects.filter(Q(user__active=False) & Q(created__lt=deltaTime))
        qs.delete()
        
        user = None
        if request.user.is_anonymous:
            response = RegisterUserView().post(request, *args, **kwargs)
            user = User.objects.get(email = request.data["email"])
        else:
            user = request.user
        trip = Trip.objects.filter(name = request.data["trip"]).first()
        if trip == None:
            return Response({"error":"Trip doesn't exist"},status=status.HTTP_400_BAD_REQUEST)
        phone = request.data["phone"] if 'phone' in request.data else None
        query = request.data["query"] if 'query' in request.data else None
        if request.user.is_anonymous:
            if response.status_code == 400:
                return Response(response.data, response.status_code)
            elif response.status_code == 201:
                obj = Booking(user = user, trip = trip, phoneNumber = phone, query = query )
                obj.save()
                return Response({"success":"Your Account has been Created. An OTP has been sent in your email, please verify your account using that OTP to confirm your Booking"}, response.status_code)
        return Response({"success":"Booking created"},status=status.HTTP_200_OK)


class BookingAdminView(APIView,BookingPagination):

    def get(self, request, pk = None):
        if request.user.is_admin:
            if pk == None:
                booking = Booking.objects.all()
                results = self.paginate_queryset(booking, request, view=self)
                serializer = BookingSerializer(results,many = True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif Booking.objects.filter(id = pk).exists():
                booking = Booking.objects.get(id = pk)
                serializer = BookingSerializer(booking)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid input"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     if request.user.is_admin:
    #         serializer = BookingSerializer(data = request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response({"success":"values changed"}, status=status.HTTP_200_OK)
    #         else:
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self,request):
        if request.user.is_admin:
            booking = Booking.objects.get(id = request.data["id"])
            data = {}
            data["approved"] = request.data["approved"]
            serializer = BookingSerializer(booking,data = data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"values changed"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk = None):
        if request.user.is_admin:
            if pk != None:
                booking = Booking.objects.get(id = pk)
                booking.delete()
                return Response({'success':'booking deleted'})
            return Response({'error':'choose a booking that needs to be deleted'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 
