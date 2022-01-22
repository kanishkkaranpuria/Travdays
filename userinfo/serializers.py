from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    navbarname = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id','email','name','navbarname']
    
    def get_navbarname(self,obj):
        name = obj.name.split(' ')[0]
        if len(name)>10:
            return name[:10] + "..."
        return name

class EditInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['name']