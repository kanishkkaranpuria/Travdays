from rest_framework import serializers
from django.db.models import Sum
from database.models import AdminMedia, Review, Trip

class SingleTripDisplaySerializer(serializers.ModelSerializer):

    ratings = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()

    class Meta:
        model = Trip
        fields = ['id','type','name','location','description','price', 'ratings','ratingsCount']


class SingleTripMediaDisplaySerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()

    class Meta:
        model = AdminMedia
        fields = ['id','name', 'image', 'video']

    def get_name(self,obj):
        return obj.trip.name
    # def get_image(self,obj):
    #     if len(obj.adminmedia.exclude(image='').exclude(image__isnull=True) ) != 0:
    #         request = self.context.get('request')
    #         image_url = obj.adminmedia.exclude(image='').exclude(image__isnull=True) 
    #         qs=[]
    #         for i in image_url:
    #             print(request.build_absolute_uri(i.image.url))
    #             qs.append(request.build_absolute_uri(i.image.url))
    #         return qs
    #     return None

    # def get_video(self,obj):
    #     if len(obj.adminmedia.exclude(video='').exclude(video__isnull=True) ) != 0:
    #         request = self.context.get('request')
    #         video_url = obj.adminmedia.exclude(video='').exclude(video__isnull=True)
    #         qs=[]
    #         for i in video_url:
    #             print(request.build_absolute_uri(i.video.url))
    #             qs.append(request.build_absolute_uri(i.video.url))
    #         return qs
    #     return None


class TripDisplaySerializer(serializers.ModelSerializer):

    displayImage = serializers.SerializerMethodField()
    ratings = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()

    class Meta:
        model = Trip
        fields = ['id','name','type','location','displayImage','price', 'ratings','ratingsCount']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        if len(obj.adminmedia.filter(displayImage=True)) != 0:
            # image_url = obj.adminmedia.filter(displayImage=True)
            image_url = obj.adminmedia.get(displayImage=True)
            # qs=[]
            # for i in image_url:
            #     print(request.build_absolute_uri(i.image.url))
            #     qs.append(request.build_absolute_uri(i.image.url))
            # return qs
            return request.build_absolute_uri(image_url.image.url)
        displayImage  = AdminMedia.objects.get(trip = None, displayImage = True)
        return request.build_absolute_uri(displayImage.image.url)

class ReviewDisplaySerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id','user','ratings','description','created']

    def get_user(sef,obj):
        return obj.user.name

class CreateReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['user','description','trip', 'ratings']


class CreateTripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ['type','name','location','description','price']

class CreateTripMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminMedia
        fields = ['trip', 'image', 'video']