from django.urls import path
from .views import SearchBarView



urlpatterns = [
    path('<searchtext>', SearchBarView.as_view()),

] 
