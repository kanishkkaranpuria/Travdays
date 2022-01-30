from django.urls import path
from .views import GalleryView,GalleryPackageView,VideoView



urlpatterns = [
    path('', GalleryView.as_view()),
    path('package/<int:pk>', GalleryPackageView.as_view()),
    path('vid', VideoView.as_view()),
]
