from rest_framework import serializers
from django.db.models import Sum
from database.models import AdminMedia, Review, Trip

from moviepy.editor import *
from urllib.parse import urlparse
import requests
from django.core.files.base import ContentFile


class SingleTripDisplaySerializer(serializers.ModelSerializer):

    ratings      = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()
    duration     = serializers.SerializerMethodField()
    price        = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','type','name','location','description','price', 'ratings','ratingsCount','duration']

    def get_duration(self,obj):
        dur = "" if obj.duration == '' else obj.duration.split(",")
        if dur != "":
            return f"{dur[0]} Days {dur[1]} Nights"
        return ""

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

class SingleTripMediaDisplaySerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()

    class Meta:
        model = AdminMedia
        fields = ['id', 'image','video']

    def get_image(self,obj):
        request = self.context.get('request')
        if obj.video == '' or obj.video == None:
            return request.build_absolute_uri(obj.image.url)
        if obj.image == '' or obj.image == None:
            clip = VideoFileClip(request.build_absolute_uri(obj.video.url))
            clip.save_frame(f"media/admin media/images/thumbnail{obj.id}.jpg",t=0.00) 
            img_url = f"http://127.0.0.1:8000/media/admin media/images/thumbnail{obj.id}.jpg"
            name = urlparse(img_url).path.split('/')[-1]
            response = requests.get(img_url)
            if response.status_code == 200:
                obj.image.save(name, ContentFile(response.content), save=True)
            else:
                return None
        return request.build_absolute_uri(obj.image.url)

    def get_video(self,obj):
        if obj.video == '' or obj.video == None:
            return False
        return True

class SingleMediaDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminMedia
        fields = ['id',"video"]

class TripDisplaySerializer(serializers.ModelSerializer):

    displayImage = serializers.SerializerMethodField()
    ratings      = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()
    duration     = serializers.SerializerMethodField()
    description  = serializers.SerializerMethodField()
    price        = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','name','type','location','displayImage','price', 'ratings','ratingsCount','duration','description']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        if obj.adminmedia.filter(image__isnull=False).exists():
            if obj.adminmedia.filter(displayImage=True).exists():
                pass
            else:
                new = obj.adminmedia.order_by('?')[0]
                new.displayImage=True
                new.save()
            image_url = obj.adminmedia.get(displayImage=True)
            return request.build_absolute_uri(image_url.image.url)
        displayImage  = AdminMedia.objects.get(trip = None, displayImage = True)
        return request.build_absolute_uri(displayImage.image.url)

    def get_duration(self,obj):
        dur = "" if obj.duration == '' else obj.duration.split(",")
        if dur != "":
            return f"{dur[0]} Days {dur[1]} Nights"
        return ""

    def get_description(self,obj):
        a = obj.description
        if len(a)>450:
            a = a[:450].split(" ")[:-1] 
            body = ''
            for word in a: 
                body = body + word + " " 
            return body + "..."
        return a + " ..."

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

class NetReviewSerializer(serializers.ModelSerializer):

    ratings      = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()

    class Meta:
        model = Trip
        fields = ['ratings','ratingsCount']

class ReviewDisplaySerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id','user','ratings','description','created']

    def get_user(sef,obj):
        return obj.user.name
    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

class CreateReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['user','description','trip', 'ratings']

class CreateTripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ['type','name','location','description','price','duration']

class CreateTripMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminMedia
        fields = ['trip', 'image', 'video']