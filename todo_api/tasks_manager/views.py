from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from . models import *

from . serializers import Tasks_serializer

class Tasks_manager(APIView):
    
       permission_classes = [permissions.IsAuthenticated
]

       def get(self, request, format=None):
              try:

                     tasks = Tasks.objects.filter(user=request.user)
                     serializer = Tasks_serializer(tasks, many=True)

                     return Response(serializer.data, status=status.HTTP_200_OK)
              
              except Exception as e:
                     return Response({'error':'Something went wrong while getting tasks'},
                                     status=status.HTTP_400_BAD_REQUEST)

       def post(self, request):
              pass


       def put(self, request, pk):
              pass


       def delete(self, request, pk):
              pass
