from rest_framework import serializers
from database.models import Query


class CreateQuerySerializer(serializers.ModelSerializer):

    class Meta:
        model = Query
        fields = ['name','email','user','choice','query','phoneNumber']

class QuerySerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = Query
        fields = ['id','name','email','user','choice','query','phoneNumber','created']
    
    def get_user(self,obj):
        if obj.user :
            return obj.user.email
        return None

