from django.db import models
from django.contrib.auth.models import User

class Post (models.Model):
    title = models.CharField(max_length=140, blank=False, null=False)
    text = models.CharField(max_length=140, blank=False, null=False)
    date = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.title} - {self.text[0:100]}"
