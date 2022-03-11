from django.contrib import admin
from .models import Perfumes, PerfumesImages, Clothing, ClothingImages, Footwear, FootwearImages, Hair, HairImages, Cart,Deposits ,USDaccount,AEDaccount

# Register your models here.
admin.site.register(Perfumes)
admin.site.register(PerfumesImages)
admin.site.register(Clothing)
admin.site.register(ClothingImages)
admin.site.register(Footwear)
admin.site.register(FootwearImages)
admin.site.register(Hair)
admin.site.register(HairImages)
admin.site.register(Cart)
admin.site.register(Deposits)
admin.site.register(USDaccount)
admin.site.register(AEDaccount)