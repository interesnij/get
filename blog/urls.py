from django.conf.urls import url
from blog.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', BlogCatView.as_view(), name="blog_list"),
    url(r'^(?P<pk>\d+)/$', BlogDetailView.as_view(), name="blog")
]
