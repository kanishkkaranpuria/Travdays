from django.urls import path
from .views import FaqQuestion,FaqAnswer,Faq



urlpatterns = [
    path('question', FaqQuestion.as_view()),
    path('answer/<int:pk>', FaqAnswer.as_view()),
    path('', Faq.as_view()),
    path('<int:pk>', Faq.as_view()),
] 
