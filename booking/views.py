from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .pagination import BookingPagination
from .serializers import BookingSerializer,PreviousBookingSerializer

class BookingView(APIView):

    permission_classes = [AllowAny]

    def post(self,request):
        user = request.user
        phone = request.data["phone"] if 'phone' in request.data else None
        query = request.data["query"] if 'query' in request.data else None
        trip = Trip.objects.filter(name = request.data["trip"])
        if trip.exists():
            trip = trip.first()
        else:
            return Response({"error":"invalid input"},status=status.HTTP_400_BAD_REQUEST)
        obj = Booking(user = user, trip = trip, phoneNumber = phone, query = query )
        obj.save()
        return Response({"success":"Booking created"},status=status.HTTP_200_OK)

class PreviousBookingView(APIView,BookingPagination):

    def get(self, request):
        user = request.user
        bookings = Booking.objects.filter(user = user).order_by("-created")
        results = self.paginate_queryset(bookings, request, view=self)
        serializer = PreviousBookingSerializer(results,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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