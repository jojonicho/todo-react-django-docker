from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from todo.models import Todo
from todo.serializers import TodoSerializer, TodoCreateSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from allauth.socialaccount.models import SocialAccount
import json

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # http_method_names = ["get", "post", "update" "delete"]
    def create(self, request):
        serializer = TodoCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = SocialAccount.objects.get(user=request.user)
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path="current-user")
    def current_user(self, request):
        try:
            social_account = SocialAccount.objects.get(user=request.user)
            return Response(social_account.extra_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # def current_user(self, request, pk=None):
    #     instance = get_object_or_404(self.queryset, pk=pk)
    def list(self, request):
        user = SocialAccount.objects.get(user=request.user)
        todo = Todo.objects.filter(user=user)
        serializer = TodoSerializer(todo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
