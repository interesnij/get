from django.db import models
from django.conf import settings
from django.contrib.postgres.indexes import BrinIndex
from django.utils import timezone
from pilkit.processors import ResizeToFill, ResizeToFit, Transpose
from imagekit.models import ProcessedImageField
from django.db.models import Q
from users.helpers import upload_to_user_directory
from autoslug import AutoSlugField


class Works(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    image = ProcessedImageField(format='JPEG', blank=True, options={'quality': 90}, upload_to=upload_to_user_directory, processors=[ResizeToFit(width=1600, upscale=False)], verbose_name="Главное изображение")
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Создан")
    description = models.CharField(max_length=500, blank=True, verbose_name="Описание")
    content = models.TextField(verbose_name="content")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, verbose_name="Создатель")
    slug = AutoSlugField(populate_from='title', unique=True, db_index=True)
    category = models.ManyToManyField('works_cat.WorksCategory', related_name="works_categories", blank=True, verbose_name="Категория")

    class Meta:
        verbose_name = "Статья блога"
        verbose_name_plural = "Статьи блога"
        indexes = (BrinIndex(fields=['created']),)
        ordering = ["-created"]

    def __str__(self):
        return self.title

    def get_articles_5(self):
        return Works.objects.filter(category__in=self.category.all())[:5]

    def get_created(self):
        from django.contrib.humanize.templatetags.humanize import naturaltime
        return naturaltime(self.created)

    def is_have_docs(self):
        return self.doc_work.filter(work_id=self.pk).exists()
    def is_have_images(self):
        return self.image_work.filter(work_id=self.pk).exists()
    def is_have_videos(self):
        return self.video_work.filter(work_id=self.pk).exists()

    def get_docs(self):
        return self.doc_work.filter(work_id=self.pk)
    def get_images(self):
        return self.image_work.filter(work_id=self.pk)
    def get_videos(self):
        return self.video_work.filter(work_id=self.pk)


class WorksDoc(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    file = models.FileField(upload_to=upload_to_user_directory, verbose_name="Документ")
    work = models.ForeignKey(Works, related_name='doc_work', on_delete=models.CASCADE, blank=True)

    class Meta:
        verbose_name = "Документ"
        verbose_name_plural = "Документы"

class WorksPhoto(models.Model):
    file = ProcessedImageField(format='JPEG', options={'quality': 90}, upload_to=upload_to_user_directory, processors=[Transpose(), ResizeToFit(width=1024, upscale=False)])
    work = models.ForeignKey(Works, related_name='image_work', on_delete=models.CASCADE, blank=True)

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фото'

class WorksVideo(models.Model):
    file = models.FileField(upload_to=upload_to_user_directory, verbose_name="Видео")
    work = models.ForeignKey(Works, related_name='video_work', on_delete=models.CASCADE, blank=True)

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
