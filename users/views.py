from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from users.models import User
from common.utils import get_small_template


class UserView(TemplateView, CategoryListMixin):
	template_name = "profile/user.html"

	def get(self,request,*args,**kwargs):
		self.user = User.objects.get(pk=self.kwargs["pk"])
		return super(UserView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(UserView,self).get_context_data(**kwargs)
		context["user"] = self.user
		return context
