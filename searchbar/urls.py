from django.urls import path
from .views import TripSearchBarView,BlogSearchBarView



urlpatterns = [
    path('trip/<searchtext>/<type>', TripSearchBarView.as_view()),
    path('trip/<searchtext>', TripSearchBarView.as_view()),
    path('blog/<searchtext>', BlogSearchBarView.as_view()),

] 
