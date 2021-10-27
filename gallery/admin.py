from django.contrib import admin
from database.models import GalleryPageTemp

class GalleryPageTempAdmin(admin.ModelAdmin):
    list_display = ('id','userKey')
    # list_filter = ('approved','featured',)
    readonly_fields=('created','updated')
    fieldsets = (
        (None, {'fields': ('userKey','previousId','created', 'updated',)}),
    )

    search_fields = ('userKey',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(GalleryPageTemp, GalleryPageTempAdmin)