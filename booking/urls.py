from django.urls import path
from .views import BookingView,BookingAdminView



urlpatterns = [
    path('', BookingView.as_view()),
    path('view', BookingAdminView.as_view()),
    path('view/<int:pk>', BookingAdminView.as_view()),
]
