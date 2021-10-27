from django.contrib import admin
from database.models import Booking

class BookingAdmin(admin.ModelAdmin):

    list_display = ('id','user', 'trip','approved')
    list_filter = ('approved',)
    readonly_fields=('created',)
    fieldsets = (
        (None, {'fields': ('user', 'trip','phoneNumber','approved','created',)}),
    )
    search_fields = ('user__email','trip__name')
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Booking, BookingAdmin)