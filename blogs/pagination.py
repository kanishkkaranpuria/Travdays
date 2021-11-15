from rest_framework.pagination import PageNumberPagination


class BlogPagination(PageNumberPagination):
    page_size = 4
    # page_query_param = 'page'
    # max_page_size = 1000

class BlogMediaPagination(PageNumberPagination):
    page_size = 2
    # page_query_param = 'page'
    # max_page_size = 1000

