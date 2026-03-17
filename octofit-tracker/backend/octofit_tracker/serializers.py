from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, User, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ["id"]


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = "__all__"
        read_only_fields = ["id"]


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Activity
        fields = "__all__"
        read_only_fields = ["id", "recorded_at"]


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = "__all__"
        read_only_fields = ["id"]


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Workout
        fields = "__all__"
        read_only_fields = ["id"]
