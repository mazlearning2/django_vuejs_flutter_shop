from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import (
    ProductCategory,
    ProductBrand,
    Product,
    ProductImageSlider,
    ProductInformation,
)
from .serializers import (
    ProductCategorySerializer,
    ProductBrandSerializer,
    ProductSerializer,
    ProductImageSliderSerializer,
    ProductInformationSerializer,
)
from .permissions import IsStaffOrSuperUser, IsOwnerOrSuperUser, IsSuperUser


# ----------------------- Product Category Api View -----------------------
class ProductCategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrSuperUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductCategory.objects.all()
        return ProductCategory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrSuperUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductCategory.objects.all()
        return ProductCategory.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        # کاربر استاف نمی‌تواند وضعیت را تغییر دهد
        category = self.get_object()
        if not self.request.user.is_superuser and category.status:
            raise PermissionDenied("You cannot modify this category.")
        serializer.save()

    def perform_destroy(self, instance):
        # فقط سوپر یوزر یا صاحب دسته‌بندی می‌تواند حذف کند
        if instance.status and not self.request.user.is_superuser:
            raise PermissionDenied("You cannot delete this category.")
        instance.delete()


# ----------------------- Product Brand Api View -----------------------


class ProductBrandListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductBrandSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrSuperUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductBrand.objects.all()
        return ProductBrand.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductBrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductBrandSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrSuperUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductBrand.objects.all()
        return ProductBrand.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        # کاربر استاف نمی‌تواند وضعیت را تغییر دهد
        category = self.get_object()
        if not self.request.user.is_superuser and category.status:
            raise PermissionDenied("You cannot modify this category.")
        serializer.save()

    def perform_destroy(self, instance):
        # فقط سوپر یوزر یا صاحب دسته‌بندی می‌تواند حذف کند
        if instance.status and not self.request.user.is_superuser:
            raise PermissionDenied("You cannot delete this category.")
        instance.delete()


# ----------------------- Product Api View -----------------------


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]  # همه کاربران احراز هویت شده می‌توانند لیست را ببینند

    def get_queryset(self):
        # سوپر یوزر همه محصولات را می‌بیند و استاف فقط محصولات خودش
        if self.request.user.is_superuser:
            return Product.objects.all()
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# جزئیات، ویرایش و حذف محصول (تنها صاحبان محصولات می‌توانند آنها را ویرایش کنند)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # سوپر یوزر همه محصولات را می‌بیند و استاف فقط محصولات خودش
        if self.request.user.is_superuser:
            return Product.objects.all()
        return Product.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        product = self.get_object()
        # کاربران استاف نمی‌توانند محصولاتی که تایید شده‌اند (status=True) را ویرایش کنند
        if not self.request.user.is_superuser and product.status:
            raise PermissionDenied(
                "You cannot modify this product after it has been approved."
            )
        serializer.save()

    def perform_destroy(self, instance):
        # کاربران استاف نمی‌توانند محصولات تایید شده را حذف کنند
        if not self.request.user.is_superuser and instance.status:
            raise PermissionDenied(
                "You cannot delete this product after it has been approved."
            )
        instance.delete()


# ----------------------- Product Image Slider Api View -----------------------


class ProductImageSliderListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductImageSliderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductImageSlider.objects.all()
        return ProductImageSlider.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductImageSliderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductImageSliderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductImageSlider.objects.all()
        return ProductImageSlider.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        productImageSlider = self.get_object()
        # کاربران استاف نمی‌توانند محصولاتی که تایید شده‌اند (status=True) را ویرایش کنند
        if not self.request.user.is_superuser and productImageSlider.status:
            raise PermissionDenied(
                "You cannot modify this product after it has been approved."
            )
        serializer.save()

    def perform_destroy(self, instance):
        # کاربران استاف نمی‌توانند محصولات تایید شده را حذف کنند
        if not self.request.user.is_superuser and instance.status:
            raise PermissionDenied(
                "You cannot delete this product after it has been approved."
            )
        instance.delete()


# ----------------------- Product Information Api View -----------------------


class ProductInformationListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductInformationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductInformation.objects.all()
        return ProductInformation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductInformationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductInformationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProductInformation.objects.all()
        return ProductInformation.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        productInformation = self.get_object()
        if not self.request.user.is_superuser and productInformation.status:
            raise PermissionDenied(
                "You cannot modify this product after it has been approved."
            )
        serializer.save()
    
    def perform_destroy(self, instance):
        # کاربران استاف نمی‌توانند محصولات تایید شده را حذف کنند
        if not self.request.user.is_superuser and instance.status:
            raise PermissionDenied(
                "You cannot delete this product after it has been approved."
            )
        instance.delete()

