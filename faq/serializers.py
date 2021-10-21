from rest_framework import serializers
from database.models import FAQ


class FaqQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = FAQ
        fields = ['id','question']

class FaqAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = FAQ
        fields = ['id','answer']
