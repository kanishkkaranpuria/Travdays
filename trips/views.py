from django.db.models import Q
from database.models import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import SingleTripDisplaySerializer,SingleTripMediaDisplaySerializer,TripDisplaySerializer,ReviewDisplaySerializer,CreateReviewSerializer,CreateTripSerializer,CreateTripMediaSerializer
from rest_framework import status
from .pagination import TripsPagination,TripMediaPagination, ReviewsPagination
import json

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

    def delete(self,request,name):
        if request.user.is_admin:
            trip = Trip.objects.get(name = name)
            trip.delete()
            return Response({'msg':'trip deleted'})
        return Response({'error':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 

class TripUniversalFilterView(APIView, TripsPagination):

    permission_classes = [AllowAny]

    def get(self,request,variable):
        variable = json.loads(variable)
        print(variable)
        if isinstance(variable,dict) and (variable.keys() - {'type', 'location', 'greaterthan', 'lesserthan', 'sort' } == set()) :
            qs1 = Trip.objects.all()
            qs2 = Trip.objects.filter(type = variable['type']) if 'type' in variable else qs1
            qs3 = Trip.objects.filter(location = variable['location']) if 'location' in variable else qs1
            qs4 = Trip.objects.filter(price__gte = variable['greaterthan']) if 'greaterthan' in variable else qs1
            qs5 = Trip.objects.filter(price__lte = variable['lesserthan']) if 'lesserthan' in variable else qs1
            qs = qs1 & qs2 & qs3 & qs4 & qs5
            qs = qs.order_by(variable['sort']) if 'sort' in variable else qs
            results = self.paginate_queryset(qs, request, view=self)
            serializer = TripDisplaySerializer( results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":"something went wrong"}, status = status.HTTP_400_BAD_REQUEST)

class TripMediaView(APIView, TripMediaPagination):

    permission_classes = [AllowAny]

    def get(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            media = AdminMedia.objects.filter(trip__name = name)
            results = self.paginate_queryset(media, request, view=self)
            serializer = SingleTripMediaDisplaySerializer(results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)

class TripHoverEventView(APIView, TripMediaPagination):

    permission_classes = [AllowAny]
    
    def get(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            media = AdminMedia.objects.filter(trip__name = name).filter(Q(video__isnull=True) | Q(video__exact='')).exclude(displayImage=True)
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

    def get(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            bool = Booking.objects.filter(Q(user__id=request.user.id) & Q(trip__name = name) & Q(approved = True)).exists()
            return Response({"bool":bool}, status = status.HTTP_200_OK)
        return Response({"error":f"trip with name '{name}' doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)

    def post(self,request,name = None):
        if Trip.objects.filter(name = name).exists():
            user = request.user
            data = {}
            if Booking.objects.filter(Q(user__id=user.id) & Q(trip__name = name) & Q(approved = True)).exists():
                data["description"] = request.data["description"]
                data['user'] = user.id
                data["trip"] = Trip.objects.get(name = name).id
                if {request.data["ratings"]} - {1,2,3,4,5} == set():
                    data["ratings"] = request.data["ratings"]
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
            ran = False
            if 'type' and 'name' and 'description' and 'price' and 'duration' and 'location' in request.data:
                data["type"] = request.data["type"]
                data["name"] = request.data["name"]
                data["description"] = request.data["description"]
                data["price"] = request.data["price"]
                data["location"] = request.data["location"]
                data["duration"] = request.data["duration"]
                if Trip.objects.filter(name = data["name"]).exists():
                    return Response({"error":"trip with this name already exists"}, status=status.HTTP_400_BAD_REQUEST)
                serializer = CreateTripSerializer(data = data)
                if serializer.is_valid():
                    obj = serializer.save()
                    TripId = obj.id
                    ran = True
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if "image" or 'video' in request.data:
                data = {}
                data["trip"] = TripId or request.data["id"]

                i = 0
                while 'image'+str(i) in request.data:
                    data['image'] = request.data['image'+str(i)]
                    serializer = CreateTripMediaSerializer(data = data)
                    if serializer.is_valid():
                        i += 1
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                i = 0
                while 'video'+str(i) in request.data:
                    data['image'] = request.data['image'+str(i)]
                    serializer = CreateTripMediaSerializer(data = data)
                    if serializer.is_valid():
                        i += 1
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     
                if ran:
                    return Response({"success":"Trip created and media added"}, status = status.HTTP_200_OK)
                return Response({"success":"Trip media added"}, status = status.HTTP_200_OK)
            if ran:
                return Response({"success":"Trip created"}, status = status.HTTP_200_OK)
            return Response({"error":"Not all datas were provided"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"user not allowed"}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request):
        if request.user.is_admin:
            trip = Trip.objects.get(id = request.data["id"])
            serializer = CreateTripSerializer(trip,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"Value changed successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid Input"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

class TripTypeFilterView(APIView, TripsPagination):

    permission_classes = [AllowAny]

    def get(self,request,type = None):
        if Trip.objects.filter(type = type).exists():
            trips = Trip.objects.filter(type = type)
            results = self.paginate_queryset(trips, request, view=self)
            serializer = TripDisplaySerializer( results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":"Invalid input"}, status = status.HTTP_400_BAD_REQUEST)

class TripLocationFilterView(APIView, TripsPagination):

    permission_classes = [AllowAny]
    
    def get(self,request,location = None):
        if Trip.objects.filter(location = location).exists():
            trips = Trip.objects.filter(location = location)
            results = self.paginate_queryset(trips, request, view=self)
            serializer = TripDisplaySerializer( results,context={"request" : request}, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"error":"Invalid input"}, status = status.HTTP_400_BAD_REQUEST)