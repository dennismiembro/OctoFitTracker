from rest_framework import serializers
from bson import ObjectId

# Helper to convert ObjectId to string
def objectid_to_str(obj):
    return str(obj) if isinstance(obj, ObjectId) else obj

class UserSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()
    team = serializers.CharField(allow_null=True, required=False)

class TeamSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField()
    members = serializers.ListField(child=serializers.CharField(), required=False)

class ActivitySerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    user = serializers.CharField()
    activity_type = serializers.CharField()
    duration = serializers.IntegerField()
    timestamp = serializers.DateTimeField()

class LeaderboardSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    user = serializers.CharField()
    score = serializers.IntegerField()

class WorkoutSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    user = serializers.CharField()
    workout_type = serializers.CharField()
    details = serializers.CharField()
    date = serializers.DateField()
