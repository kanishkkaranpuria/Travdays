from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import CreateQuerySerializer,QuerySerializer
from rest_framework import status
from .pagination import QueryPagination

class CreateQueryView(APIView):

    permission_classes = [AllowAny]  

    def get(self,request):
        data = {}
        for i in Query.MY_CHOICES:
            data[i[0]] = i[1]
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


class QueryView(APIView,QueryPagination):

    def get(self, request, pk = None):
        if request.user.is_admin:
            if pk == None:
                query = Query.objects.all()
                results = self.paginate_queryset(query, request, view=self)
                serializer = QuerySerializer(results,many = True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif Query.objects.filter(id = pk).exists():
                query = Query.objects.get(id = pk)
                serializer = QuerySerializer(query)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid input"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self,request):
        if request.user.is_admin:
            query = Query.objects.get(id = request.data["id"])
            serializer = QuerySerializer(query,data = request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"values changed"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk = None):
        if request.user.is_admin:
            if pk != None:
                query = Query.objects.get(id = pk)
                query.delete()
                return Response({'success':'Query deleted'})
            return Response({'error':'choose a Query that needs to be deleted'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 