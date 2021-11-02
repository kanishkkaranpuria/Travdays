from os import pardir
from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from authentication.views import RegisterUserView
from datetime import datetime, timedelta

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


# class BookingView(APIView):

#     def post(self,request,*args, **kwargs):
#         user = request.user
#         trip = Trip.objects.filter(name = request.data["trip"]).first()
#         if trip == None:
#             return Response({"error":"Trip doesn't exist"},status=status.HTTP_400_BAD_REQUEST)
#         phone = request.data["phone"]
#         obj = Booking(user = user, trip = trip, phoneNumber = phone)
#         obj.save()
#         return Response({"success":"Booking created"},status=status.HTTP_200_OK)
