from uuid import uuid4
from django.db import models
from shop_account.models import User
from .utils import validate_image_extension

# Create your models here.

# ---------------------------------- Product Category ----------------------------------

class ProductCategoryManager(models.Manager):
    pass

class ProductCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_category_user')
    title = models.CharField(max_length=300)
    image = models.ImageField(upload_to='product_category_images/', validators=[validate_image_extension])
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductCategoryManager()

    def __str__(self):
        return self.title

# ---------------------------------- Product Brand  ----------------------------------

class ProductBrandManager(models.Manager):
    pass

class ProductBrand(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_brand_user')
    title = models.CharField(max_length=300)
    image = models.ImageField(upload_to='product_brand_images/', validators=[validate_image_extension])
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductBrandManager()

    def __str__(self):
        return self.title



# ---------------------------------- Product ----------------------------------

class ProductManager(models.Manager):
    pass

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_user')
    title = models.CharField(max_length=300)
    price = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    image = models.ImageField(upload_to='product_images/', validators=[validate_image_extension])
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='product_categories')
    brand = models.ForeignKey(ProductBrand, on_delete=models.CASCADE, related_name='product_brands')
    description = models.TextField()
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductManager()

    def __str__(self):
        return self.title


# ---------------------------------- Product Image Slider ----------------------------------

class ProductImageSliderManager(models.Manager):
    pass

class ProductImageSlider(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_image_slider_user')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_image_slider')
    image = models.ImageField(upload_to='product_image_slider/', validators=[validate_image_extension])
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductImageSliderManager()

    def __str__(self):
        return self.id


# ---------------------------------- Product Information ----------------------------------

class ProductInformationManager(models.Manager):
    pass

class ProductInformation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_information_user')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_information')
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductInformationManager()

    def __str__(self):
        return self.title
    
# ---------------------------------- Product Tag ----------------------------------

class ProductTagManager(models.Manager):
    pass

class ProductTag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products_tag_user')
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = ProductTagManager()

    def __str__(self):
        return self.title
