import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from django.views.decorators.csrf import csrf_protect
from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import UserSerializer
from rest_framework import exceptions
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .utils import generate_access_token, generate_refresh_token
import datetime,random

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
User = get_user_model()


class UserAuthenticationStatus(APIView):

    permission_classes = [AllowAny]

    def get(self,request):
        bool = request.user.is_authenticated
        return Response({'authenticated':bool}, status=status.HTTP_200_OK)

class UserInfoView(APIView):

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class LoginView(APIView):

    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def post(self,request, *args, **kwargs):
        response = Response()
        email = request.data.get('email')
        password = request.data.get('password') if 'password' in request.data else None
        if (email is None) :
            return Response({"error":"email required"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email=email).first()
        if(user is None):
            return Response({"error":"user not found"}, status=status.HTTP_400_BAD_REQUEST)
        if (password is not None) and (not user.check_password(password)):
            return Response({"error":"wrong password"}, status=status.HTTP_400_BAD_REQUEST)
        if (password is None):
            otp = request.data["otp"]
            otp1 = Otp.objects.get(user__email = email) 
            if (otp!=otp1.otp):
                return Response({"error":"wrong OTP"}, status=status.HTTP_400_BAD_REQUEST)
            otp1.delete()
        serializer = UserSerializer(user)
        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)
        if WhitelistedTokens.objects.filter(user = user).exists():
            a = WhitelistedTokens.objects.get(user = user)
            a.delete()
        token = WhitelistedTokens(token = refresh_token, user = user)
        token.save()
        response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
        response.data = {'access_token': access_token,'user': serializer.data,}
        return response

class LogoutView(APIView):
    
    def get(self,request):
        refresh_token = request.COOKIES.get('refreshtoken')
        if refresh_token:
            token = WhitelistedTokens.objects.filter(token = refresh_token).first()
            if (token is None):
                if WhitelistedTokens.objects.filter(user = request.user).exists():
                    a = WhitelistedTokens.objects.get(user = request.user)
                    a.delete()
            else:
                token.delete()
            return Response({"Success":"Logout"}, status = status.HTTP_200_OK)
        return Response({"message":"SignIn before you SignOut"}, status = status.HTTP_200_OK)

