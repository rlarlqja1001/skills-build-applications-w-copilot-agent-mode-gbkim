from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, User, Workout


class Command(BaseCommand):
    help = "octofit_db 데이터베이스에 테스트 데이터를 입력합니다."

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        marvel = Team.objects.create(name="marvel team", city="New York")
        dc = Team.objects.create(name="dc team", city="Gotham")

        users = [
            User.objects.create(
                name="Peter Parker",
                email="spiderman@octofit.dev",
                hero_name="Spider-Man",
                team=marvel.name,
            ),
            User.objects.create(
                name="Tony Stark",
                email="ironman@octofit.dev",
                hero_name="Iron Man",
                team=marvel.name,
            ),
            User.objects.create(
                name="Bruce Wayne",
                email="batman@octofit.dev",
                hero_name="Batman",
                team=dc.name,
            ),
            User.objects.create(
                name="Clark Kent",
                email="superman@octofit.dev",
                hero_name="Superman",
                team=dc.name,
            ),
        ]

        activity_data = [
            (users[0], "running", 45, 420),
            (users[1], "cycling", 30, 310),
            (users[2], "weightlifting", 50, 500),
            (users[3], "swimming", 40, 390),
        ]
        for user, activity_type, duration, calories in activity_data:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration_minutes=duration,
                calories_burned=calories,
            )

        leaderboard_data = [
            (users[2], 980, 1),
            (users[3], 910, 2),
            (users[0], 870, 3),
            (users[1], 820, 4),
        ]
        for user, points, rank in leaderboard_data:
            LeaderboardEntry.objects.create(user=user, total_points=points, rank=rank)

        workout_data = [
            ("Wall-Crawl HIIT", "hard", "full body", users[0]),
            ("Arc Reactor Core", "medium", "core", users[1]),
            ("Knight Strength", "hard", "strength", users[2]),
            ("Krypton Cardio", "medium", "cardio", users[3]),
        ]
        for name, difficulty, target_group, user in workout_data:
            Workout.objects.create(
                name=name,
                difficulty=difficulty,
                target_group=target_group,
                suggested_for=user,
            )

        self.stdout.write(self.style.SUCCESS("octofit_db 테스트 데이터 적재가 완료되었습니다."))
