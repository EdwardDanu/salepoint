from django.urls import path
from . import views

urlpatterns = [
      path('', views.index, name='index'), 
      path("login", views.login_view, name="login"),
      path("logout", views.logout_view, name="logout"),
      path("register", views.register, name="register"),
      path('home/loadindex', views.loadindex, name='loadindex'),
      path('newentry', views.newentry, name='newentry'),
      path('moneywave/<str:name>', views.moneywave, name='moneywave'),
      path('newbudgetitem/<str:name>', views.newbudgetitem, name='newbudgetitem'),
      path('budget/<str:name>', views.budget_entry, name='budget_entry'),
  ]
