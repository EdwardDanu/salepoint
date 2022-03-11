import email, datetime
from pickle import NONE
from django.db import models
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.db import IntegrityError
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import User, Perfumes, PerfumesImages, Clothing, ClothingImages, Footwear, FootwearImages, Hair, HairImages, Cart, Deposits, USDaccount, AEDaccount
from .forms import loginuser, ZimDepositsForm
from django.core.mail import send_mail
from datetime import date

today = date.today()
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "homeapp/registration.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "homeapp/registration.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "homeapp/registration.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            superusers = User.objects.filter(is_superuser=True)
            if user in superusers:
                login(request, user)
                return redirect('/moneywave/newentry')
            else:
                login(request, user)
                return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "homeapp/login.html", {
              "form":loginuser,
              "message": "Invalid username and/or password."
            })
    else:
        return render(request, "homeapp/login.html", {
        "form":loginuser })


def logout_view(request):
  logout(request)
  return HttpResponseRedirect(reverse("index"))



def newentry(request):
  if request.method == "POST":
    brandsection = request.POST["brandsection"]
    brand = request.POST["brand"]
    trending = request.POST["trending"]
    price = request.POST["price"]
    color = request.POST["color"]
    description = request.POST["description"]
    formset = request.FILES.getlist('images')
    print(brandsection)
    if brandsection == "perfumes":
      entry = Perfumes(brandsection=brandsection, brand=brand, trending=trending, price=price, color=color, description=description)
      entry.save()
      for image in formset:
          image = PerfumesImages(entry=entry, images=image)
          image.save()
    elif brandsection == "clothing":
      entry = Clothing(brandsection=brandsection, brand=brand, trending=trending, price=price, color=color, description=description)
      entry.save()
      for image in formset:
          image = ClothingImages(entry=entry, images=image)
          image.save()
    elif brandsection == "footwear":
      entry = Footwear(brandsection=brandsection, brand=brand, trending=trending, price=price, color=color, description=description)
      entry.save()
      for image in formset:
          image = FootwearImages(entry=entry, images=image)
          image.save()
    else:
      entry = Hair(brandsection=brandsection, brand=brand, trending=trending, price=price, color=color, description=description)
      entry.save()
      for image in formset:
          image = HairImages(entry=entry, images=image)
          image.save()
    return HttpResponseRedirect(reverse("index"))
  else:
    return render(request, "homeapp/newentries.html")
  
def index(request):
  if request.POST:
    pass
  else:
    data = request.user
    return render(request, "homeapp/index.html")

@csrf_exempt
def loadindex(request):
  if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            modelindex = data.get("modelindex")
            entryindex = data.get("entryindex")
            entrysid = data.get("entrysid")
            quantity = data.get("quantity")
            if quantity == "ordernow":
                emailbody = ''
                counter = 1
                for order in Cart.objects.filter(user=request.user.username):
                      if order.modelindex == 0:
                          message = ''.join([str(counter) , ". ", Perfumes.objects.get(id= order.entrysid).brand," ", str(order.quantity), " unit/s"])
                      if order.modelindex == 1:
                          message = ''.join([str(counter) , ". ", Clothing.objects.get(id= order.entrysid).brand," ", str(order.quantity), " unit/s"])
                      if order.modelindex == 2:
                          message = ''.join([str(counter), " .", Footwear.objects.get(id= order.entrysid).brand," ", str(order.quantity), " unit/s"])
                      if order.modelindex == 4:
                          message = ''.join([str(counter) , ". ", Hair.objects.get(id= order.entrysid).brand," ", str(order.quantity), " unit/s"])
                      order.delete()
                      counter = counter + 1
                emailbody = emailbody + message + "\n"
                send_mail(
                'Thanks for placing an order with us',
                'We have received your order and the same is being processed. For any changes to your order, kindly reply to the same email \n' +
                'Kindly visit our shop to pay half payment or send us an email at sales@eddmoak.com for payment arrangements' +
                emailbody,
                "sales@eddmoak.com",
                [request.user.email],)
                return render(request, "homeapp/index.html")
            else:
                cart = Cart(user = request.user.username, modelindex = modelindex, entryindex = entryindex, entrysid =entrysid, quantity = quantity)
                cart.save()
                return render(request, "homeapp/index.html")
        else:
            print("user not loged in")
            return JsonResponse({'states':"Failed"}, status=201)
  else:
    allperfumes = []
    username = request.user.username
    try:
       email = request.user.email
    except:
       email = "emai"
    for perfume in Perfumes.objects.all():
      sameperfume = []
      for item in perfume.perfumesphoto.all():
          sameperfume.append(item.serialize())
      allperfumes.append(sameperfume)
    allclothing = []
    for clothes in Clothing.objects.all():
      sameclothes = []
      for item in clothes.clothingphoto.all():
          sameclothes.append(item.serialize())
      allclothing.append(sameclothes)
    allfootwear = []
    for footwear in Footwear.objects.all():
      samefootwear = []
      for item in footwear.footwearphoto.all():
          samefootwear.append(item.serialize())
      allfootwear.append(samefootwear)
    allhair = []
    for hair in Hair.objects.all():
      samehair = []
      for item in hair.hairphoto.all():
          samehair.append(item.serialize())
      allhair.append(samehair)
    return JsonResponse([allperfumes, allclothing, allfootwear, allhair, [username, email],
    [sectionitem.serialize() for sectionitem in Cart.objects.filter(user=request.user.username)]],
      safe=False)

