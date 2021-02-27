from django.views.generic.base import ContextMixin
from django.conf import settings
from blog_cat.models import BlogCategory
from service_cat.models import ServiceCategory
from faq.models import FaqCategory


class CategoryListMixin(ContextMixin):

	def get_context_data(self,**kwargs):
		context = super(CategoryListMixin,self).get_context_data(**kwargs)
		context["current_url"] = self.request.path
		context["blog_cat"] = BlogCategory.objects.only("pk")
		context["service_cat"] = ServiceCategory.objects.only("pk")
		context["faq_cat"] = FaqCategory.objects.only("pk")
		return context
