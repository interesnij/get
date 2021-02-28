from django.contrib import admin
from works.models import *


class PhotoWorksInline(admin.TabularInline):
    model = WorksPhoto
class DocWorksInline(admin.TabularInline):
    model = WorksDoc
class VideoWorksInline(admin.TabularInline):
    model = WorksVideo

class WorksAdmin(admin.ModelAdmin):
    inlines = [
        PhotoWorksInline,
        DocWorksInline,
        VideoWorksInline,
    ]
    list_display = ['title', 'description', 'created']
    list_filter = ['created', 'category']
    search_fields = ['title', 'description', 'created']

    class Meta:
            model = Works

admin.site.register(Works, WorksAdmin)
