from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('gallery/', include("gallery.urls")),
    path('blog/', include("blogs.urls")),
    path('trip/', include("trips.urls")),
    path('booking/', include("booking.urls")),
    path('query/', include("query.urls")),
    path('auth/', include("authentication.urls")),
    path('faq/', include("faq.urls")),
    path('search/', include("searchbar.urls")),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
