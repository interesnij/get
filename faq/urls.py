from django.conf.urls import url
from faq.views import *


urlpatterns = [
    url(r'^$', FaqMainView.as_view(), name='faq_cats'),
    url(r'^list/(?P<slug>[\w\-]+)/$', FaqCatView.as_view(), name="faq_list"),
    url(r'^(?P<pk>\d+)/$', FaqDetailView.as_view(), name="fac"),
]
