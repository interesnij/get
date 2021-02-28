from django.conf.urls import url
from blog.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', BloglistView.as_view(), name="blog_list"),
    url(r'^(?P<slug>[\w\-]+)/$', BlogDetailView.as_view(), name="blog")
]
