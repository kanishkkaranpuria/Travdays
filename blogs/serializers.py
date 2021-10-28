from django.db.models.fields import related
from rest_framework import serializers
from database.models import Blog, BlogMedia


class AllBlogsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = ['id','title','location','image','created']

    # def get_image(self,obj):
    #     if len(obj.blogmedia.all()) != 0:
    #         request = self.context.get('request')
    #         photo_url = obj.blogmedia.all()
    #         qs=[]
    #         for i in photo_url:
    #             print(request.build_absolute_uri(i.image.url))
    #             qs.append(request.build_absolute_uri(i.image.url))
    #         return qs
    #     return None

class BlogSerializer(serializers.ModelSerializer):

    displayImage = serializers.SerializerMethodField()
    image        = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id','title','location','image','displayImage','created']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)

    def get_image(self,obj):
        if len(obj.blogmedia.all()) != 0:
            request = self.context.get('request')
            photo_url = obj.blogmedia.all()
            qs=[]
            for i in photo_url:
                print(request.build_absolute_uri(i.image.url))
                qs.append(request.build_absolute_uri(i.image.url))
            return qs
        return None

class CreateBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = ['user','title','blog','location','image']

class CreateBlogMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogMedia
        fields = ['blog','image']



