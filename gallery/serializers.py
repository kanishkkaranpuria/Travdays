from rest_framework import serializers
from database.models import AdminMedia,Trip

from moviepy.editor import *
from urllib.parse import urlparse
import requests
from django.core.files.base import ContentFile

class GallerySerializer(serializers.ModelSerializer):

    trip  = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()

    class Meta:
        model = AdminMedia
        fields = ['id','image','trip','video']

    def get_trip(self,obj):
        return obj.trip.name

    def get_video(self,obj):
        if obj.video == '' or obj.video == None:
            return False
        return True

    def get_image(self,obj):
        request = self.context.get('request')
        if obj.video == '' or obj.video == None:
            return obj.image.url
        if obj.image == '' or obj.image == None:
            clip = VideoFileClip(request.build_absolute_uri(obj.video.url))
            clip.save_frame(f"media/admin media/images/thumbnail{obj.id}.jpg",t=0.00) 
            img_url = request.build_absolute_uri(f"/media/admin media/images/thumbnail{obj.id}.jpg")
            name = urlparse(img_url).path.split('/')[-1]
            response = requests.get(img_url)
            if response.status_code == 200:
                obj.image.save(name, ContentFile(response.content), save=True)
            else:
                return None
        return request.build_absolute_uri(obj.image.url)

class SingleTripGalleryDisplaySerializer(serializers.ModelSerializer):

    ratings      = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()
    duration     = serializers.SerializerMethodField()
    video        = serializers.SerializerMethodField()
    price        = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','type','name','location','description','price', 'ratings','ratingsCount','duration',"video"]

    def get_duration(self,obj):
        dur = "" if obj.duration == '' else obj.duration.split(",")
        if dur != "":
            return f"{dur[0]} Days {dur[1]} Nights"
        return ""

    def get_video(self,obj):
        pk = self.context.get('pk')
        if obj.adminmedia.get(id = pk).video != '' or obj.adminmedia.get(id = pk).video == None:
            request = self.context.get('request')
            return request.build_absolute_uri(AdminMedia.objects.get(id = pk).video.url)
        return None

    def get_price(self,obj):
        price = str(obj.price)
        temp_price = price[::-1][3:]
        temp2 = ''
        if len(price) > 3:
            for i in range(1,int((len(temp_price)+3)/2)):
                temp2 = temp2 + temp_price[2*i-2:2*i] + ',' 
            if temp2[-1] == ',':
                temp2 = temp2[:-1]
            temp2 = temp2[::-1]
            return temp2 + ',' + price[-3:]
        return price