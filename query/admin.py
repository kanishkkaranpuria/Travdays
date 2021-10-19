from django.contrib import admin
from database.models import Query

class QueryAdmin(admin.ModelAdmin):
    list_display = ('id','email', 'name','user')
    list_filter = ('choice',)
    readonly_fields=('created',)
    fieldsets = (
        (None, {'fields': ('choice','query', 'email','name','user','created',)}),
    )
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('choice','query','email', 'name')}
    #     ),
    # )
    search_fields = ('choice',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(Query, QueryAdmin)