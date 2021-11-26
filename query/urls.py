from django.urls import path
from .views import CreateQueryView,QueryView



urlpatterns = [
    path('create', CreateQueryView.as_view()),
    path('', QueryView.as_view()),

] 
