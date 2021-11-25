from rest_framework import serializers
from database.models import Booking


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ['id','user','trip','phoneNumber','approved','created','query']
