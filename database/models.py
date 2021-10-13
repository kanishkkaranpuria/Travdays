from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from django.contrib.auth import get_user_model
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, name=None, is_active=True, password=None, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user_obj = self.model(
            email = self.normalize_email(email)
        )
        user_obj.set_password(password) 
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.name = name
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, password=None, name=None):
        user = self.create_user(
                email,
                name,
                password=password,
                is_staff=True
        )
        return user

    def create_superuser(self, email, password=None, name=None):
        user = self.create_user(
                email,
                name,
                password=password,
                is_staff=True,
                is_admin=True
        )
        return user

class User(AbstractBaseUser):
    name     = models.CharField(max_length=250,blank=True,null=True,default='')
    email    = models.EmailField(max_length=255,unique=True)
    staff    = models.BooleanField(default=False)
    admin    = models.BooleanField(default=False)
    active   = models.BooleanField(default=False) 

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email  

    def get_short_name(self):
        return self.name  

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @is_staff.setter
    def is_staff(self, value):
        self.staff = value    

    @property
    def is_admin(self):
        return self.admin 

    @is_admin.setter
    def is_admin(self, value):
        self.admin = value
            
    @property
    def is_active(self):
        return self.active

    @is_active.setter
    def is_active(self, value):
        self.active = value

User = get_user_model()

class Trip(models.Model):
    name        = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class AdminMedia(models.Model):
    trip  =  models.ForeignKey("Trip", on_delete=models.CASCADE, related_name="adminmedia", null=True, blank=True)
    image = models.ImageField( upload_to=None, max_length=None, null=True, blank=True)
    video = models.FileField( upload_to=None, max_length=None, null=True, blank=True)

# class AdditionalUsers(models.Model):
#     Name  = models.CharField(max_length=50)
#     email = models.EmailField(max_length=254)

class Booking(models.Model):
    user             = models.ForeignKey("database.User", on_delete=models.CASCADE, related_name="booking")
    trip             = models.ForeignKey("Trip", on_delete=models.CASCADE, null=True, blank=True, related_name="booking") 
    phoneNumber      = models.IntegerField(null=True)
    approved         = models.BooleanField(default=False)
    # additionalUser = models.ManyToManyField("AdditionalUsers", on_delete=models.CASCADE, null=True, blank=True)

class UserMedia(models.Model):
    user      = models.ForeignKey("database.User", on_delete=models.CASCADE, related_name="usermedia")
    image     = models.ImageField( upload_to=None, max_length=None, null=True, blank=True)
    video     = models.FileField( upload_to=None, max_length=None, null=True, blank=True)
    approved  = models.BooleanField(default=False)

class Blog(models.Model):
    Name     = models.CharField(max_length=50)
    email    = models.EmailField( max_length=254, blank=True,null=True)
    user     = models.ForeignKey("database.User", on_delete=models.CASCADE, null=True, blank=True)
    blog     = models.TextField()
    likes    = models.ManyToManyField("database.User", related_name="likes")
    dislikes = models.ManyToManyField("database.User", related_name="dislikes")
    location = models.CharField(max_length=100)


class Query(models.Model):
    MY_CHOICES = (
        ('q1', 'Booking'),
        ('q2', 'Trip'),
        ('q3', 'Query 3'),
        ('q4', 'Query 4'),
        ('q5', 'Query 5'),
        ('other', 'Other'),
    )
    choice = models.CharField( max_length=50,choices=MY_CHOICES)
    query  = models.CharField( max_length=1000, default="")
    email  = models.EmailField( max_length=254, null=True, blank=True)
    Name   = models.CharField( max_length=50, null=True, blank=True)
    user   = models.ForeignKey("database.User", on_delete=models.CASCADE, null=True, blank=True)
    class Meta:
        verbose_name_plural = 'Queries'

    def __str__(self):
        return self.choice