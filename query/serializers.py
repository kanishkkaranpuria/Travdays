from rest_framework import serializers
from database.models import Query


class CreateQuerySerializer(serializers.ModelSerializer):


    class Meta:
        model = Query
        fields = ['name','email','user','choice','query']

