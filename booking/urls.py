from django.urls import path
from .views import BookingView,BookingAdminView,PreviousBookingView,UnapprovedBookingAdminView



urlpatterns = [
    path('', BookingView.as_view()),
    path('view', BookingAdminView.as_view()),
    path('view/<int:pk>', BookingAdminView.as_view()),
    path('unapproved', UnapprovedBookingAdminView.as_view()),
    path('unapproved/<int:pk>', UnapprovedBookingAdminView.as_view()),
    path('history', PreviousBookingView.as_view()),
]
