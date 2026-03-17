from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, User, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "hero_name", "email", "team")
    search_fields = ("name", "hero_name", "email", "team")


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city")
    search_fields = ("name", "city")


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "activity_type", "duration_minutes", "calories_burned", "recorded_at")
    list_filter = ("activity_type",)


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total_points", "rank")
    list_ordering = ("rank",)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "difficulty", "target_group", "suggested_for")
    list_filter = ("difficulty", "target_group")
