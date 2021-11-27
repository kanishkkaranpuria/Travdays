from django.urls import path
from .views import UserAuthenticationStatus,UserView



urlpatterns = [
    path('status', UserAuthenticationStatus.as_view()),
    path('info', UserView.as_view()),
  
] 
