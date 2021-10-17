from rest_framework import serializers
from database.models import AdminMedia, Trip


class GallerySerializer(serializers.ModelSerializer):

    trip = serializers.SerializerMethodField()

    class Meta:
        model = AdminMedia
        fields = ['id','image','video','trip']

    def get_trip(self,obj):
        return obj.trip.name
