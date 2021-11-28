from rest_framework.decorators import APIView, permission_classes
from rest_framework.response import Response
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
import random
from database.models import *

User = get_user_model()

class ConfirmChangePassword(APIView):      #1st step : sending OTP in the email address to confirm if the user actually wants to change the password

    permission_classes = [AllowAny]

    def post(self, request):  
        print("1stran", request.data["email"])  
        if request.user.is_authenticated:
            user = request.user
        else:
            user = User.objects.filter(email = request.data["email"])
            if user.exists():
                user = user.first()
            else:
                return Response({'error':'Incorrect email id'}, status=status.HTTP_400_BAD_REQUEST)
        email_subject = 'Password Reset'
        if Otp.objects.filter(user=user).exists():
            user.otp.delete()
        if Temp.objects.filter(user=user).exists():
            user.temp.delete()
        otp = Otp.objects.create(user=user,otp = random.randint(111111,9999999))
        otp.save()
        email_body = render_to_string('passwordOtp.html',
        {
            'user' : user,
            'OTP': otp.otp
        })
        email_message = EmailMessage(
            email_subject,
            email_body,                             
            settings.EMAIL_HOST_USER,
            [user.email],
        )
        email_message.fail_silently = False
        email_message.send()
        print('change password class ran')
        return Response({'success':'Password Reset Request Sent'}, status=status.HTTP_200_OK)


class PasswordOtpVerify(APIView):        #2nd step : checking if entered OTP is correct

    permission_classes = [AllowAny]

    def post(self,request, *args, **kwargs):
        print(request.user.is_authenticated)
        print(request.user)
        if request.user.is_authenticated:
            user = request.user
        else:
            user = User.objects.filter(email = request.data["email"])
            if user.exists():
                user = user.first()
            else:
                return Response({'error':'Incorrect email id'}, status=status.HTTP_400_BAD_REQUEST)
        verification = request.data['verificationpin']
        if Otp.objects.filter(user=user).exists():
            otp1 = Otp.objects.get(user=user)
            if str(verification) == str(otp1):
                if Temp.objects.filter(user=user).exists():
                    user.temp.delete()
                temp = Temp.objects.create(user = user)
                temp.save()
                otp1.delete()
                user.save()
                return Response({"success":"otp verified"},status=status.HTTP_200_OK)
            return Response({"error":"otp doesn't match"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"please request for a new otp"},status=status.HTTP_400_BAD_REQUEST)


class NewPasswordSet(APIView):             #3rd step : changing the password

    permission_classes = [AllowAny]

    def post(self,request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
        else:
            user = User.objects.filter(email = request.data["email"])
            if user.exists():
                user = user.first()
            else:
                return Response({'error':'Incorrect email id'}, status=status.HTTP_400_BAD_REQUEST)
        if Temp.objects.filter(user = user).exists():
            password = request.data['password']
            password2 = request.data['password2']
            if  password2 == password:
                if len(password) >= 8 :
                    user.set_password(request.data['password']) 
                    user.save()
                    user.temp.delete()
                    return Response({"success":"Password successfully changed"},status=status.HTTP_200_OK)
                else:
                    return Response({"error":"Password must have at least 8 characters"},status=status.HTTP_400_BAD_REQUEST)
            return Response({"error":"Passwords do not match"},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)