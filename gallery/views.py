from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from .serializers import GallerySerializer
from .pagination import GalleryPagination

class GalleryView(APIView, GalleryPagination): 

    def get(self,request):
        galleries = AdminMedia.objects.exclude(trip = None)
        results = self.paginate_queryset(galleries, request, view=self)
        serializer = GallerySerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)






