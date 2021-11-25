from django.urls import path
from .views import BlogDisplayView2,AllBlogsDisplayView,BlogDisplayView,BlogsDisplayVoteFilter,BlogsDisplayCreatedFilter,BlogsDisplayFeaturedFilter,CreateBlog,BlogLikeDislike



urlpatterns = [
    path('display', AllBlogsDisplayView.as_view()),
    path('indi/<var>/<int:pk>', BlogDisplayView.as_view()),
    path('blog2/<int:pk>/<int:page>', BlogDisplayView2.as_view()),
    path('votefilter', BlogsDisplayVoteFilter.as_view()),
    path('created', BlogsDisplayCreatedFilter.as_view()),
    path('featured', BlogsDisplayFeaturedFilter.as_view()),
    path('create', CreateBlog.as_view()),
    path('vote', BlogLikeDislike.as_view()),
    # path('universal/<variable>', BlogsDisplayUniversalFilter.as_view()),
    # path('display/<int:pk>', AllBlogsDisplayView.as_view()),
] 
