from django.conf.urls import url
from works_cat.views import WorksListView


urlpatterns = [
    url(r'^$', WorksListView.as_view(), name='works_cats'),
]
