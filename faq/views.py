from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import FaqQuestionSerializer,FaqAnswerSerializer
from rest_framework import status
from .pagination import FaqPagination

class FaqQuestion(APIView,FaqPagination):

    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self,request):
        qs = FAQ.objects.all()
        results = self.paginate_queryset(qs, request, view=self)
        serializer = FaqQuestionSerializer( results, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class FaqAnswer(APIView,FaqPagination):

    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self,request,pk):
        obj = FAQ.objects.get(id = pk)
        serializer = FaqAnswerSerializer(obj)
        return Response(serializer.data, status = status.HTTP_200_OK)
