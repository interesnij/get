from django.conf.urls import url
from service.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', ServiceListView.as_view(), name="service_list"),
    url(r'^(?P<slug>[\w\-]+)/$', ServiceDetailView.as_view(), name="service"),
]
