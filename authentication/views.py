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
import datetime

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
        password = request.data.get('password')
        if (email is None) or (password is None):
            return Response({"error":"email and password required"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email=email).first()
        if(user is None):
            return Response({"error":"user not found"}, status=status.HTTP_400_BAD_REQUEST)
        if (not user.check_password(password)):
            return Response({"error":"wrong password"}, status=status.HTTP_400_BAD_REQUEST)
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
    