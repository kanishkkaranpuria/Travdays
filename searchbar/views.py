from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import BlogSearchBarSerializer
from trips.serializers import TripDisplaySerializer
from rest_framework import status
from .pagination import SearchbarPagination
from django.db.models.functions import Lower


class TripSearchBarView(APIView,SearchbarPagination):

    permission_classes = [AllowAny]
    
    def get(self, request, searchtext, type = None, sort = None):
        qs = Trip.objects.filter(Q(name__contains=searchtext) | Q(location__contains=searchtext)).order_by(Lower('name'))
        qs = qs.filter(type = type) if (type != None) else qs
        qs = qs.order_by("price") if sort == "price" else qs
        qs = qs.order_by("-price") if sort == "-price" else qs
        results = self.paginate_queryset(qs, request, view=self)
        serializer = TripDisplaySerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class BlogSearchBarView(APIView,SearchbarPagination):

    permission_classes = [AllowAny]

    def get(self, request, searchtext):
        qs = Blog.objects.filter(Q(title__contains=searchtext) | Q(location__contains=searchtext)).order_by(Lower('title'))
        results = self.paginate_queryset(qs, request, view=self)
        serializer = BlogSearchBarSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)