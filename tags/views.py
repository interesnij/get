from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from tags.models import Tag
from django.views.generic import ListView
from common.utils import get_small_template


class TagView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.tag = Tag.objects.get(name=self.kwargs["name"])
		self.template_name = get_small_template("tags/tag.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(TagView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(TagView,self).get_context_data(**kwargs)
		context["object"] = self.tag
		return context


class TagsListView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 50

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("tags/tags.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(TagsListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Tag.objects.all()
