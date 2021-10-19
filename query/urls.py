from django.urls import path
from .views import CreateQueryView



urlpatterns = [
    path('create', CreateQueryView.as_view()),

] 
