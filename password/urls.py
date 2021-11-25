from django.urls import path
from .views import ConfirmChangePassword,PasswordOtpVerify,NewPasswordSet


urlpatterns = [
    path('confirmchange', ConfirmChangePassword.as_view()),
    path('otpverification', PasswordOtpVerify.as_view()),
    path('setpass', NewPasswordSet.as_view()),

] 
