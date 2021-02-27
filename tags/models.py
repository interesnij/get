from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100, verbose_name="name")
    blog = models.ManyToManyField("blog.Blog", blank=True, related_name='blog_tags')
    faq = models.ManyToManyField("faq.Faq", blank=True, related_name='blog_faqs')
    service = models.ManyToManyField("service.Service", blank=True, related_name='service_tags')

    class Meta:
        verbose_name = "тег"
        verbose_name_plural = "теги"

    def __str__(self):
        return self.name
