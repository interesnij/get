from django.contrib import admin
from users.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['pk', 'phone']
    search_fields = ('last_name','first_name')
    model = User


admin.site.register(User)
