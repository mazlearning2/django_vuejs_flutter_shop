from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Cart, CartItem, Order, OrderItem, Payment
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer, PaymentSerializer

# Create your views here. 

class CartListCreateApiView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

class CartItemCreateApiView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        serializer.save(cart=cart)

class CartItemDeleteApiView(generics.DestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)
    

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        total_amount = cart.total_price
        order = serializer.save(user=self.request.user, total_amount=total_amount)
        
        # Add CartItems to OrderItems
        for item in cart.cart_items.all():
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)

        # Clear the cart after order is created
        cart.cart_items.all().delete()

class PaymentCreateView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        order = Order.objects.get(id=self.kwargs['order_id'], user=self.request.user)
        serializer.save(order=order, amount=order.total_amount)


