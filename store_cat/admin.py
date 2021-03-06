from django.contrib import admin
from store_cat.models import StoreCategory


class WorksCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_filter = ['name']
    search_fields = ('name',)
    class Meta:
        model = StoreCategory

admin.site.register(StoreCategory, StoreCategoryAdmin)
