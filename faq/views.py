from generic.mixins import CategoryListMixin
from django.views.generic import ListView
from faq.models import *
from tags.models import Tag
from common.utils import get_small_template
from django.views.generic.base import TemplateView


class FaqMainView(ListView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("faq/faq_cats.html", request.META['HTTP_USER_AGENT'])
		return super(FaqMainView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		faq = FaqCategory.objects.only("pk")
		return faq


class FaqDetailView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.faq = Faq.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("faq/faq.html", request.META['HTTP_USER_AGENT'])
		return super(FaqDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(FaqDetailView,self).get_context_data(**kwargs)
		context["object"] = self.faq
		context['tags'] = Tag.objects.only("pk")
		return context


class FaqCatView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 12

	def get(self,request,*args,**kwargs):
		self.cat = FaqCategory.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("faq/faq_list.html", request.META['HTTP_USER_AGENT'])
		return super(FaqCatView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Faq.objects.filter(category=self.cat)

	def get_context_data(self, **kwargs):
		context = super(FaqCatView, self).get_context_data(**kwargs)
		context['cat'] = self.cat
		context['tags'] = Tag.objects.only("pk")
		return context
