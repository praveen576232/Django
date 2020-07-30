from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class MyTable(models.Model):
    tableinfo = models.TextField()
    user_id = models.ForeignKey(User,on_delete =models.CASCADE,default=None)