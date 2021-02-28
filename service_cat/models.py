from django.db import models
from django.db.models import Q
from autoslug import AutoSlugField


class ServiceCategory(models.Model):
	name = models.CharField(max_length=100, verbose_name="Название")
	slug = AutoSlugField(populate_from='name', unique=True, db_index=True)
	order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")

	def __str__(self):
		return self.name

	class Meta:
		ordering = ["order", "name"]
		verbose_name = "категория услуг"
		verbose_name_plural = "категории услуг"

	def __str__(self):
		return self.name

	def is_service_exists(self):
		return self.service_categories.filter(category=self).values("pk").exists()

	def get_service_10(self):
		list = self.service_categories.filter(category=self)[:10]
		return list

	def get_service(self):
		list = self.service_categories.filter(category=self)
		return list
