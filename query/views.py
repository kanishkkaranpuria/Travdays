from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import CreateQuerySerializer
from rest_framework import status


class CreateQueryView(APIView):

    permission_classes = [AllowAny]

    def get(self,request):
        data = {}
        for i in Query.MY_CHOICES:
            data[i[0]] = i[1]

        # return Response(Query.MY_CHOICES)
        return Response(data)
    def post(self,request):
        data = {}
        if request.user.is_authenticated:
            data["email"] = request.user.email
            data["name"] = request.user.name
            data["user"] = request.user.id
        else:
            data["email"] = request.data["email"]
            data["name"] = request.data["name"]
        data["query"] = request.data["query"]
        data["choice"] = request.data["choice"]
        if "phoneNumber" in request.data:
            data["phoneNumber"] = request.data["phoneNumber"]
        serializer = CreateQuerySerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success':'Query Created'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)