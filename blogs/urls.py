from django.urls import path
from .views import AllBlogsDisplayView,UserBlogs,BlogApprovalStatus,UnapprovedBlogs,BlogDelete,BlogDisplayView,BlogsDisplayVoteFilter,BlogsDisplayCreatedFilter,BlogsDisplayFeaturedFilter,CreateBlog,BlogLikeDislike



urlpatterns = [
    path('display', AllBlogsDisplayView.as_view()),
    path('indi/<int:pk>/<int:page>', BlogDisplayView.as_view()),
    path('delete/<int:pk>', BlogDelete.as_view()),
    path('unapproved', UnapprovedBlogs.as_view()),
    path('userblogs', UserBlogs.as_view()),
    path('status/<int:pk>', BlogApprovalStatus.as_view()),
    path('votefilter', BlogsDisplayVoteFilter.as_view()),
    path('created', BlogsDisplayCreatedFilter.as_view()),
    path('featured', BlogsDisplayFeaturedFilter.as_view()),
    path('create', CreateBlog.as_view()),
    path('vote', BlogLikeDislike.as_view()),
    # path('singleblog/<var>/<int:pk>', BlogDisplayView.as_view()),
    # path('universal/<variable>', BlogsDisplayUniversalFilter.as_view()),
    # path('display/<int:pk>', AllBlogsDisplayView.as_view()),
] 
