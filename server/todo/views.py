from django.shortcuts import render
from rest_framework import viewsets
from todo.models import Todo
from todo.serializers import TodoSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # http_method_names = ["get", "post", "update" "delete"]

    # @action(detail=True, methods=["post"], url_path="update")
    # def update(self, request, pk=None):
    #     instance = get_object_or_404(self.queryset, pk=pk)

    # def list(self, request):
    #     todo = Todo.objects.all()
    #     return Response(todo, status=status.HTTP_200_OK)
