from django.contrib import admin
from faq.models import *


class PhotoFaqInline(admin.TabularInline):
    model = FaqPhoto
class DocFaqInline(admin.TabularInline):
    model = FaqDoc
class VideoFaqInline(admin.TabularInline):
    model = FaqVideo

class FaqAdmin(admin.ModelAdmin):
    inlines = [
        PhotoFaqInline,
        DocFaqInline,
        VideoFaqInline,
    ]
    list_display = ['title', 'description', 'created']
    list_filter = ['created', 'category']
    search_fields = ['title', 'description', 'created']

    class Meta:
            model = Faq

class FaqCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_filter = ['name']
    search_fields = ('name',)
    class Meta:
        model = FaqCategory

admin.site.register(Faq, FaqAdmin)
admin.site.register(FaqCategory, FaqCategoryAdmin)
