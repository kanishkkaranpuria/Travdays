from rest_framework.pagination import PageNumberPagination


class TripsPagination(PageNumberPagination):
    page_size = 2

class TripMediaPagination(PageNumberPagination):
    page_size = 2

class ReviewsPagination(PageNumberPagination):
    page_size = 3


