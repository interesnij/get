from django.views.generic.base import ContextMixin
from django.conf import settings
from blog_cat.models import BlogCategory
from service_cat.models import ServiceCategory
from faq.models import FaqCategory
from works_cat.models import WorksCategory


class CategoryListMixin(ContextMixin):
	def get_context_data(self,**kwargs):
		context = super(CategoryListMixin,self).get_context_data(**kwargs)
		context["current_url"] = self.request.path
		context["blog_cat"] = BlogCategory.objects.filter(blog_categories__isnull=False)
		context["service_cats"] = ServiceCategory.objects.all()
		context["faq_cat"] = FaqCategory.objects.filter(faq_categories__isnull=False)
		context["works_cat"] = WorksCategory.objects.filter(works_categories__isnull=False)
		return context
