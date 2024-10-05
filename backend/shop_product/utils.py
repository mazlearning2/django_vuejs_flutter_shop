from django.core.exceptions import ValidationError

def validate_image_extension(image):
    valid_extensions = ['jpg', 'jpeg', 'png', 'svg']
    ext = image.name.split('.')[-1].lower()
    if ext not in valid_extensions:
        raise ValidationError('Unsupported file extension. Allowed extensions are: jpg, jpeg, png, svg.')
