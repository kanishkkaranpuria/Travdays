from django.contrib import admin
from database.models import Booking

class BookingAdmin(admin.ModelAdmin):

    readonly_fields=('created',)
    list_display = ('id','user', 'trip','approved',)
    list_filter = ('approved','user__active')
    fieldsets = (
        (None, {'fields': ('user', 'trip','approved','phoneNumber','query','created',)}),
    )
    search_fields = ('user__email','trip__name')
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Booking, BookingAdmin)