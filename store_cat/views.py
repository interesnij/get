from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from django.views.generic import ListView
from store_cat.models import StoreCategory
from common.utils import get_small_template


class StoreCatsView(ListView, CategoryListMixin):
	template_name = None
	paginate_by = 20

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("store/store_cats.html", request.META['HTTP_USER_AGENT'])
		return super(StoreCatsView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		cats = StoreCategory.objects.only("pk")
		return cats
