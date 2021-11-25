from rest_framework import serializers
from django.db.models import Sum
from database.models import AdminMedia, Review, Trip

class SingleTripDisplaySerializer(serializers.ModelSerializer):

    ratings      = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()
    duration     = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','type','name','location','description','price', 'ratings','ratingsCount','duration']

    def get_duration(self,obj):
        dur = "" if obj.duration == '' else obj.duration.split(",")
        if dur != "":
            return f"{dur[0]} Days {dur[1]} Nights"
        return ""

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
    ratings = serializers.ReadOnlyField()
    ratingsCount = serializers.ReadOnlyField()
    duration     = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','name','type','location','displayImage','price', 'ratings','ratingsCount','duration']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        if obj.adminmedia.filter(image__isnull=False).exists():
            if obj.adminmedia.filter(displayImage=True).exists():
                pass
            else:
                new = obj.adminmedia.order_by('?')[0]
                new.displayImage=True
                new.save()
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

    def get_duration(self,obj):
        dur = "" if obj.duration == '' else obj.duration.split(",")
        if dur != "":
            return f"{dur[0]} Days {dur[1]} Nights"
        return ""


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