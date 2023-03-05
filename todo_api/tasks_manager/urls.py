from django.urls import path
from . views import *

urlpatterns = [
    path('', Tasks_manager.as_view(), name='tasks'),
]