class Refresh_Token_View(APIView):

    permission_classes = [AllowAny]

    @method_decorator(csrf_protect)
    def get(self,request):
        '''
        To obtain a new access_token this view expects 2 important things:
            1. a cookie that contains a valid refresh_token
            2. a header 'X-CSRFTOKEN' with a valid csrf token, client app can get it from cookies "csrftoken"
        '''
        now =  datetime.datetime.now().astimezone()
        refresh_token = request.COOKIES.get('refreshtoken')
        if refresh_token is None:
            raise exceptions.AuthenticationFailed('Authentication credentials were not provided.')
        obj = WhitelistedTokens.objects.filter(token = refresh_token).first()
        if obj.expiry<now:
            obj.delete()
        bool = WhitelistedTokens.objects.filter(token = refresh_token).exists()
        if not (bool):
            return Response({"Error":"Token doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)
        elif bool:
            try:
                payload = jwt.decode(
                    refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise exceptions.AuthenticationFailed('expired refresh token, please login again.')
            user = User.objects.filter(id=payload.get('user_id')).first()
            if user is None:
                raise exceptions.AuthenticationFailed('User not found')
            if not user.is_active:
                raise exceptions.AuthenticationFailed('user is inactive')
            access_token = generate_access_token(user)
            return Response({'access_token': access_token})
        return Response({'Error':"Glitch"}, status = status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        special_characters = '''"!@#$%^&*()-+?_=,<>'/'''
        data = request.data
        name = data['name']
        email = data['email']
        if any(char in special_characters for char in name):
            return Response({"error":"name cannot have special characters"}, status= status.HTTP_400_BAD_REQUEST)
        else:
            if ('password' or 'password2') in data:
                print("you came here")
                if not ('password' and 'password2') in data:
                    return Response({'error': 'something went wrong'},status=status.HTTP_400_BAD_REQUEST) 
                password = data['password']
                password2 = data['password2']
                if password != password2:
                    return Response({'error': 'Passwords do not match'},status=status.HTTP_400_BAD_REQUEST)     
                if len(password) < 8:
                    return Response({'error': 'Password must have at least 8 characters'},status=status.HTTP_400_BAD_REQUEST) 
            if not User.objects.filter(email=email).exists():
                user = User(
                    name=name,
                    email = email,
                )
                user.set_password(data['password'] if ('password' in data) else None)
                user.save()
                if User.objects.filter(email=email).exists():
                    u = User.objects.get(email = email)
                    current_site = get_current_site(request)
                    email_subject = 'Account Activation'    
                    token = PasswordResetTokenGenerator().make_token(u) 
                    otp = Otp(user = user)
                    otp.otp = random.randint(111111,9999999)
                    otp.save()
                    print(u.id)
                    email_body = render_to_string('AccountActivation.html',
                    {
                        'user' : u,
                        'domain': 'localhost:3000',
                        'uid': urlsafe_base64_encode(force_bytes(u.id)),
                        'token': token,
                        'OTP': otp.otp
                    })
                    email_message = EmailMessage(
                        email_subject,
                        email_body,                             
                        settings.EMAIL_HOST_USER,
                        [u.email],
                    )
                    email_message.fail_silently = False
                    email_message.send()
                    return Response({'success': 'An OTP has been sent to your Email, Please enter it to activate your account'},status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'Something went wrong when trying to create account'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'error': 'Email already in use, Please login or use a different Email'},status=status.HTTP_400_BAD_REQUEST)
                        
     

class OTP_Validation(APIView):

    permission_classes = [AllowAny]

    def post(self,request, *args, **kwargs):
        otp = request.data['otp']
        user_email = request.data['email']
        user = User.objects.get(email = user_email)
        otp1 = Otp.objects.get(user=user)
        if str(otp) == str(otp1):
            user.is_active = True
            user.save()
            otp1.delete()
            return Response({"success":"User Account Activated"},status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class ActivateAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        try:
            uid = force_text(urlsafe_base64_decode(uid))
            user = User.objects.get(id=uid)
        except Exception as identifier:
            user = None
        if user is not None and PasswordResetTokenGenerator().check_token(user, token ):
            if Otp.objects.filter(user_id=uid).exists():
                user.otp.delete()
            user.is_active = True
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# @permission_classes([AllowAny])
# @csrf_protect
# def refresh_token_view(request):
#     '''
#     To obtain a new access_token this view expects 2 important things:
#         1. a cookie that contains a valid refresh_token
#         2. a header 'X-CSRFTOKEN' with a valid csrf token, client app can get it from cookies "csrftoken"
#     '''
#     User = get_user_model()
#     refresh_token = request.COOKIES.get('refreshtoken')
#     # print(refresh_token.expires)
#     if refresh_token is None:
#         raise exceptions.AuthenticationFailed('Authentication credentials were not provided.')
#     bool = WhitelistedTokens.objects.filter(token = refresh_token).exists()
#     if not (bool):
#         return Response({"Error":"Nice try"}, status = status.HTTP_400_BAD_REQUEST)
#     elif bool:
#         try:
#             payload = jwt.decode(
#                 refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise exceptions.AuthenticationFailed('expired refresh token, please login again.')
#         user = User.objects.filter(id=payload.get('user_id')).first()
#         if user is None:
#             raise exceptions.AuthenticationFailed('User not found')
#         if not user.is_active:
#             raise exceptions.AuthenticationFailed('user is inactive')
#         access_token = generate_access_token(user)
#         return Response({'access_token': access_token})
#     return Response({'Error':"Glitch"}, status = status.HTTP_400_BAD_REQUEST)