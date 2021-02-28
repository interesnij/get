from django.conf.urls import url
from blog_cat.views import BlogCatsView


urlpatterns = [
    url(r'^$', BlogCatsView.as_view(), name='blog_cats'),
]
