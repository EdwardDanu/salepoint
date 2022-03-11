from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
class User(AbstractUser):
  pass
class Perfumes(models.Model):
  brandsection = models.CharField(max_length=50)
  brand = models.CharField(max_length=50)
  trending = models.BooleanField(default=False)
  price = models.IntegerField()
  color = models.CharField(max_length=64)
  description = models.TextField(max_length=1000)

  def __str__(self): 
      return f"{self.id, self.brand}"  

  def serialize(self):
    return {
    "id": self.id, "brandsection": self.brandsection,"brand": self.brand, "price": self.price,"color": self.color,"description": self.description}

class PerfumesImages(models.Model):
  entry = models.ForeignKey(Perfumes, default=None, on_delete=models.CASCADE, related_name="perfumesphoto")
  images = models.ImageField(upload_to='Perfumes', verbose_name='Image')
  def __str__(self): 
      return f"{self.id, self.entry.brand}"

  def serialize(self):
    return {
      "id": self.id,
      "entry": {"entryid" : self.entry.id, "brandsection" : self.entry.brandsection, "brand" : self.entry.brand, "price" : self.entry.price, "color" : self.entry.color,"description" : self.entry.description},
      "images": self.images.url
    }

#Clothing
class Clothing(models.Model):
  brandsection = models.CharField(max_length=50)
  brand = models.CharField(max_length=50)
  trending = models.BooleanField(default=False)
  price = models.IntegerField()
  color = models.CharField(max_length=64)
  description = models.TextField(max_length=1000)

  def __str__(self): 
      return f"{self.id, self.brand}" 

  def serialize(self):
    return {
    "id": self.id, "brandsection": self.brandsection,"brand": self.brand, "price": self.price,"color": self.color,"description": self.description}

class ClothingImages(models.Model):
  entry = models.ForeignKey(Clothing, default=None, on_delete=models.CASCADE, related_name="clothingphoto")
  images = models.ImageField(upload_to='Clothing', verbose_name='Image')

  def __str__(self): 
      return f"{self.id, self.entry.brand}"

  def serialize(self):
    return {
      "id": self.id,
      "entry": {"entryid" : self.entry.id, "brandsection" : self.entry.brandsection, "brand" : self.entry.brand, "price" : self.entry.price, "color" : self.entry.color,"description" : self.entry.description},
      "images": self.images.url
    }


class Footwear(models.Model):
  brandsection = models.CharField(max_length=50)
  brand = models.CharField(max_length=50)
  trending = models.BooleanField(default=False)
  price = models.IntegerField()
  color = models.CharField(max_length=64)
  description = models.TextField(max_length=1000)

  def __str__(self): 
      return f"{self.id, self.brand}" 

  def serialize(self):
    return {
    "id": self.id, "brandsection": self.brandsection,"brand": self.brand, "price": self.price,"color": self.color,"description": self.description}

class FootwearImages(models.Model):
  entry = models.ForeignKey(Footwear, default=None, on_delete=models.CASCADE, related_name="footwearphoto")
  images = models.ImageField(upload_to='Footwear', verbose_name='Image')

  def __str__(self): 
      return f"{self.id, self.entry.brand}"

  def serialize(self):
    return {
      "id": self.id,
      "entry": {"entryid" : self.entry.id, "brandsection" : self.entry.brandsection, "brand" : self.entry.brand, "price" : self.entry.price, "color" : self.entry.color,"description" : self.entry.description},
      "images": self.images.url
    }

class Hair(models.Model):
  brandsection = models.CharField(max_length=50)
  brand = models.CharField(max_length=50)
  trending = models.BooleanField(default=False)
  price = models.IntegerField()
  color = models.CharField(max_length=64)
  description = models.TextField(max_length=1000)

  def __str__(self): 
      return f"{self.id, self.brand}" 

  def serialize(self):
    return {
    "id": self.id, "brandsection": self.brandsection,"brand": self.brand, "price": self.price,"color": self.color,"description": self.description}

class HairImages(models.Model):
  entry = models.ForeignKey(Hair, default=None, on_delete=models.CASCADE, related_name="hairphoto")
  images = models.ImageField(upload_to='Hair', verbose_name='Image')

  def __str__(self): 
      return f"{self.id, self.entry.brand}"

  def serialize(self):
    return {
      "id": self.id,
      "entry": {"entryid" : self.entry.id, "brandsection" : self.entry.brandsection, "brand" : self.entry.brand, "price" : self.entry.price, "color" : self.entry.color,"description" : self.entry.description},
      "images": self.images.url
    }

class Cart(models.Model):
  user = models.CharField(max_length=100, default=None)
  modelindex = models.IntegerField() 
  entryindex = models.IntegerField()
  entrysid = models.IntegerField()
  quantity = models.IntegerField()

  def __str__(self): 
      return f"{self.user, self.entrysid, self.quantity}" 

  def serialize(self):
    return {
    "id": self.id, "entryindex": self.entryindex, "modelindex": self.modelindex, "quantity":self.quantity}

class Deposits(models.Model):
  space = models.CharField(max_length=50, blank=True)
  reference = models.CharField(max_length=50)
  date = models.DateField()
  sfirstname = models.CharField(max_length=50)
  slastname = models.CharField(max_length=50)
  scurrency = models.CharField(max_length=10)
  samount = models.FloatField(blank=True, null=True)
  referenceb = models.CharField(max_length=50, blank=True)
  rfirstname = models.CharField(max_length=50)
  rlastname = models.CharField(max_length=50)
  rcurrency = models.CharField(max_length=10)
  ramount = models.FloatField(blank=True, null=True)
  vcurrency = models.CharField(max_length=10)
  vamount = models.FloatField(blank=True, null=True)

  def __str__(self): 
      return f"{self.reference}"

class USDaccount(models.Model):
  reference = models.CharField(max_length=50)
  amount = models.FloatField(validators=[MinValueValidator(0.0)])
  balance = models.FloatField(validators=[MinValueValidator(0.0)])

  def __str__(self): 
    return f"{self.balance}"

class AEDaccount(models.Model):
  reference = models.CharField(max_length=50)
  amount = models.FloatField(validators=[MinValueValidator(0.0)])
  balance = models.FloatField(validators=[MinValueValidator(0.0)])

  def __str__(self): 
    return f"{self.balance}"








