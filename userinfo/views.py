from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import UserSerializer,EditInfoSerializer


class UserAuthenticationStatus(APIView):

    permission_classes = [AllowAny]

    def get(self,request):
        bool = request.user.is_authenticated
        admin = False
        if bool:
            admin = request.user.is_admin
        return Response({'authenticated':bool,'admin':admin}, status=status.HTTP_200_OK)

class UserView(APIView):

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self,request):
        user = request.user
        data = {}
        data['name'] = request.data["name"]
        serializer = EditInfoSerializer(user, data = data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":"Name changed successfully"}, status=status.HTTP_200_OK)            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)