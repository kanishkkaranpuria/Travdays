from django.urls import path
from .views import UserAuthenticationStatus,UserInfoView,LoginView,LogoutView,Refresh_Token_View



urlpatterns = [
    path('status', UserAuthenticationStatus.as_view()),
    path('info', UserInfoView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('newaccess', Refresh_Token_View.as_view()),
] 
