from django.conf.urls import url
from store.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', StoreListView.as_view(), name="store_list"),
    url(r'^(?P<slug>[\w\-]+)/$', StoreDetailView.as_view(), name="store"),
    url(r'^calculator/$', StoreCalculator.as_view(), name='store_calculator'),
]
