from rest_framework import serializers
from django.db.models import Sum
from database.models import AdminMedia, Review, Trip

class SearchBarSerializer(serializers.ModelSerializer):

    displayImage = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id','type','name','location','displayImage']

    def get_displayImage(self,obj):
        request = self.context.get('request')
        if obj.adminmedia.filter(image__isnull=False).exists():
            if obj.adminmedia.filter(displayImage=True).exists():
                pass
            else:
                new = obj.adminmedia.order_by('?')[0]
                new.displayImage=True
                new.save()
            # image_url = obj.adminmedia.filter(displayImage=True)
            image_url = obj.adminmedia.get(displayImage=True)
            # qs=[]
            # for i in image_url:
            #     print(request.build_absolute_uri(i.image.url))
            #     qs.append(request.build_absolute_uri(i.image.url))
            # return qs
            return request.build_absolute_uri(image_url.image.url)
        displayImage  = AdminMedia.objects.get(trip = None, displayImage = True)
        return request.build_absolute_uri(displayImage.image.url)