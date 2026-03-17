from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    hero_name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.hero_name} ({self.email})"


class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    city = models.CharField(max_length=100)

    class Meta:
        db_table = "teams"

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activities")
    activity_type = models.CharField(max_length=50)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "activities"

    def __str__(self):
        return f"{self.user.hero_name}: {self.activity_type}"


class LeaderboardEntry(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="leaderboard_entry")
    total_points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "leaderboard"

    def __str__(self):
        return f"#{self.rank} {self.user.hero_name}"


class Workout(models.Model):
    name = models.CharField(max_length=120)
    difficulty = models.CharField(max_length=20)
    target_group = models.CharField(max_length=50)
    suggested_for = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workouts")

    class Meta:
        db_table = "workouts"

    def __str__(self):
        return f"{self.name} ({self.difficulty})"
