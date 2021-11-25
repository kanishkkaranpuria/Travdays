from django.contrib import admin
from database.models import Trip

class TripAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'type','location')
    list_filter = ('type','location')
    fieldsets = (
        (None, {'fields': ('name','location', 'type','duration','description','price',)}),
    )
    search_fields = ('name','location','type')
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Trip, TripAdmin)