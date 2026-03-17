from django.http import JsonResponse
from rest_framework import viewsets

from .models import Activity, LeaderboardEntry, Team, User, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSerializer,
)


def api_root(request):
    return JsonResponse(
        {
            "users": "/api/users/",
            "teams": "/api/teams/",
            "activities": "/api/activities/",
            "leaderboard": "/api/leaderboard/",
            "workouts": "/api/workouts/",
        }
    )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by("id")
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by("id")
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all().order_by("rank", "id")
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all().order_by("id")
    serializer_class = WorkoutSerializer
