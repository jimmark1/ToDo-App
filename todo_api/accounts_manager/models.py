import random
import string
import uuid

from django.db import models
from django.contrib.auth.base_user import BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.safestring import mark_safe
class UserAccountManager(BaseUserManager):
       def create_user(self, name:str, username:str, password=None):
            
              if not name:
                  raise ValueError('User must have a Name')
              if not username:
                  raise ValueError('User must have a Username')
            
              
              user = self.model(
                     name=name,
                     username=username,
                     password=password
              )

              user.set_password(password)
              user.save(using=self._db)

              return user


       def create_superuser(self, name:str, username:str, password=None):
              user = self.create_user(name, username, password)
              user.is_superuser = True

              user.save(using=self._db)

              return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
       def avatar_path(instance, filename):
             return '/'.join(['user_avatar', str(instance.name), filename])

       user_id = models.UUIDField(primary_key=True, max_length=15, default=uuid.uuid4, editable=False)
       name = models.CharField(max_length=255, null=True, blank=True)
       
       username = models.CharField(max_length=255, null=False, blank=False, unique=True)
       password = models.CharField(max_length=60, null=False)
       avatar = models.ImageField(upload_to=avatar_path, max_length=255, null=True, blank=True, default='default_avatar/avatar.jpg')

       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now_add=True)

       is_active = models.BooleanField(default=True)

       objects = UserAccountManager()

       USERNAME_FIELD = 'username'
       REQUIRED_FIELDS = ['name', 'password']
       
      

       def __str__(self):
              return str(f'{self.name}')

       def has_perm(self, perm, obj=None):
              return self.is_superuser

       def has_module_perms(self, app_label):
              return True

       @property
       def is_staff(self):
              return self.is_superuser