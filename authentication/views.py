from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status


class UserAuthenticationStatus(APIView):

    permission_classes = [AllowAny]

    def get(self,request):
        bool = request.user.is_authenticated
        return Response({'authenticated':bool}, status=status.HTTP_200_OK)