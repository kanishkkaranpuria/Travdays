from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import SearchBarSerializer
from rest_framework import status
from .pagination import SearchbarPagination
from django.db.models.functions import Lower


class SearchBarView(APIView,SearchbarPagination):

    permission_classes = [AllowAny]

    def get(self, request, searchtext):
        qs = Trip.objects.filter(Q(name__contains=searchtext) | Q(location__contains=searchtext)).order_by(Lower('name'))
        # qs1 = Trip.objects.filter(name__contains=searchtext)
        # # print(qs)
        # print(qs1.values_list("name"))
        # qs2 = Trip.objects.filter(location__contains=searchtext)
        # print(qs2.values_list("location"))
        # qs = (qs1 | qs2).distinct().order_by(Lower('name'))
        # print(qs)
        results = self.paginate_queryset(qs, request, view=self)
        serializer = SearchBarSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)