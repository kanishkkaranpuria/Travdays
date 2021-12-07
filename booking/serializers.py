from rest_framework import serializers
from database.models import Booking, Trip


class BookingSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    trip = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ['id','user','trip','phoneNumber','approved','created','query']

    def get_user(self,obj):
        return obj.user.email

    def get_trip(self,obj):
        return obj.trip.name

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

class PreviousBookingSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    trip = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ['id','trip','phoneNumber','created','query']

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

    def get_trip(self,obj):
        return obj.trip.name

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")