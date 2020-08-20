from django.db import models
from allauth.socialaccount.models import SocialAccount

# Create your models here.
class Todo(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)

    # def save(self, *args, **kwargs):
    #     request = None

    #     if self.user is None:
    #         request = kwargs.pop("request")
    #     print(request)
    #     if request is not None and self.user is None:
    #         user = SocialAccount.objects.get(user=request.user)
    #         self.user = user
    #     self.clean()
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"
