from django.contrib import admin
from works_cat.models import WorksCategory


class WorksCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_filter = ['name']
    search_fields = ('name',)
    class Meta:
        model = WorksCategory

admin.site.register(WorksCategory, WorksCategoryAdmin)
