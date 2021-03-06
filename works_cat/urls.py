from django.conf.urls import url
from works_cat.views import WorksCatsView


urlpatterns = [
    url(r'^$', WorksCatsView.as_view(), name='works_cats'),
]
