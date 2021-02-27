from django.contrib import admin
from service.models import *


class PhotoServiceInline(admin.TabularInline):
    model = ServicePhoto
class DocServiceInline(admin.TabularInline):
    model = ServiceDoc
class VideoServiceInline(admin.TabularInline):
    model = ServiceVideo

class ServiceAdmin(admin.ModelAdmin):
    inlines = [
        PhotoServiceInline,
        DocServiceInline,
        VideoServiceInline,
    ]
    list_display = ['title', 'description', 'created']
    list_filter = ['created', 'category']
    search_fields = ['title', 'description', 'created']

    class Meta:
            model = Service

admin.site.register(Service, ServiceAdmin)
