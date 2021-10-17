from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import SingleTripDisplaySerializer,SingleTripMediaDisplaySerializer,TripDisplaySerializer,ReviewDisplaySerializer,CreateReviewSerializer
from rest_framework import serializers, status
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
                   