@login_required(login_url='login')
def moneywave(request, name):
    if request.method == "POST":
        if USDaccount.objects.all().last() == None:
          usdbalance = 0
        else: 
          usdbalance = USDaccount.objects.all().last().balance
        if AEDaccount.objects.all().last() == None:
          aedbalance = 0
        else:
          aedbalance = AEDaccount.objects.all().last().balance
        form = ZimDepositsForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            if name == "newentry":
                if instance.samount == None:
                    if instance.scurrency == 'USD':
                        balance = aedbalance - instance.ramount
                        if balance < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dollars = AEDaccount(reference = instance.reference, amount = instance.ramount, balance = balance)
                        dollars.save()
                    else:
                        usdbalance - instance.ramount
                        if balance < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dollars = USDaccount(reference = instance.reference, amount = instance.ramount, balance = balance)
                        dollars.save()
                elif instance.ramount == None:
                    if instance.scurrency == 'USD':
                        balance = usdbalance + instance.samount
                        if balance < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dollars = USDaccount(reference = instance.reference, amount = instance.samount, balance = balance)
                        dollars.save()
                    else:
                        balance = aedbalance + instance.samount
                        if balance < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dollars = AEDaccount(reference = instance.reference, amount = instance.samount, balance = balance)
                        dollars.save()
                else:
                    if instance.scurrency == 'USD':
                        balanceus    = usdbalance + instance.samount
                        aedbalanceae = aedbalance - instance.ramount
                        if balanceus < 1 or aedbalanceae < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dollars = USDaccount(reference = instance.reference, amount = instance.samount, balance = balanceus)
                        dirhams = AEDaccount(reference = instance.reference, amount = instance.ramount, balance = aedbalanceae)
                        dollars.save()
                        dirhams.save()
                    else:
                        aedbalanceae = aedbalance + instance.samount
                        balanceus = usdbalance - instance.ramount
                        if balanceus < 1 or aedbalanceae < 1:
                          return HttpResponse("There is no balance to fund this transaction")
                        dirhams = AEDaccount(reference = instance.reference, amount = instance.samount, balance = aedbalanceae)
                        dollars = USDaccount(reference = instance.reference, amount = instance.ramount, balance = balanceus)
                        dollars.save()
                        dirhams.save()
                instance.save()
                return render(request, "homeapp/moneywave.html",{'forms': ZimDepositsForm(), 'name' : 'zim'})
            else:
                entry = Deposits.objects.get(reference = name)
                oldsamount = entry.samount
                oldramount = entry.ramount
                oldvcurrency = entry.vcurrency
                if entry.scurrency == "AED":
                    if oldvcurrency == "AED":
                        entry.samount  = oldsamount + instance.samount
                        entry.vamount = instance.vamount
                        dirham = AEDaccount(reference = instance.reference, amount = instance.samount, balance = aedbalance + instance.samount)
                        dirham.save()
                    elif oldvcurrency == "USD":
                        entry.ramount  = oldramount + instance.ramount
                        entry.vamount = instance.vamount
                        dollar = USDaccount(reference = instance.reference, amount = instance.ramount, balance = usdbalance - instance.ramount)
                        dollar.save()
                elif entry.scurrency == "USD":
                    if oldvcurrency == "AED":
                        entry.ramount  = oldramount + instance.ramount
                        entry.vamount = instance.vamount
                        dirham = AEDaccount(reference = instance.reference, amount = instance.ramount, balance = aedbalance - instance.ramount)
                        dirham.save()
                    elif oldvcurrency == "USD":
                        entry.samount  = oldsamount + instance.samount
                        entry.vamount = instance.vamount
                        dollar = USDaccount(reference = instance.reference, amount = instance.samount, balance = usdbalance + instance.samount)
                        dollar.save()
                entry.save()
                pending = []
                for list in Deposits.objects.all():
                    if list.vamount != 0:
                        pending.append(list)
                if Deposits.objects.all().last() == None:
                  lastreference = 1000
                else: 
                  lastreference = Deposits.objects.all().last().reference[-4:].upper()
                reference = f"DEP{today.strftime('%y%m%d')}{int(lastreference) + 1}" 
                return render(request, "homeapp/moneywave.html",{
                'forms'     : ZimDepositsForm(),
                'name'      : name,
                'reference' : reference,
                'pending'   : pending
                  })
        else:
            print(form.errors)
            return HttpResponseRedirect(reverse("index"))

    else:
      pending = []
      for list in Deposits.objects.all():
        if list.vamount != 0:
            pending.append(list)
      if Deposits.objects.all().last() == None:
        lastreference = 1000
      else: 
        lastreference = Deposits.objects.all().last().reference[-4:].upper()
      reference = f"DEP{today.strftime('%y%m%d')}{int(lastreference) + 1}"
      if name == 'newentry':
          return render(request, "homeapp/moneywave.html",{
                'forms'     : ZimDepositsForm(),
                'name'      : name,
                'reference' : reference,
                'pending'   : pending
            })
      else:
        try:
            entry = Deposits.objects.get(reference = name)
            return render(request, "homeapp/moneywave.html",{
                'forms'     : ZimDepositsForm(),
                'name'      : name,
                'reference' : entry.reference,
                'sfirstname': entry.sfirstname,
                'slastname' : entry.slastname,
                'scurrency' : entry.scurrency,
                'samount'   : entry.samount,
                'rfirstname': entry.rfirstname,
                'rlastname' : entry.rlastname,
                'rcurrency' : entry.rcurrency,
                'ramount'   : entry.ramount,
                'vcurrency' : entry.vcurrency,
                'vamount'   : entry.vamount,
                'pending'   : pending
            })
        except:
          return HttpResponse("There reference numner could not be found")
      

          
