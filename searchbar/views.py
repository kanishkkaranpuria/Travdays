from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import TripSearchBarSerializer,BlogSearchBarSerializer
from rest_framework import status
from .pagination import SearchbarPagination
from django.db.models.functions import Lower


class TripSearchBarView(APIView,SearchbarPagination):

    permission_classes = [AllowAny]

    def get(self, request, searchtext, type = None):
        qs = Trip.objects.filter(Q(name__contains=searchtext) | Q(location__contains=searchtext)).order_by(Lower('name'))
        qs = qs.filter(type = type) if (type != None) else qs
        # qs1 = Trip.objects.filter(name__contains=searchtext)
        # # print(qs)
        # print(qs1.values_list("name"))
        # qs2 = Trip.objects.filter(location__contains=searchtext)
        # print(qs2.values_list("location"))
        # qs = (qs1 | qs2).distinct().order_by(Lower('name'))
        # print(qs)
        results = self.paginate_queryset(qs, request, view=self)
        serializer = TripSearchBarSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class BlogSearchBarView(APIView,SearchbarPagination):

    permission_classes = [AllowAny]

    def get(self, request, searchtext):
        qs = Blog.objects.filter(Q(title__contains=searchtext) | Q(location__contains=searchtext)).order_by(Lower('title'))
        results = self.paginate_queryset(qs, request, view=self)
        serializer = BlogSearchBarSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)