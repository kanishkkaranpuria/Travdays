from django.contrib import admin
from database.models import Blog

class BlogAdmin(admin.ModelAdmin):

    list_display = ('id','title','user', 'location','approved',)
    list_filter = ('approved','featured','anonymous',)
    readonly_fields=('created',)
    fieldsets = (
        (None, {'fields': ('approved','anonymous','featured','title', 'user','image','blog','likes','dislikes','location','created',)}),
    )
    search_fields = ('user__name','location','title',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Blog, BlogAdmin)