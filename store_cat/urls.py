from django.conf.urls import url
from store_cat.views import StoreCatsView


urlpatterns = [
    url(r'^$', StoreCatsView.as_view(), name='store_cats'),
]
