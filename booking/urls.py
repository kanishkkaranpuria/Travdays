from django.urls import path
from .views import BookingView,BookingAdminView,PreviousBookingView



urlpatterns = [
    path('', BookingView.as_view()),
    path('view', BookingAdminView.as_view()),
    path('view/<int:pk>', BookingAdminView.as_view()),
    path('history', PreviousBookingView.as_view()),
]
