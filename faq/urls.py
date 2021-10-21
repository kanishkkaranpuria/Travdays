from django.urls import path
from .views import FaqQuestion,FaqAnswer



urlpatterns = [
    path('question', FaqQuestion.as_view()),
    path('answer/<int:pk>', FaqAnswer.as_view()),
] 
