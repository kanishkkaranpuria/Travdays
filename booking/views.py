from os import pardir
from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
import json
from authentication.views import RegisterUserView

# class BookingView(APIView):

#     permission_classes = [AllowAny]

#     def post(self,request,*args, **kwargs):
#         if request.user.is_anonymous:
#             response = RegisterUserView().post(request, *args, **kwargs)
#             return Response(response.data, response.status_code)
#         else:
#             pass
#         return Response({'message': 'okay'})
class BookingView(APIView):

    def post(self,request,*args, **kwargs):
        user = request.user
        trip = Trip.objects.filter(name = request.data["trip"]).first()
        if trip == None:
            return Response({"error":"Trip doesn't exist"},status=status.HTTP_400_BAD_REQUEST)
        phone = request.data["phone"]
        obj = Booking(user = user, trip = trip, phoneNumber = phone)
        obj.save()
        return Response({"success":"Booking created"},status=status.HTTP_200_OK)
