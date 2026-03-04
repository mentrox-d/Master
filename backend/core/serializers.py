from rest_framework import serializers
from .models import Employee
from django.core.validators import validate_email


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"

    # Validate Email Format
    def validate_email(self, value):

        validate_email(value)

        # Check duplicate email
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Employee with this email already exists."
            )

        return value

    # Validate duplicate employee ID
    def validate_employee_id(self, value):

        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError(
                "Employee with this ID already exists."
            )

        return value