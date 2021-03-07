from django.db import models
from django.contrib.postgres.indexes import BrinIndex
from autoslug import AutoSlugField
from django.conf import settings
from users.helpers import upload_to_user_directory
from pilkit.processors import ResizeToFill, ResizeToFit, Transpose
from imagekit.models import ProcessedImageField
from ckeditor_uploader.fields import RichTextUploadingField


class FaqCategory(models.Model):
	name = models.CharField(max_length=100, verbose_name="Название")
	slug = AutoSlugField(populate_from='name', unique=True, db_index=True)
	order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")

	def __str__(self):
		return self.name
	class Meta:

		ordering = ["order", "name"]
		verbose_name = "категория faq"
		verbose_name_plural = "категории faq"

	def __str__(self):
		return self.name


class Faq(models.Model):
	title = models.CharField(max_length=200, verbose_name="Название")
	created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Создан")
	description = models.CharField(max_length=500, blank=True, verbose_name="Описание")
	content = RichTextUploadingField(config_name='default',external_plugin_resources=[('codesnippet','/static/ckeditor_plugins/codesnippet/','plugin.js',)],)
	creator = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, verbose_name="Создатель")
	slug = AutoSlugField(populate_from='title', unique=True, db_index=True)
	category = models.ManyToManyField(FaqCategory, related_name="faq_categories", blank=True, verbose_name="Категория")

	class Meta:
		ordering = ["-created"]
		verbose_name = "faq"
		verbose_name_plural = "faq"
		indexes = (BrinIndex(fields=['created']),)

	def __str__(self):
		return self.title

class FaqDoc(models.Model):
	title = models.CharField(max_length=200, verbose_name="Название")
	file = models.FileField(upload_to=upload_to_user_directory, verbose_name="Документ")
	faq = models.ForeignKey(Faq, related_name='doc_faq', on_delete=models.CASCADE, blank=True)

	class Meta:
		verbose_name = "Документ"
		verbose_name_plural = "Документы"

class FaqPhoto(models.Model):
	file = ProcessedImageField(format='JPEG', options={'quality': 90}, upload_to=upload_to_user_directory, processors=[Transpose(), ResizeToFit(width=1024, upscale=False)])
	faq = models.ForeignKey(Faq, related_name='image_faq', on_delete=models.CASCADE, blank=True)

	class Meta:
		verbose_name = 'Фото'
		verbose_name_plural = 'Фото'

class FaqVideo(models.Model):
	file = models.FileField(upload_to=upload_to_user_directory, verbose_name="Видео")
	faq = models.ForeignKey(Faq, related_name='video_faq', on_delete=models.CASCADE, blank=True)

	class Meta:
		verbose_name = 'Видео'
		verbose_name_plural = 'Видео'
