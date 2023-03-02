from django.urls import path
from . import views
from . views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='registration'),
    path('user-details/', RetrieveUserView.as_view(), name='user-details'),
]