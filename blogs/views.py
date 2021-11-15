from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import AllBlogsSerializer,BlogMediaSerializer,FeaturedBlogsSerializer,CreateBlogSerializer,CreateBlogMediaSerializer,BlogSerializer
from rest_framework import status
from .pagination import BlogPagination,BlogMediaPagination
import json
# Create your views here.

class AllBlogsDisplayView(APIView,BlogPagination):

    permission_classes = [AllowAny]   

    def get(self,request):
        voteBlogs = sorted(Blog.objects.filter(approved = True),  key=lambda instance: -instance.netlikes)
        # print(voteBlogs)
        featuredBlogs = list(Blog.objects.filter(Q(featured = True) & Q(approved = True))[:6])
        blogs = list(dict.fromkeys(featuredBlogs + voteBlogs)) 
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class BlogDisplayView(APIView,BlogMediaPagination):

    permission_classes = [AllowAny] 

    def get(self,request,pk = None,var=None):
        if Blog.objects.filter(id = pk).exists():
            blog = Blog.objects.get(id = pk)
            if var == "detail":
                serializer = BlogSerializer(blog,context={"request" : request})
                return Response(serializer.data,status=status.HTTP_200_OK)
            elif var == "media":
                blogMedia = blog.blogmedia.all()
                results = self.paginate_queryset(blogMedia, request, view=self)
                serializer = BlogMediaSerializer(results,context={"request" : request},many = True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                pass
        return Response({"error":"invalid input"},status=status.HTTP_400_BAD_REQUEST)
        


class BlogsDisplayVoteFilter(APIView,BlogPagination):

    permission_classes = [AllowAny] 

    def get(self,request):
        blogs = sorted(Blog.objects.filter(Q(featured = False) & Q(approved = True)),  key=lambda instance: -instance.netlikes)
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class BlogsDisplayCreatedFilter(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request):
        blogs = Blog.objects.filter(Q(featured = False) & Q(approved = True)).order_by('-created')
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)
        
class BlogsDisplayFeaturedFilter(APIView,BlogPagination):

    permission_classes = [AllowAny]

    def get(self,request):
        blogs = Blog.objects.filter(Q(featured = True) & Q(approved = True)).order_by('-created')
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = FeaturedBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)

class CreateBlog(APIView): 

    def post(self,request):
        data = {}
        blog = None
        data['user'] = request.user.id
        data['blog'] = str(request.data['blog'])
        data['title'] = request.data['title']
        data['location'] = request.data['location']
        data['image'] = request.data['displayImage']
        serializer = CreateBlogSerializer(data = data)
        if serializer.is_valid():
            blog = serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = {}
        data['blog'] = blog.id
        i = 0
        print("start of while loop")
        while 'image'+str(i) in request.data:
            data['image'] = request.data['image'+str(i)]
            serializer = CreateBlogMediaSerializer(data = data)
            if serializer.is_valid():
                i += 1
                serializer.save()
            else:
                blog.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print("end of while loop")
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

# class BlogsDisplayUniversalFilter(APIView,BlogPagination):

#     permission_classes = [AllowAny]

#     def get(self,request,variable):
#         variable = json.loads(variable)
#         print(variable)
#         if isinstance(variable,dict) and (variable.keys() - {'vote', 'featured', 'created' } == set()) :
#             qs1 = Blog.objects.all()
#             voteblogsSet = sorted(Blog.objects.only('title').filter(approved = True),  key=lambda instance: -instance.netlikes) if 'vote' in variable else qs1
#             print(voteblogsSet)
#             ordering = 'FIELD(`title`, %s)' % ','.join(str(title) for title in voteblogsSet)
#             voteblogs = Blog.objects.filter(title__in = voteblogsSet).extra(
#            select={'ordering': ordering}, order_by=('ordering',))
#             print(voteblogs.values_list("id",flat=True))
#             featuredblogs = Blog.objects.filter(Q(featured = True) & Q(approved = True)) if 'featured' in variable else qs1
#             qs = voteblogs & featuredblogs
#             qs = qs.order_by(variable["created"]) if 'created' in variable else qs
#             results = self.paginate_queryset(qs, request, view=self)
#             serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
#             return Response(serializer.data)
