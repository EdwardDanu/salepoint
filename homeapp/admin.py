from django.contrib import admin
from .models import User, Gadgets, GadgetsImages, Accessories, AccessoriesImages, Clothing, ClothingImages, Cosmetics, CosmeticsImages, Cart, Deposits, USDaccount, AEDaccount

# Register your models here.
admin.site.register(Gadgets)
admin.site.register(GadgetsImages)
admin.site.register(Accessories)
admin.site.register(AccessoriesImages)
admin.site.register(Clothing)
admin.site.register(ClothingImages)
admin.site.register(Cosmetics)
admin.site.register(CosmeticsImages)
admin.site.register(Cart)
admin.site.register(Deposits)
admin.site.register(USDaccount)
admin.site.register(AEDaccount)