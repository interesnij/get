from django.contrib import admin
from store.models import *


class PhotoStoreInline(admin.TabularInline):
    model = StorePhoto
class DocStoreInline(admin.TabularInline):
    model = StoreDoc
class VideoStoreInline(admin.TabularInline):
    model = StoreVideo

class StoreAdmin(admin.ModelAdmin):
    inlines = [
        PhotoStoreInline,
        DocStoreInline,
        VideoStoreInline,
    ]
    list_display = ['title', 'description', 'created']
    list_filter = ['created', 'category']
    search_fields = ['title', 'description', 'created']

    class Meta:
            model = Store

admin.site.register(Store, StoreAdmin)
