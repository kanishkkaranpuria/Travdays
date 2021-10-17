from django.urls import path
from .views import TripView,ReviewView,TripMediaView,CreateReviewView



urlpatterns = [
    path('', TripView.as_view()),
    path('<name>', TripView.as_view()),
    path('media/<name>', TripMediaView.as_view()),
    path('review/<name>', ReviewView.as_view()),
    path('review/create/<name>', CreateReviewView.as_view()),

] 
