from rest_framework import serializers
from database.models import AdminMedia

from moviepy.editor import *
from urllib.parse import urlparse
import requests
from django.core.files.base import ContentFile

class GallerySerializer(serializers.ModelSerializer):

    trip  = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = AdminMedia
        fields = ['id','image','trip']

    def get_trip(self,obj):
        return obj.trip.name

    def get_image(self,obj):
        request = self.context.get('request')
        if obj.video == '' or obj.video == None:
            return obj.image.url
        if obj.image == '' or obj.image == None:
            clip = VideoFileClip(request.build_absolute_uri(obj.video.url))
            clip.save_frame(f"media/admin media/images/thumbnail{obj.id}.jpg",t=0.00) 
            #now saving image in the image field
            # img_url = request.build_absolute_uri(f"media/admin media/images/thumbnail{obj.id}.jpg")
            img_url = f"http://127.0.0.1:8000/media/admin media/images/thumbnail{obj.id}.jpg"
            name = urlparse(img_url).path.split('/')[-1]
            response = requests.get(img_url)
            if response.status_code == 200:
                obj.image.save(name, ContentFile(response.content), save=True)
            else:
                return None
        return request.build_absolute_uri(obj.image.url)