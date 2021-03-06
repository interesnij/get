from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from users.models import User
from common.utils import get_small_template


class UserView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.user = User.objects.get(pk=self.kwargs["pk"])
		self.template_name = get_small_template("users/user.html", request.META['HTTP_USER_AGENT'])
		return super(UserView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(UserView,self).get_context_data(**kwargs)
		context["user"] = self.user
		return context


class AuthUserView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("users/auth.html", request.META['HTTP_USER_AGENT'])
		return super(AuthUserView,self).get(request,*args,**kwargs)
