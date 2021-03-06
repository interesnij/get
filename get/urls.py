from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', include ('main.urls')),

    url(r'^service_cat/', include('service_cat.urls')),
    url(r'^service/', include('service.urls')),

    url(r'^blog_cat/', include('blog_cat.urls')),
    url(r'^blog/', include('blog.urls')),

    url(r'^works_cat/', include('works_cat.urls')),
    url(r'^works/', include('works.urls')),
    url(r'^store_cat/', include('store_cat.urls')),
    url(r'^store/', include('store.urls')),

    url(r'^tags/', include('tags.urls')),

    url(r'^search/', include('search.urls')),
    url(r'^users/', include('users.urls')),

    url(r'^about/', include('about.urls')),
    url(r'^faq/', include('faq.urls')),
    url(r'^contacts/', include('contacts.urls')),

    url(r'^terms/', include('terms.urls')),
    url(r'^policy/', include('policy.urls')),

    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^logout/$', auth_views.LogoutView.as_view(template_name="logout.html"), name='logout'),

]  +static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
