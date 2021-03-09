from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from django.views.generic import ListView
from blog_cat.models import BlogCategory
from common.utils import get_small_template


class BlogCatsView(ListView, CategoryListMixin):
	template_name = None
	paginate_by = 20

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("blog/blog_cats.html", request.META['HTTP_USER_AGENT'])
		return super(BlogCatsView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		from blog.models import Blog

		context=super(BlogCatsView,self).get_context_data(**kwargs)
		context['last_blog'] = Blog.objects.only("pk")[0:6]
		return context

	def get_queryset(self):
		cats = BlogCategory.objects.only("pk")
		return cats
