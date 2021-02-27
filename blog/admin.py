from django.contrib import admin
from blog.models import *


class PhotoBlogInline(admin.TabularInline):
    model = BlogPhoto
class DocBlogInline(admin.TabularInline):
    model = BlogDoc
class VideoBlogInline(admin.TabularInline):
    model = BlogVideo

class BlogAdmin(admin.ModelAdmin):
    inlines = [
        PhotoBlogInline,
        DocBlogInline,
        VideoBlogInline,
    ]
    list_display = ['title', 'description', 'created']
    list_filter = ['created', 'category']
    search_fields = ['title', 'description', 'created']

    class Meta:
            model = Blog

admin.site.register(Blog, BlogAdmin)
