from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from blog.models import Blog
from tags.models import Tag
from django.views.generic import ListView
from common.utils import get_small_template


class BlogDetailView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.blog = Blog.objects.get(pk=self.kwargs["pk"])
		self.template_name = get_small_template("blog/blog.html", request.META['HTTP_USER_AGENT'])
		return super(BlogDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(BlogDetailView,self).get_context_data(**kwargs)
		context["object"] = self.blog
		context['tags'] = Tag.objects.only("pk")
		return context


class BloglistView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 12

	def get(self,request,*args,**kwargs):
		from blog_cat.models import BlogCategory

		self.cat = BlogCategory.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("blog/blog_list.html", request.META['HTTP_USER_AGENT'])
		return super(BloglistView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Blog.objects.filter(category=self.cat)

	def get_context_data(self, **kwargs):
		context = super(BloglistView, self).get_context_data(**kwargs)
		context['cat'] = self.cat
		context['tags'] = Tag.objects.only("pk")
		return context
