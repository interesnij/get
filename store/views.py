from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from store.models import Store
from django.views.generic import ListView
from common.utils import get_small_template


class StoreDetailView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.store = Store.objects.get(pk=self.kwargs["pk"])
		self.template_name = get_small_template("store/store.html", request.META['HTTP_USER_AGENT'])
		return super(StoreDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(StoreDetailView,self).get_context_data(**kwargs)
		context["object"] = self.store
		return context


class StoreListView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 12

	def get(self,request,*args,**kwargs):
		from store_cat.models import StoreCategory

		self.cat = StoreCategory.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("store/store_list.html", request.META['HTTP_USER_AGENT'])
		return super(StoreListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Store.objects.filter(category=self.cat)

	def get_context_data(self, **kwargs):
		context = super(StoreListView, self).get_context_data(**kwargs)
		context['cat'] = self.cat
		return context


class StoreCalculator(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.store = Store.objects.get(pk=self.kwargs["pk"])
		self.template_name = get_small_template("store/calculator.html", request.META['HTTP_USER_AGENT'])
		return super(StoreCalculator,self).get(request,*args,**kwargs)
