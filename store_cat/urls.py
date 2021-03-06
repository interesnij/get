from django.conf.urls import url
from store_cat.views import WorksListView


urlpatterns = [
    url(r'^$', StoreListView.as_view(), name='store_cats'),
]
