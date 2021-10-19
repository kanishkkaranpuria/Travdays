from rest_framework import serializers
from django.db.models import Sum
from database.models import AdminMedia, Review, Trip

class SingleTripDisplaySerializer(serializers.ModelSerializer):

    ratings = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','type','name','description','price', 'ratings']

    def get_ratings(self,obj):
        result = Trip.objects.annotate(total_ratings=Sum('reviews__ratings')).filter(id = obj.id)
        for r in result:
            net = r.total_ratings
        net = result[0].total_ratings
        if net:
            return round(net/obj.reviews.all().count(), 1)
        return "No Ratings"


class SingleTripMediaDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminMedia
        fields = ['id', 'image', 'video']

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

    class Meta:
        model = Trip
        fields = ['id','name','displayImage']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        if len(obj.adminmedia.filter(displayImage=True)) != 0:
            image_url = obj.adminmedia.filter(displayImage=True)
            qs=[]
            for i in image_url:
                print(request.build_absolute_uri(i.image.url))
                qs.append(request.build_absolute_uri(i.image.url))
            return qs
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
        fields = ['type','name','description','price']

class CreateTripMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminMedia
        fields = ['trip', 'image', 'video']