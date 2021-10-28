from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import AllBlogsSerializer,CreateBlogSerializer,CreateBlogMediaSerializer,BlogSerializer
from rest_framework import status
from .pagination import BlogPagination
# Create your views here.

class AllBlogsDisplayView(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request,pk = None):
        if pk == None:
            voteBlogs = sorted(Blog.objects.filter(approved = True),  key=lambda instance: -instance.netlikes)
            print(voteBlogs)
            featuredBlogs = list(Blog.objects.filter(Q(featured = True) & Q(approved = True))[:6])
            blogs = list(dict.fromkeys(featuredBlogs + voteBlogs)) 
            results = self.paginate_queryset(blogs, request, view=self)
            serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
            return Response(serializer.data)
        elif Blog.objects.filter(id = pk).exists():
            blog = Blog.objects.get(id = pk)
            serializer = BlogSerializer(blog,context={"request" : request})
            return Response(serializer.data)
        else:
            return Response({"error":"somthing went wrong"}, status=status.HTTP_400_BAD_REQUEST)


class BlogsDisplayVoteFilter(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request):
        blogs = sorted(Blog.objects.filter(approved = True),  key=lambda instance: -instance.netlikes)
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class BlogsDisplayCreatedFilter(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request):
        blogs = Blog.objects.filter(approved = True).order_by('-created')
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)
        
class BlogsDisplayFeaturedFilter(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request):
        blogs = Blog.objects.filter(Q(featured = True) & Q(approved = True)).order_by('-created')
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class CreateBlog(APIView): # Change logic to allow users to add multiple images in the blog

    def post(self,request):
        data = {}
        blogId = None
        data['user'] = request.user.id
        data['blog'] = request.data['blog']
        data['title'] = request.data['title']
        data['location'] = request.data['location']
        data['image'] = request.data['displayImage']
        serializer = CreateBlogSerializer(data = data)
        if serializer.is_valid():
            blogId = serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = {}
        # data['image'] = request.data['image']
        data['blog'] = blogId.id
        for img in request.data['image']:
            data['image'] = img
            serializer = CreateBlogMediaSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Blog Created'}, status=status.HTTP_200_OK)
        

class BlogLikeDislike(APIView):

    def post(self,request):
        user = request.user
        blog = Blog.objects.get(id = request.data["id"])
        if 'like' in request.data:
            blog.dislikes.remove(user)
            if blog.likes.filter(id = user.id).exists():
                blog.likes.remove(user)
                blog.save()
                return Response({'message':'like removed'})
            blog.likes.add(user)
            blog.save()
            return Response({'message':'liked'})
        elif 'dislike' in request.data:
            blog.likes.remove(user)
            if blog.dislikes.filter(id = user.id).exists():
                blog.dislikes.remove(user)
                blog.save()
                return Response({'message':'dislike removed'})
            blog.dislikes.add(user)
            blog.save()
            return Response({'message':'disliked'})