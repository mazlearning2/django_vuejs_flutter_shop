from django.urls import path

from .views import (
    CartListCreateApiView,
    CartItemCreateApiView,
    CartItemDeleteApiView,
    OrderListCreateView,
    PaymentCreateView,
)

urlpatterns = [
    path("cart/", CartListCreateApiView.as_view(), name="cart-list-create"),
    path("cart/items/", CartItemCreateApiView.as_view(), name="cart-item-create"),
    path(
        "cart/items/<uuid:pk>/delete/",
        CartItemDeleteApiView.as_view(),
        name="cart-item-delete",
    ),
    path("orders/", OrderListCreateView.as_view(), name="order-list-create"),
    path(
        "orders/<uuid:order_id>/payment/",
        PaymentCreateView.as_view(),
        name="payment-create",
    ),
]
