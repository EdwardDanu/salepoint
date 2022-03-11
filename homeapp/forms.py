from django import forms
from .models import  Deposits
from datetime import date

class loginuser(forms.Form):
  username = forms.CharField(max_length=64, label='username', 
     widget=forms.TextInput(attrs={'class': 'form-control','width':'40%'}))
  password = forms.CharField(label='password', 
     widget=forms.PasswordInput(attrs={'class': 'form-control','width':'40%'}))

today = date.today()
Currency = [('CURRENCY', 'Currency'),('AED', 'AED'),('USD', 'USD')]

class ZimDepositsForm(forms.ModelForm):
   class Meta:
       model = Deposits
       fields = ['space','reference', 'date', 'sfirstname', 'slastname','scurrency','samount', 'referenceb','rfirstname', 'rlastname','rcurrency', 'ramount', 'vcurrency', 'vamount']
       labels = {'space':'Sender Details','reference':'', 'date':'', 'sfirstname':'', 'slastname':'','scurrency':'', 'samount':'', 'referenceb':'Receivers Details!','rfirstname':'', 
       'rlastname':'','rcurrency':'','ramount':'', 'vcurrency':'', 'vamount':''}
       widgets = {'space': forms.TextInput(attrs={'class':'spacefield', 'autocomplete':'off', 'disabled':'True'}),
                  'reference' : forms.TextInput(attrs={'class':'border border-primary textforma', 'id': 'referenced'}),
                  'date'      : forms.TextInput(attrs={'class':'border border-primary textforma','value' : today }),
                  'sfirstname': forms.TextInput(attrs={'class':'border border-primary textforma','placeholder': 'Firstname', 'id': 'sfirstname'}),
                  'slastname' : forms.TextInput(attrs={'class':'border border-primary textforma', 'placeholder': 'Lastname', 'id': 'slastname'}), 
                  'scurrency' : forms.Select(choices = Currency, attrs={'class': 'border border-primary textforma', 'placeholder': 'Currency', 'id':'scurrency'}),
                  'samount'   : forms.NumberInput(attrs={'class':'border border-primary textforma amount', 'placeholder': 'Amount', 'id':'samount'}),
                  'referenceb': forms.TextInput(attrs={'class':'spacefield', 'autocomplete':'off', 'disabled':'True'}), 
                  'rfirstname': forms.TextInput(attrs={'class':'border border-primary textforma','placeholder': 'Firstname', 'id': 'rfirstname'}),
                  'rlastname' : forms.TextInput(attrs={'class':'border border-primary textforma', 'placeholder': 'Lastname', 'id': 'rlastname'}),
                  'rcurrency' : forms.TextInput(attrs={'class':'border border-primary textforma', 'placeholder': 'Currency', 'id':'rcurrency'}),
                  'ramount'   : forms.NumberInput(attrs={'class':'border border-primary textforma amount', 'placeholder': 'Amount', 'id':'ramount'}),
                  'vcurrency' : forms.TextInput(attrs={'class':'border border-primary textforma', 'placeholder': 'Variance Currency', 'id':'vcurrency'}),
                  'vamount'   : forms.NumberInput(attrs={'class':'border border-primary textforma', 'placeholder': 'Variance Amount', 'id':'vamount'})   
       }