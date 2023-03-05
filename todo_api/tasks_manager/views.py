from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from . models import *

from . serializers import Tasks_serializer

class Tasks_scheduler():

       def new_task(self, title, description, user):
              Tasks.objects.create(
                            task_title = title.upper(),
                            task_description = description,
                            user = user
                     )


       def update_task(self, pk):
              pass


       def delete_task(self, pk):
              pass
class Tasks_manager(APIView, Tasks_scheduler):
    
       permission_classes = [permissions.IsAuthenticated]

       def get(self, request, format=None):
              try:

                     tasks = Tasks.objects.filter(user=request.user)
                     serializer = Tasks_serializer(tasks, many=True)

                     return Response(serializer.data, status=status.HTTP_200_OK)
              
              except Exception as e:
                     return Response({'error':'Something went wrong while getting tasks'},
                                     status=status.HTTP_400_BAD_REQUEST)

       def post(self, request):
              data = request.data
              task_title = data['task_title'].upper()

              if len(data['task_title']) < 3 or data['task_title'].isspace():
                     return Response({'error':'Task title should atleast 3 characters long'},
                            status=status.HTTP_400_BAD_REQUEST)
              
              else:
                     if Tasks.objects.filter(user=request.user, task_title = task_title).exists():
                            return Response({'error':'Tasks already exists'},
                                   status=status.HTTP_400_BAD_REQUEST)
                     else:
                            try:
                                   self.new_task(title = data['task_title'].lstrip(), description = data['task_description'], user = request.user)
                                   print('Task Title :', task_title)
                                   return Response({'success':'Task added sucessfully'}, status=status.HTTP_201_CREATED)

                            except Exception as e:
                                   print(e)
                                   return Response({'error':'Something went wrong while creating a task'},
                                          status=status.HTTP_400_BAD_REQUEST)

       def put(self, pk):
              pass


       def delete(self, pk):
              pass
