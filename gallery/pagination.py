from rest_framework.pagination import PageNumberPagination


class GalleryPagination(PageNumberPagination):
    page_size = 1
    # page_query_param = 'page'
    # max_page_size = 1000

