from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def forgot_password(request):

    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:5173/reset-password/{uid}/{token}"

        send_mail(
            "Reset your HRMS password",
            f"Click this link to reset password:\n{reset_link}",
            "noreply@hrmslite.com",
            [email],
        )

        return Response({"message": "Reset link sent"}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def reset_password(request, uid, token):

    try:

        uid = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):

            new_password = request.data.get("password")
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password reset successful"})

        return Response({"error": "Invalid token"}, status=400)

    except Exception:
        return Response({"error": "Invalid request"}, status=400)