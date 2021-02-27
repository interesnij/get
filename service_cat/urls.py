from django.conf.urls import url
from service_cat.views import ServiceCatList


urlpatterns = [
    url(r'^$', ServiceCatList.as_view(), name='service_cats'),
]
