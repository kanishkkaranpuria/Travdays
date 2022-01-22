from django.urls import path
from .views import OnlyRatings,TripView,DeleteTripMedia,TripTypeFilterView,TripHoverEventView,TripUniversalFilterView,TripLocationFilterView,ReviewView,TripMediaView,CreateReviewView,CreateTripView,AdminTripMediaView



urlpatterns = [
    path('', TripView.as_view()),
    path('<name>', TripView.as_view()),
    path('ratings/<name>', OnlyRatings.as_view()),
    path('universal/<variable>', TripUniversalFilterView.as_view()),
    path('create/', CreateTripView.as_view()),
    path('media/<name>', TripMediaView.as_view()),
    path('hover/<name>', TripHoverEventView.as_view()),
    path('deletemedia/<int:pk>', DeleteTripMedia.as_view()),
    path('review/<name>', ReviewView.as_view()),
    path('review/create/<name>', CreateReviewView.as_view()),
    path('type/<type>', TripTypeFilterView.as_view()),
    path('location/<location>', TripLocationFilterView.as_view()),
    path('admintripmedia/<name>', AdminTripMediaView.as_view()),

] 
