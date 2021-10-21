from django.urls import path
from .views import UserAuthenticationStatus



urlpatterns = [
    path('status', UserAuthenticationStatus.as_view()),
] 
