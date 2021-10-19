from django.urls import path
from .views import TripView,TripFilterView,ReviewView,TripMediaView,CreateReviewView,CreateTripView



urlpatterns = [
    path('', TripView.as_view()),
    path('<name>', TripView.as_view()),
    path('filter/<type>', TripFilterView.as_view()),
    path('media/<name>', TripMediaView.as_view()),
    path('review/<name>', ReviewView.as_view()),
    path('review/create/<name>', CreateReviewView.as_view()),
    path('create/', CreateTripView.as_view()),

] 
