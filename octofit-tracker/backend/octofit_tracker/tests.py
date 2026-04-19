from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(name="Test User", email="test@example.com", team="marvel")
        self.team = Team.objects.create(name="marvel", members=["Test User"])
        self.activity = Activity.objects.create(user="Test User", activity="Test Activity", duration=10)
        self.leaderboard = Leaderboard.objects.create(team="marvel", points=100)
        self.workout = Workout.objects.create(name="Test Workout", suggested_for=["Test User"])

    def test_user_list(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, 200)

    def test_team_list(self):
        response = self.client.get(reverse('team-list'))
        self.assertEqual(response.status_code, 200)

    def test_activity_list(self):
        response = self.client.get(reverse('activity-list'))
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_list(self):
        response = self.client.get(reverse('leaderboard-list'))
        self.assertEqual(response.status_code, 200)

    def test_workout_list(self):
        response = self.client.get(reverse('workout-list'))
        self.assertEqual(response.status_code, 200)
