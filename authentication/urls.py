from django.urls import path
from .views import ActivateAccountView,OTP_Validation,GenerateNewOtpView,RegisterUserView,LoginView,LogoutView,Refresh_Token_View



urlpatterns = [
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('newotp', GenerateNewOtpView.as_view()),
    path('newaccess', Refresh_Token_View.as_view()),
    path('register', RegisterUserView.as_view()),
    path('accountverification', OTP_Validation.as_view()),
    path('activate/<uid>/<token>',ActivateAccountView.as_view(), name='activated'),

] 
