import re
from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import AllBlogsSerializer,BlogSerializer,BlogEditSerializer,BlogMediaSerializer,FeaturedBlogsSerializer,CreateBlogSerializer,CreateBlogMediaSerializer,BlogSerializer
from rest_framework import status
from .pagination import BlogPagination,BlogMediaPagination
# Create your views here.

class AllBlogsDisplayView(APIView,BlogPagination):

    permission_classes = [AllowAny]   

    def get(self,request):
        voteBlogs = sorted(Blog.objects.filter(approved = True),  key=lambda instance: -instance.netlikes)
        featuredBlogs = list(Blog.objects.filter(Q(featured = True) & Q(approved = True))[:6])
        blogs = list(dict.fromkeys(featuredBlogs + voteBlogs)) 
        results = self.paginate_queryset(blogs, request, view=self)
        serializer = AllBlogsSerializer(results,context={"request" : request}, many = True)
        return Response(serializer.data)


class BlogDisplayView(APIView,BlogMediaPagination):

    permission_classes = [AllowAny] 

    def get(self,request,pk = None,page = None):
        if Blog.objects.filter(id = pk).exists():
            blog = Blog.objects.get(id = pk)
            image= BlogMedia.objects.filter(blog = blog).all()
            blog = blog.blog.split("  QJXevma9jJG5qw2D~{?<FSWPXLTpEtIcOpqc,")
            i = 0
            length = len(blog) if len(blog)>len(image) else len(image)
            array = []
            while(i<length):
                if i < len(blog) and i < len(image):
                    array.append(f'{blog[i]} par')
                    array.append(f'{request.build_absolute_uri(image[i].image.url)} img')
                elif i <= len(image) and i >= len(blog):
                    array.append(f'{request.build_absolute_uri(image[i].image.url)} img')
                elif i >= len(image) and i <= len(blog):
                    array.append(f'{blog[i]} par')
                i += 1
            if array[-1:][0] == '':
                array = array[:-1]
            data = {}
            i = 0
            while(i<len(array)):
                data[i] = array[i]
                i += 1
            data2 = {}
            j = 0
            for i in range(0,len(data)):
                if data[i] != ' par' and data[i] != '  par':
                    data2[j]= data[i]
                    j = j+1
            n = (page-1)*3 if page !=1 else 0
            m = page*3
            return Response(dict(list(data2.items())[n:m]))

    def delete(self,request,pk):
        if Blog.objects.filter(Q(id = pk) & Q(user = request.user.id)).exists() or request.user.is_admin:
            blog = Blog.objects.get(id = pk)
            blog.delete()
            return Response({'msg':'Blog deleted'})
        return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 


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
        data['title'] = request.data['title']
        data['location'] = request.data['location']
        data['image'] = request.data['displayImage']
        data['anonymous'] = request.data['anonymous'] if 'anonymous' in request.data else False

        #Converting Data1,Data2....Data"n" dictionary into one array

        array = []
        i = 0
        while 'data'+str(i) in request.data:
            array.append(request.data['data'+str(i)])
            i += 1

        #Logic to arrange make consecutive elements of the array of different types 

        i = 0
        bool = True
        while(bool):
            while(i+1<len(array)):
                if (type(array[i]) == type(array[i+1]) or type(array[i]) == type(array[i-1])) and isinstance(array[i],str):
                    array = [*array[:i],array[i] +"\n\n"+ array[i+1],*array[i+2:]]
                else:
                    if type(array[i]) == type(array[i+1]):
                        array = [*array[:i+1],"",*array[i+1:]]
                    i += 1
                break
            if i+1 >= len(array):
                bool = False

        # alternative elements are images and blog paras
        # adding a para ending marker and adding entire blog in one variable
        blog = ''
        for i in range(len(array[::2])):
            blog = blog + array[::2][i] + "  QJXevma9jJG5qw2D~{?<FSWPXLTpEtIcOpqc,"

        # saving para

        data['blog'] = blog
        serializer = CreateBlogSerializer(data = data)
        if serializer.is_valid():
            blog = serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # saving images

        data = {}
        data['blog'] = blog.id
        i = 0
        print("start of while loop")
        for img in array[1::2]:
            data['image'] = img
            serializer = CreateBlogMediaSerializer(data = data)
            if serializer.is_valid():
                i += 1
                serializer.save()
            else:
                blog.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Blog Created'}, status=status.HTTP_200_OK)

    def patch(self,request):
        if request.user.is_admin:
            blog = Blog.objects.get(id = request.data["id"])
            data = {}
            data["featured"] = request.data["featured"] if "featured" in request.data else blog.featured
            data["approved"] = request.data["approved"] if "approved" in request.data else blog.approved
            serializer = BlogEditSerializer(blog,data=data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"Value changed successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid Input"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

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

# class BlogDisplayView2(APIView,BlogMediaPagination):

#     permission_classes = [AllowAny] 

#     def get(self,request,pk = None,var=None):
#         if Blog.objects.filter(id = pk).exists():
#             blog = Blog.objects.get(id = pk)
#             if var == "detail":
#                 serializer = BlogSerializer(blog,context={"request" : request})
#                 return Response(serializer.data,status=status.HTTP_200_OK)
#             elif var == "media":
#                 blogMedia = blog.blogmedia.all()
#                 results = self.paginate_queryset(blogMedia, request, view=self)
#                 serializer = BlogMediaSerializer(results,context={"request" : request},many = True)
#                 return Response(serializer.data,status=status.HTTP_200_OK)
#             else:
#                 pass
#         return Response({"error":"invalid input"},status=status.HTTP_400_BAD_REQUEST)

#     def delete(self,request,pk,var=None):
#         if Blog.objects.filter(Q(id = pk) & Q(user = request.user.id)).exists() or request.user.is_admin:
#             blog = Blog.objects.get(id = pk)
#             blog.delete()
#             return Response({'msg':'Blog deleted'})
#         return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)   
        # array1 = []
        # array = []
        # array1= [*array[:1]]
        # for i in range(1,len(array)):
        #     print(array1)
        #     j = len(array1)-1
        #     if type(array1[j]) == type(array[i]) and isinstance(array[i],str):
        #         array1[j] = array1[j] +"\n\n" + array[i]
        #     elif type(array1[j]) == type(array[i]):
        #         array1.append(" ")
        #         array1.append(array[i])
        #     else:
        #         array1.append(array[i])

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
