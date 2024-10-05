from django.urls import path
from .views import (
    ProductCategoryListCreateView,
    ProductCategoryDetailView,
    ProductBrandListCreateView,
    ProductBrandDetailView,
    ProductListCreateView,
    ProductDetailView,
    ProductImageSliderListCreateView,
    ProductImageSliderDetailView,
    ProductInformationListCreateView,
    ProductInformationDetailView,
)

urlpatterns = [
    # product category routes
    path(
        "categories/",
        ProductCategoryListCreateView.as_view(),
        name="category-list-create",
    ),
    path(
        "categories/<uuid:pk>/",
        ProductCategoryDetailView.as_view(),
        name="category-detail",
    ),
    # product brand routes
    path("brands/", ProductBrandListCreateView.as_view(), name="brand-list-create"),
    path("brands/<uuid:pk>/", ProductBrandDetailView.as_view(), name="brand-detail"),
    # product routes
    path("products/", ProductListCreateView.as_view(), name="product-list-create"),
    path("products/<uuid:pk>/", ProductDetailView.as_view(), name="product-detail"),
    # product image slider routes
    path(
        "product-image-slides/",
        ProductImageSliderListCreateView.as_view(),
        name="product-image-slides-list-create",
    ),
    path(
        "product-image-slides/<uuid:pk>/",
        ProductImageSliderDetailView.as_view(),
        name="product-image-slides-detail",
    ),
    # product information routes
    path(
        "product-information/",
        ProductInformationListCreateView.as_view(),
        name="product-information-list-create",
    ),
    path(
        "product-information/<uuid:pk>/",
        ProductInformationDetailView.as_view(),
        name="product-information-detail",
    ),
]
