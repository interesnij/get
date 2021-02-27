from generic.mixins import CategoryListMixin
from django.views.generic import ListView
from service_cat.models import ServiceCategory
from common.utils import get_small_template


class ServiceCatList(ListView, CategoryListMixin):
	template_name = None
	paginate_by = 20

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("service/cats_index.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(ServiceCatList,self).get(request,*args,**kwargs)

	def get_queryset(self):
		service = ServiceCategory.objects.only("pk")
		return service
