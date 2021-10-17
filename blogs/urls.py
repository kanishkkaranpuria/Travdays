from django.urls import path
from .views import BlogsDisplayView, BlogsDisplayVoteFilter,BlogsDisplayCreatedFilter,BlogsDisplayFeaturedFilter,CreateBlog,BlogLikeDislike



urlpatterns = [
    path('', BlogsDisplayView.as_view()),
    path('vote', BlogsDisplayVoteFilter.as_view()),
    path('created', BlogsDisplayCreatedFilter.as_view()),
    path('featured', BlogsDisplayFeaturedFilter.as_view()),
    path('create', CreateBlog.as_view()),
    path('vote', BlogLikeDislike.as_view()),
] 
