import jwt
from rest_framework.authentication import BaseAuthentication
from django.middleware.csrf import CsrfViewMiddleware
from rest_framework import exceptions
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status

class CSRFCheck(CsrfViewMiddleware):
    def _reject(self, request, reason):
        # Return the failure reason instead of an HttpResponse
        return reason


class SafeJWTAuthentication(BaseAuthentication):
    '''
        custom authentication class for DRF and JWT
        https://github.com/encode/django-rest-framework/blob/master/rest_framework/authentication.py
    '''

    def authenticate(self, request):

        User = get_user_model()
        authorization_header = request.headers.get('Authorization')
        if authorization_header == "null" or authorization_header is None:
            print("it returned None")
            return None

        print("it came till here")
        print(authorization_header)
        print("it came till here")
        try:
            # header = 'Token xxxxxxxxxxxxxxxxxxxxxxxx'
            access_token = authorization_header
            print(access_token)
            payload = jwt.decode(
                access_token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            print("it came till here1")
            raise exceptions.AuthenticationFailed('access_token expired')
        except IndexError:
            print("it came till here2")
            raise exceptions.AuthenticationFailed(None,'Token prefix missing')

        user = User.objects.filter(id=payload['user_id']).first()
        if user is None:
            print("it came till here3")
            raise exceptions.AuthenticationFailed('User not found')

        if not user.is_active:
            print("it came till here4")
            raise exceptions.AuthenticationFailed('user is inactive')

        self.enforce_csrf(request)
        print(user)
        return (user, None)

    def enforce_csrf(self, request):
        """
        Enforce CSRF validation
        """
        check = CSRFCheck()
        # populates request.META['CSRF_COOKIE'], which is used in process_view()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        print(reason)
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)