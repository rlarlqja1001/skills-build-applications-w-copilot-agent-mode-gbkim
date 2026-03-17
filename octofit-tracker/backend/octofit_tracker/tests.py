from django.test import TestCase
from rest_framework.test import APIClient

from .models import Activity, LeaderboardEntry, Team, User, Workout


class OctofitApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.team = Team.objects.create(name="marvel team", city="New York")
        self.user = User.objects.create(
            name="Peter Parker",
            email="spiderman@octofit.dev",
            hero_name="Spider-Man",
            team=self.team.name,
        )
        Activity.objects.create(
            user=self.user,
            activity_type="running",
            duration_minutes=45,
            calories_burned=420,
        )
        LeaderboardEntry.objects.create(user=self.user, total_points=870, rank=1)
        Workout.objects.create(
            name="Wall-Crawl HIIT",
            difficulty="hard",
            target_group="full body",
            suggested_for=self.user,
        )

    def test_api_root(self):
        response = self.client.get("/api/")
        self.assertEqual(response.status_code, 200)

    def test_users_endpoint(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_teams_endpoint(self):
        response = self.client.get("/api/teams/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_activities_endpoint(self):
        response = self.client.get("/api/activities/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_leaderboard_endpoint(self):
        response = self.client.get("/api/leaderboard/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_workouts_endpoint(self):
        response = self.client.get("/api/workouts/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)
