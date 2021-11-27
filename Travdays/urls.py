from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/gallery/', include("gallery.urls")),
    path('api/blog/', include("blogs.urls")),
    path('api/trip/', include("trips.urls")),
    path('api/booking/', include("booking.urls")),
    path('api/query/', include("query.urls")),
    path('api/auth/', include("authentication.urls")),
    path('api/faq/', include("faq.urls")),
    path('api/search/', include("searchbar.urls")),
    path('api/password/', include("password.urls")),
    path('api/userinfo/', include("userinfo.urls")),
    path('accounts/', include('allauth.urls')),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
