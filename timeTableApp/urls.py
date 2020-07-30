from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views
urlpatterns = [
    path('',views.homepage,name="logpage"),
    path('createtable', views.login,name="Longin"),
    path('register',views.register,name="register"),
    path('table',views.tableCreate,name='table'),
   path('logout',views.logoutPage,name="logout"),
   path('registerpage',views.registerpage,name="registerpage")
]
