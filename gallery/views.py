from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from .serializers import GallerySerializer
# from .pagination import GalleryPagination
import datetime
import ast, random

class GalleryView(APIView): 

    def get(self,request):
        page = int(self.request.query_params.get('page', None))
        now = datetime.datetime.now()
        qs = GalleryPageTemp.objects.only("updated_at")
        for obj in qs:
            if (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).hour < now.hour:  
                obj.delete()
            elif (obj.updated_at.astimezone() + datetime.timedelta(hours = 1)).day < now.day:
                obj.delete()
            else:
                pass
        if page == 1:
            if GalleryPageTemp.objects.filter(userKey = request.session.get('name')).exists():
                temp = GalleryPageTemp.objects.get(userKey = request.session.get('name'))
                temp.previousId = ''
                temp.save()
                if request.user.is_authenticated and request.session['name'][:13] == "AnonymousUser":
                    GalleryPageTemp.objects.get(userKey = request.session.get('name')).delete()
                    request.session.flush()
                    print('user is authenticated and previous session should get deleted')
                if request.user.is_anonymous and request.session['name'][:13] != "AnonymousUser":
                    GalleryPageTemp.objects.get(userKey = request.session.get('name')).delete()
                    request.session.flush()
                    print('user is unauthenticated and previous session should get deleted')
            if not GalleryPageTemp.objects.filter(userKey = request.session.get('name')).exists():
                temp = GalleryPageTemp(previousId = '')
                temp.save()
                request.session.flush()
                if request.user.is_authenticated:
                    request.session['name'] = str(f"{request.user.email}")
                else:
                    request.session['name'] = str(f"{request.user}{temp.id}")
                print('session created',request.session.get('name') )
                temp.userKey = request.session['name']
                temp.save()
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