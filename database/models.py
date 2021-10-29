from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.core.exceptions import ValidationError
from datetime import datetime, timedelta 

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, name=None, is_active=True, password=None, is_staff=False, is_admin=False, ):
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

    @property
    def is_superuser(self):
        return self.staff and self.admin and self.active



User = get_user_model()

class Trip(models.Model):
    type        = models.CharField(max_length=50)
    name        = models.CharField(max_length=50, unique=True)
    location    = models.CharField( max_length=50)
    description = models.TextField(null=True)
    price       = models.IntegerField(null=True, default=None)


    def __str__(self):
        return self.name

    @property
    def ratingsCount(self):
        return self.reviews.all().count()

    @property
    def ratings(self):
        result = Trip.objects.annotate(total_ratings=Sum('reviews__ratings')).filter(id = self.id)
        for r in result:
            net = r.total_ratings
        net = result[0].total_ratings
        if net:
            return round(net/self.reviews.all().count(), 1)
        return "No Ratings"

class AdminMedia(models.Model):
    trip         = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="adminmedia",blank=True, null=True)
    image        = models.ImageField( upload_to='admin media/images', max_length=None, null=True, blank=True)
    video        = models.FileField( upload_to='admin media/videos', max_length=None, null=True, blank=True)
    displayImage = models.BooleanField(default=False)

    def __str__(self):
        if self.trip != None:
            return self.trip.name
        return "Webpage Related"

    def save(self, *args, **kwargs):
        if self.displayImage:
            if self.video:
                raise ValidationError('Video cant be used as Display Image')
            else:
                try:
                    temp = AdminMedia.objects.get(displayImage=True, trip = self.trip)
                    if self != temp:
                        temp.displayImage = False
                        temp.save()
                except AdminMedia.DoesNotExist:
                    pass
        super(AdminMedia, self).save(*args, **kwargs)
    
class Review(models.Model):
    RATING_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    )
    user         = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    trip         = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="reviews")
    ratings      = models.IntegerField( choices=RATING_CHOICES, )
    description  = models.CharField( max_length=500, blank=True,null=True)
    created      = models.DateTimeField(auto_now_add=True)       

    def __str__(self):
        return f"{self.user.name} - {self.trip.name}"

# class AdditionalUsers(models.Model):
#     Name  = models.CharField(max_length=50)
#     email = models.EmailField(max_length=254)

class Booking(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE, related_name="booking")
    trip           = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="booking") 
    phoneNumber    = models.IntegerField(null=True)
    approved       = models.BooleanField(default=False)
    created        = models.DateTimeField(auto_now_add=True, null=True)       
    # additionalUser = models.ManyToManyField("AdditionalUsers", on_delete=models.CASCADE, null=True, blank=True)

class UserMedia(models.Model):
    user      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usermedia")
    image     = models.ImageField( upload_to='media/images', max_length=None, null=True, blank=True)
    video     = models.FileField( upload_to='media/videos', max_length=None, null=True, blank=True)
    approved  = models.BooleanField(default=False)

class Blog(models.Model):
    title    = models.CharField(max_length=50)
    image    = models.ImageField( upload_to='media/images', max_length=None)
    user     = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    blog     = models.TextField()
    likes    = models.ManyToManyField(User, related_name="likes", blank=True)
    dislikes = models.ManyToManyField(User, related_name="dislikes", blank=True)
    location = models.CharField(max_length=100)
    created  = models.DateTimeField(auto_now_add=True,null=True)    
    featured = models.BooleanField(default=False)   
    approved = models.BooleanField(default=False)   

    def __str__(self):
        return self.title

    @property
    def netlikes(self):
        return self.likes.count() - self.dislikes.count() 

class BlogMedia(models.Model):
    blog  = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blogmedia")
    image = models.ImageField( upload_to='media/images', max_length=None)

    def __str__(self):
        return self.blog.title

class Query(models.Model):
    MY_CHOICES = (
        ('1', 'Booking'),
        ('2', 'Trip'),
        ('3', 'Query 3'),
        ('4', 'Query 4'),
        ('5', 'Query 5'),
        ('6', 'Other'),
    )
    choice      = models.CharField( max_length=8,choices=MY_CHOICES)
    query       = models.CharField( max_length=1000, default="")
    email       = models.EmailField( max_length=254, null=True, blank=True)
    name        = models.CharField( max_length=50, null=True, blank=True)
    user        = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    phoneNumber = models.IntegerField(default=None,blank=True,null=True)
    created     = models.DateTimeField(auto_now_add=True,null=True)       

    class Meta:
        verbose_name_plural = 'Queries'

    def __str__(self):
        return self.get_choice_display()

class GalleryPageTemp(models.Model):        # for explore page
    userKey    = models.CharField(max_length=100)
    previousId = models.CharField( max_length=10000, default='')
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)

    class Meta:
        verbose_name = 'Temp'

    def __str__(self):
        return self.userKey

    @property
    def created(self):
        return (self.created_at.astimezone())

    @property
    def updated(self):
        return (self.updated_at.astimezone())

class FAQ(models.Model): 
    question = models.CharField( max_length=500, default='')
    answer   =  models.CharField( max_length=500, default='')

    def __str__(self):
        return self.question

class WhitelistedTokens(models.Model):
    def now_plus_7(): 
        return datetime.now().astimezone() + timedelta(days = 7)
    token  = models.CharField( max_length=500)
    user   = models.ForeignKey(User, on_delete=models.CASCADE)
    expiry = models.DateTimeField(default=now_plus_7)

    class Meta:
        verbose_name_plural = 'Whitelisted Tokens'