from rest_framework import serializers
from shop_product.serializers import ProductSerializer
from shop_product.models import Product
from .models import Cart, CartItem, Order, OrderItem, Payment


# ------------------ Cart Serializer ------------------
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # فقط برای نمایش جزئیات محصول
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )  # دریافت product_id هنگام ایجاد/آپدیت

    class Meta:
        model = CartItem
        fields = [
            "id",
            "cart",
            "product",
            "product_id",
            "quantity",
            "created",
            "updated",
        ]

    def create(self, validated_data):
        # product_id را از validated_data بگیر
        product = validated_data.pop("product_id")  # شناسه محصول را دریافت کن
        # ساختن CartItem با محصول
        cart_item = CartItem.objects.create(product=product, **validated_data)
        return cart_item


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()
    total_items = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = [
            "id",
            "cart_items",
            "total_price",
            "total_items",
            "created",
            "updated",
        ]


# ------------------ Order Serializer ------------------
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price", "total_price"]


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = [
            "id",
            "order_items",
            "total_amount",
            "payment_status",
            "total_items",
            "created",
            "updated",
        ]


# ------------------ Payment Serializer ------------------
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "order", "amount", "payment_method", "payment_date", "status"]
