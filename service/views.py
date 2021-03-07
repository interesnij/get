from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from service.models import Service
from django.views.generic import ListView
from common.utils import get_small_template


class ServiceDetailView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.service = Service.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("service/service.html", request.META['HTTP_USER_AGENT'])
		return super(ServiceDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(ServiceDetailView,self).get_context_data(**kwargs)
		context["object"] = self.service
		return context


class ServiceListView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 12

	def get(self,request,*args,**kwargs):
		from service_cat.models import ServiceCategory

		self.cat = ServiceCategory.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("service/service_list.html", request.META['HTTP_USER_AGENT'])
		return super(ServiceListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Service.objects.filter(category=self.cat)

	def get_context_data(self, **kwargs):
		context = super(ServiceListView, self).get_context_data(**kwargs)
		context['cat'] = self.cat
		return context
