from django.contrib import admin
from database.models import Booking

class BookingAdmin(admin.ModelAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','user', 'trip','approved')
    list_filter = ('approved',)
    readonly_fields=('created',)
    fieldsets = (
        (None, {'fields': ('user', 'trip','phoneNumber','approved','created',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('user', 'trip', 'phoneNumber')}
    #     ),
    # )
    search_fields = ('user__email','trip__name')
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Booking, BookingAdmin)