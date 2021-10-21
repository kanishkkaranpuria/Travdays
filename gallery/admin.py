from django.contrib import admin
from database.models import GalleryPageTemp

class GalleryPageTempAdmin(admin.ModelAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','userKey')
    # list_filter = ('approved','featured',)
    readonly_fields=('created','updated')
    fieldsets = (
        (None, {'fields': ('userKey','previousId','created', 'updated',)}),
    )

    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('title', 'user','blog','location',)}
    #     ),
    # )
    search_fields = ('userKey',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(GalleryPageTemp, GalleryPageTempAdmin)