from rest_framework import serializers
from .models import (
    ProductCategory,
    ProductBrand,
    Product,
    ProductImageSlider,
    ProductInformation,
)


# -------------------------- Product Category Serializer --------------------------
class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "title", "image", "status", "created", "updated"]

    def validate_title(self, value):
        if len(value) > 300:
            raise serializers.ValidationError("Title cannot exceed 300 characters.")
        return value

    def validate_image(self, value):
        # اگر هیچ تصویری آپلود نشده باشد، مقدار 'value' خالی است و نباید اعتبارسنجی شود
        if not value:
            return None  # مقدار تصویر را دست نزن

        # اگر تصویری آپلود شده باشد، بررسی فرمت فایل
        valid_extensions = ["jpg", "jpeg", "png", "svg"]
        ext = value.name.split(".")[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                "Unsupported file extension. Allowed extensions are: jpg, jpeg, png, svg."
            )
        return value

# -------------------------- Product Brand Serializer --------------------------


class ProductBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ["id", "title", "image", "status", "created", "updated"]

    def validate_title(self, value):
        if len(value) > 300:
            raise serializers.ValidationError("Title cannot exceed 300 characters.")
        return value

    def validate_image(self, value):
        valid_extensions = ["jpg", "jpeg", "png", "svg"]
        ext = value.name.split(".")[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                "Unsupported file extension. Allowed extensions are: jpg, jpeg, png, svg."
            )
        return value


# -------------------------- Product Image Slider --------------------------
class ProductImageSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImageSlider
        fields = [
            "id",
            "product",
            "image",
            "status",
            "created",
            "updated",
        ]

    def validate_image(self, value):
        valid_extensions = ["jpg", "jpeg", "png", "svg"]
        ext = value.name.split(".")[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                "Unsupported file extension. Allowed extensions are: jpg, jpeg, png, svg."
            )
        return value


class ProductInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInformation
        fields = [
            "id",
            "product",
            "title",
            "description",
            "status",
            "created",
            "updated",
        ]

# -------------------------- Product Serializer --------------------------

class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    brand = ProductBrandSerializer()
    image_slider = ProductImageSliderSerializer(many=True, source='product_image_slider')
    information = ProductInformationSerializer(many=True, source='product_information')
    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "price",
            "count",
            "image",
            "category",
            "brand",
            "image_slider",
            "information",
            "description",
            "status",
            "created",
            "updated",
        ]

    def validate_title(self, value):
        if len(value) > 300:
            raise serializers.ValidationError("Title cannot exceed 300 characters.")
        return value

    def validate_image(self, value):
        valid_extensions = ["jpg", "jpeg", "png", "svg"]
        ext = value.name.split(".")[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                "Unsupported file extension. Allowed extensions are: jpg, jpeg, png, svg."
            )
        return value

