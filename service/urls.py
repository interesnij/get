from django.conf.urls import url
from blog.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', ServiceCatView.as_view(), name="service_list"),
    url(r'^(?P<pk>\d+)/$', ServiceDetailView.as_view(), name="service"),
]
