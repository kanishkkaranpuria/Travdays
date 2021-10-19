from django.contrib import admin
from database.models import Blog

class BlogAdmin(admin.ModelAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','title','user', 'location','approved',)
    list_filter = ('approved','featured',)
    readonly_fields=('created',)
    fieldsets = (
        (None, {'fields': ('approved','featured','title', 'user','blog','likes','dislikes','location','created',)}),
    )

    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('title', 'user','blog','location',)}
    #     ),
    # )
    search_fields = ('user__name','location','title',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Blog, BlogAdmin)