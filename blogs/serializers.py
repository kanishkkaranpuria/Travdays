from django.db.models.fields import related
from rest_framework import serializers
from database.models import Blog, BlogMedia
import string

class AllBlogsSerializer(serializers.ModelSerializer):

    created  = serializers.SerializerMethodField()
    body     = serializers.SerializerMethodField()
    user     = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id','title','location','image','created','body','user']

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

    def get_user(self,obj):
        if obj.anonymous == False:
            return obj.user.name
        return "Anonymous"
    
    def get_body(self,obj):
        a = obj.blog.split("    QJXevma9jJG5qw2D~{?<FSWPXLTpEtIcOpqc,")[0].split(" ,cqpOcItEpTLXPWSF<?{~D2wq5GJj9amveXJQ  ")[0]
        if len(a)>478:
            a = a[:478].split(" ")[:-1] 
            body = ''
            for word in a: 
                body = body + word + " " 
            return body + "..."
        return a + " ..."

    def get_location(self,obj):
        loc = obj.location
        return string.capwords(loc)

class FeaturedBlogsSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id','title','location','image','created']

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

    def get_location(self,obj):
        loc = obj.location
        return string.capwords(loc)

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
    user = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    # image        = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id','title','location','displayImage','created','blog','user']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

    def get_user(self,obj):
        if obj.anonymous == False:
            return obj.user.name
        return "Anonyous"

    def get_location(self,obj):
        loc = obj.location
        return string.capwords(loc) 
        
class BlogEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = ['featured','approved']

class BlogMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogMedia
        fields = ['id','blog','image']
    # def get_image(self,obj):
    #     if len(obj.blogmedia.all()) != 0:
    #         request = self.context.get('request')
    #         photo_url = obj.blogmedia.all()
    #         qs=[]
    #         for i in photo_url:
    #             # print(request.build_absolute_uri(i.image.url))
    #             qs.append(request.build_absolute_uri(i.image.url))
    #         return qs
    #     return None

class CreateBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = ['user','title','blog','location','image','anonymous']

class CreateBlogMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogMedia
        fields = ['blog','image']



