from django.db import models
from django.db.models import Q
from autoslug import AutoSlugField


class WorksCategory(models.Model):
	name = models.CharField(max_length=100, verbose_name="Название")
	slug = AutoSlugField(populate_from='name', unique=True, db_index=True)
	order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")

	def __str__(self):
		return self.name

	class Meta:
		ordering = ["order", "name"]
		verbose_name = "категория работ"
		verbose_name_plural = "категория работ"

	def __str__(self):
		return self.name

	def is_works_exists(self):
		return self.works_categories.filter(category=self).values("pk").exists()

	def get_works_10(self):
		list = self.works_categories.filter(category=self)[:10]
		return list

	def get_works(self):
		list = self.works_categories.filter(category=self)
		return list
