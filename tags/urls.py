from django.conf.urls import url
from news.views import TagView, TagsListView


urlpatterns = [
    url(r'^(?P<name>[\w\-]+)/$', TagView.as_view(), name="tag"),
    url(r'^$', TagsListView.as_view(), name='tags'),
]
