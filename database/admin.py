from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserAdminCreationForm, UserAdminChangeForm
from django.contrib.auth import get_user_model
from .models import AdminMedia,UserMedia,BlogMedia,Review,FAQ,WhitelistedTokens

# Register your models here.
User = get_user_model()

admin.site.register(AdminMedia)
admin.site.register(UserMedia)
admin.site.register(BlogMedia)
admin.site.register(Review)
admin.site.register(FAQ)
admin.site.register(WhitelistedTokens)

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','email', 'admin')
    list_filter = ('admin', 'staff', 'active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('admin', 'staff', 'active',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('id',)
    filter_horizontal = ()
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)