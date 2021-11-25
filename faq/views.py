from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import FaqQuestionSerializer,FaqAnswerSerializer,FaqSerializer
from rest_framework import serializers, status
from .pagination import FaqPagination

class FaqQuestion(APIView,FaqPagination):

    permission_classes = [AllowAny]
    
    def get(self,request):
        qs = FAQ.objects.all()
        results = self.paginate_queryset(qs, request, view=self)
        serializer = FaqQuestionSerializer( results, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class FaqAnswer(APIView,FaqPagination):

    permission_classes = [AllowAny] 

    def get(self,request,pk):
        obj = FAQ.objects.get(id = pk)
        serializer = FaqAnswerSerializer(obj)
        return Response(serializer.data, status = status.HTTP_200_OK)


class Faq(APIView,FaqPagination):

    def get(self, request, pk = None):
        if request.user.is_admin:
            if pk == None:
                faq = FAQ.objects.all()
                results = self.paginate_queryset(faq, request, view=self)
                serializer = FaqSerializer(results,many = True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif FAQ.objects.filter(id = pk).exists():
                faq = FAQ.objects.get(id = pk)
                serializer = FaqSerializer(faq)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid input"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if request.user.is_admin:
            serializer = FaqSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"values changed"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self,request):
        if request.user.is_admin:
            faq = FAQ.objects.get(id = request.data["id"])
            serializer = FaqSerializer(faq,data = request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"values changed"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk = None):
        if request.user.is_admin:
            if pk != None:
                faq = FAQ.objects.get(id = pk)
                faq.delete()
                return Response({'success':'faq deleted'})
            return Response({'error':'choose an faq that needs to be deleted'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 