from django.conf.urls import url
from tags.views import TagView, TagsListView


urlpatterns = [
    url(r'^(?P<name>[\w\-]+)/$', TagView.as_view(), name="tag"),
    url(r'^$', TagsListView.as_view(), name='tags'),
]
