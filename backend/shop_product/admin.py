from django.contrib import admin
from .models import ProductCategory, ProductBrand, Product, ProductImageSlider, ProductInformation, ProductTag
# Register your models here.

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductBrand)
class ProductBrandAdmin(admin.ModelAdmin):
    pass

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductImageSlider)
class ProductImageSliderAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductInformation)
class ProductInformationAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductTag)
class ProductTagAdmin(admin.ModelAdmin):
    pass
