from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import SingleTripDisplaySerializer,SingleTripMediaDisplaySerializer,TripDisplaySerializer,ReviewDisplaySerializer,CreateReviewSerializer,CreateTripSerializer,CreateTripMediaSerializer
from rest_framework import status
from .pagination import TripsPagination,TripMediaPagination, ReviewsPagination


class TripView(APIView, TripsPagination):

    permission_classes = [AllowAny]

    def get(self,request,name = None):
        if name == None:
            trips = Trip.objects.all()
            results = self.paginate_queryset(trips, request, view=self)
            serializer = TripDisplaySerializer( results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            if Trip.objects.filter(name = name).exists():
                trip = Trip.objects.get(name = name)
                serializer = SingleTripDisplaySerializer( trip)
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)

class TripFilterView(APIView, TripsPagination):

    permission_classes = [AllowAny]

    def get(self,request,type = None):
        if Trip.objects.filter(type = type).exists():
            trips = Trip.objects.filter(type = type)
            results = self.paginate_queryset(trips, request, view=self)
            serializer = TripDisplaySerializer( results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":"Invalid input"}, status = status.HTTP_400_BAD_REQUEST)



class TripMediaView(APIView, TripMediaPagination):

    permission_classes = [AllowAny]

    def get(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            media = AdminMedia.objects.filter(trip__name = name)
            results = self.paginate_queryset(media, request, view=self)
            serializer = SingleTripMediaDisplaySerializer(results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)


class ReviewView(APIView, ReviewsPagination):

    permission_classes = [AllowAny]

    def get(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            reviews = Review.objects.filter(trip__name = name)
            results = self.paginate_queryset(reviews, request, view=self)
            serializer = ReviewDisplaySerializer(results, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)

class CreateReviewView(APIView, ReviewsPagination):

    def post(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            user = request.user
            data = {}
            # print(type(data))
            if Booking.objects.filter(Q(user__id=user.id) & Q(trip__name = name) & Q(approved = True)).exists():
                print(user.id)
                data["ratings"] = request.data["ratings"]
                data["description"] = request.data["description"]
                data['user'] = user.id
                data["trip"] = Trip.objects.get(name = name).id
                # data = {
                #     "description" : request.data["description"],
                #     'user'        : user.id,
                #     "trip"        : Trip.objects.get(name = name).id,
                #     "ratings"     : request.data["ratings"]
                # }
                allowedRatings = ['1','2','3','4','5']
                if any(ratings in allowedRatings for ratings in request.data["ratings"]):
                    # data["ratings"] = (str(request.data["ratings"]), request.data["ratings"])
                    serializer = CreateReviewSerializer(data = data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({"success":"review created"}, status = status.HTTP_200_OK)
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)    
                return Response({"error":"rating value error"}, status = status.HTTP_400_BAD_REQUEST)
            return Response({"error":"You cannot give a review for this trip"}, status = status.HTTP_400_BAD_REQUEST)
        return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)

class CreateTripView(APIView):

    def post(self,request):
        if request.user.is_admin:
            TripId = None
            data = {}
            if 'type' and 'name' and 'description' and 'price' or 'image' or 'video' in request.data:
                if 'type' and 'name' and 'description' and 'price' in request.data:
                    data["type"] = request.data["type"]
                    data["name"] = request.data["name"]
                    data["description"] = request.data["description"]
                    data["price"] = request.data["price"]
                    if Trip.objects.filter(name = data["name"]).exists():
                        return Response({"error":"trip with this name already exists"}, status=status.HTTP_400_BAD_REQUEST)
                    serializer = CreateTripSerializer(data = data)
                    if serializer.is_valid():
                        obj = serializer.save()
                        TripId = obj.id
                        print(TripId)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                if "image" or 'video' in request.data:
                    data = {}
                    if "image" in request.data:
                        data["image"] = request.data["image"]
                    if "video" in request.data:
                        data["video"] = request.data["video"]
                    # if 'id' in request.data:
                    #     data["id"] = request.data["id"]
                    # else:
                    #     data["id"] = None
                    data["trip"] = TripId or request.data["id"]
                    serializer = CreateTripMediaSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                return Response({"success":"Trip created/media added"}, status = status.HTTP_200_OK)
            return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"user not allowed"}, status=status.HTTP_400_BAD_REQUEST)








