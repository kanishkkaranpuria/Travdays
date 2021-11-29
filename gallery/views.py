from rest_framework import status
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from .serializers import GallerySerializer
from trips.serializers import SingleTripDisplaySerializer
from datetime import datetime, timedelta
import ast, random
from rest_framework.permissions import AllowAny

class GalleryView(APIView): 

    permission_classes = [AllowAny]

    def get(self,request):
        page = int(self.request.query_params.get('page', None))
        deltaTime = datetime.now().astimezone() - timedelta(days=1)
        qs = GalleryPageTemp.objects.filter(updated_at__lt=deltaTime)
        print("1 day has passed, deleter qs - ",qs)
        qs.delete()
        if page == 1:
            qs = GalleryPageTemp.objects.filter(userKey = request.session.get('name'))
            print(qs)
            if qs.count()>0:
                qs.delete()
            a = GalleryPageTemp(previousId = '')
            a.save()
            request.session.flush()
            request.session['name'] = str(f"{request.user}{a.id}")
            print('session created',request.session.get('name') )
            a.userKey = request.session['name']
            a.save()
            print('created')
        print('session created',request.session.get('name') )
        previousGalleryIds = []
        temp = GalleryPageTemp.objects.get(userKey = request.session.get('name'))
        if len(temp.previousId) != 0:
            previousGalleryIds = ast.literal_eval(temp.previousId)
        galleryIds = AdminMedia.objects.exclude(trip = None).only('id').values_list('id', flat=True).exclude(id__in = previousGalleryIds)
        num = 5
        if(galleryIds.count()<num):
            num=galleryIds.count()
        randomNumber = random.sample(set(galleryIds),num)
        galleries=AdminMedia.objects.filter(id__in=randomNumber)
        obj = temp
        obj.previousId = str(randomNumber+previousGalleryIds)
        obj.save()
        print("_____________________-",temp.previousId)
        serializer = GallerySerializer(galleries,context={"request" : request}, many = True)
        print(galleries)
        return Response(serializer.data)

class GalleryPackageView(APIView): 

    permission_classes = [AllowAny]

    def get(self,request,pk):
        if AdminMedia.objects.filter(id = pk).exists():
            trip = Trip.objects.get(adminmedia__id = pk)
            serializer = SingleTripDisplaySerializer(trip)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({"error":"invalid inpurt"},status=status.HTTP_400_BAD_REQUEST)





        # now = datetime.datetime.now()
        # qs = GalleryPageTemp.objects.only("updated_at")
        # for obj in qs:
        #     if (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).day < now.day:
        #         obj.delete()
        #     elif (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).day > now.day:
        #         pass
        #     elif (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).day == now.day:
        #         if (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).hour < now.hour: 
        #             obj.delete()
        #         else:
        #             pass
        
        # galleries = AdminMedia.objects.exclude(trip = None)
        # results = self.paginate_queryset(galleries, request, view=self)
        # serializer = GallerySerializer(results,context={"request" : request}, many = True)
        # return Response(serializer.data)

        # print(len(randomNumber+previousGalleryIds))
        # if len(ast.literal_eval(temp.previousId)) == page*2:
        #     num = 2
        #     print("dfjdv kajdbigadvkjas dvkjsdiubsdjfksdfsfs")
        #     array = ast.literal_eval(temp.previousId)[::-1]
        #     print(array)
        #     length = len(array)
        #     # print(array[2])
        #     # print(page)
        #     # print(num)
        #     print((num*page)-num)
        #     print(array[(num*page)-num:])
        #     # print(array[length-(2*int(page)):])
        #     # print(num+(length-(2*page)))
        #     # print(array[:num+(length-(2*page))])
        #     # print(array[length-(2*int(page)):num+(length-(2*page))])