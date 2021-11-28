from rest_framework import serializers
from database.models import Booking


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ['id','user','trip','phoneNumber','approved','created','query']

class PreviousBookingSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    trip = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id','trip','phoneNumber','created','query']

    def get_created(self,obj):
        return obj.created.strftime("%d-%b-%Y")

    def get_trip(self,obj):
        return obj.trip.name