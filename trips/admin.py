from django.contrib import admin
from database.models import Trip

class TripAdmin(admin.ModelAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','name', 'type')
    list_filter = ('type','location')
    fieldsets = (
        (None, {'fields': ('name','location', 'type','description','price',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('name', 'type', 'description','price')}
    #     ),
    # )
    search_fields = ('name','location','type')
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Trip, TripAdmin)