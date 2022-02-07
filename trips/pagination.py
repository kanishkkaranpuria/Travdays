from rest_framework.pagination import PageNumberPagination


class TripsPagination(PageNumberPagination):
    page_size = 3

class TripMediaPagination(PageNumberPagination):
    page_size = 5

class ReviewsPagination(PageNumberPagination):
    page_size = 5


