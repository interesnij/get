from django.db import models
from django.db.models import Q
from faq.models import Faq


class FaqCategory(models.Model):
	name = models.CharField(max_length=100, verbose_name="Название")
	slug = models.SlugField(populate_from='name', unique=True, db_index=True)
	order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")

	def __str__(self):
		return self.name

	class Meta:
		ordering = ["order", "name"]
		verbose_name = "категория faq"
		verbose_name_plural = "категории faq"

	def __str__(self):
		return self.name

	def is_faq_exists(self):
		return self.faq_categories.filter(category=self).values("pk").exists()

	def get_faq_10(self):
		list = self.faq_categories.filter(category=self)[:10]
		return list

	def get_faq(self):
		list = self.faq_categories.filter(category=self)
		return list
