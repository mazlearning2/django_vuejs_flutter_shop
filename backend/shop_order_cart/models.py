from uuid import uuid4
from django.db import models
from shop_account.models import User
from shop_product.models import Product


# Create your models here.


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_cart')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

    @property
    def total_price(self):
        return sum(item.total_price for item in self.cart_items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.cart_items.all())
    

class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_item_product')
    quantity = models.PositiveIntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.title} - {self.quantity} pcs"

    @property
    def total_price(self):
        return self.product.price * self.quantity


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_order')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=100, choices=[('Pending', 'Pending'), ('Paid', 'Paid')], default='Pending')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
    
    @property
    def total_items(self):
        return sum(item.quantity for item in self.order_items.all())

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_order_item')
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.title} - {self.quantity} pcs"
    
    @property
    def total_price(self):
        return self.price * self.quantity
    

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment_order')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100, choices=[('Credit Card', 'Credit Card'), ('Paypal', 'Paypal')])
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=[('Success', 'Success'), ('Failed', 'Failed')], default='Pending')
    
    def __str__(self):
        return f"Payment for Order {self.order.id} - {self.status}"
