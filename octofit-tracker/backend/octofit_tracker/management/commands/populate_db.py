from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create Users
        users = [
            User(email='tony@stark.com', name='Tony Stark', team=marvel.name, is_superhero=True),
            User(email='steve@rogers.com', name='Steve Rogers', team=marvel.name, is_superhero=True),
            User(email='bruce@wayne.com', name='Bruce Wayne', team=dc.name, is_superhero=True),
            User(email='clark@kent.com', name='Clark Kent', team=dc.name, is_superhero=True),
        ]
        for user in users:
            user.save()

        # Create Activities
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, date=timezone.now())
        Activity.objects.create(user=users[3], type='Yoga', duration=20, date=timezone.now())

        # Create Workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for superheroes', suggested_for='Marvel')
        Workout.objects.create(name='Flight Training', description='Flight workout for superheroes', suggested_for='DC')

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
