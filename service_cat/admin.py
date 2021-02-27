from django.contrib import admin
from service_cat.models import ServiceCategory


class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_filter = ['name']
    search_fields = ('name',)
    class Meta:
        model = ServiceCategory

admin.site.register(ServiceCategory, ServiceCategoryAdmin)
