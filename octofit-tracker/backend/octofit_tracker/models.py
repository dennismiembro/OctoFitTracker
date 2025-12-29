
from djongo import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    members = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    timestamp = models.DateTimeField()

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    score = models.IntegerField()

class Workout(models.Model):
    user = models.CharField(max_length=100)
    workout_type = models.CharField(max_length=100)
    details = models.TextField()
    date = models.DateField()
