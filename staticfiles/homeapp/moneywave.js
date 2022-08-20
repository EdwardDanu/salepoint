document.addEventListener('DOMContentLoaded', function(){
  
  if (document.querySelector('#name').innerHTML === "newentry"){
        document.getElementById('referenced').value = document.querySelector('#reference').innerHTML
        document.querySelector('#scurrency').onchange = function(){calvariance()}
        document.querySelector('#samount').onchange = function(){calvariance()}
        document.querySelector('#rcurrency').onchange = function(){calvariance()}
        document.querySelector('#ramount').onchange = function(){calvariance()}
  }else{
        editentry();
        variances();
  }
    
});

function calvariance(){
  if (document.querySelector('#scurrency').value == "AED"){
    document.querySelector('#rcurrency').value = "USD"
    var aeddeposit = document.querySelector('#samount').value / 3.68
    var usdwithdrawal = document.querySelector('#ramount').value
    if (aeddeposit < usdwithdrawal){
        var variance = usdwithdrawal * 3.68 - aeddeposit * 3.68
        document.querySelector('#vcurrency').value = "AED"
        document.querySelector('#vamount').value = variance.toFixed(2);
        }
    else if (aeddeposit > usdwithdrawal){
        var variance = aeddeposit - usdwithdrawal
        document.querySelector('#vcurrency').value = "USD"
        document.querySelector('#vamount').value = variance.toFixed(2);
        }

}else{
    document.querySelector('#rcurrency').value = "AED"
    var usddeposit = document.querySelector('#samount').value * 0.97 * 3.67
    var aedwithdrawal = document.querySelector('#ramount').value
    if (usddeposit < aedwithdrawal){
        var variance =  aedwithdrawal * 1.03 / 3.67 - document.querySelector('#samount').value
        document.querySelector('#vcurrency').value = "USD"
        document.querySelector('#vamount').value = variance.toFixed(2);
        }
    else if (usddeposit > aedwithdrawal){
        var variance = usddeposit - aedwithdrawal
        document.querySelector('#vcurrency').value = "AED"
        document.querySelector('#vamount').value = variance.toFixed(2);
        }
 }
}


function editentry(){
  reference  = document.querySelector('#reference').innerHTML
  document.querySelector('#referenced').value = reference
  sfirstname = document.querySelector('#sfirstnamed').innerHTML
  document.querySelector('#sfirstname').value = sfirstname
  slastname  = document.querySelector('#slastnamed').innerHTML
  document.querySelector('#slastname').value = slastname
  scurrency  = document.querySelector('#scurrencyd').innerHTML
  if (scurrency == "AED"){
    document.querySelector('#scurrency').selectedIndex = 1;
  }else if(scurrency == "USD"){
    document.querySelector('#scurrency').selectedIndex = 2;
  }else{
  document.querySelector('#scurrency').selectedIndex = 0;}
  samount    = document.querySelector('#samountd').innerHTML
  document.querySelector('#samount').value = parseFloat(samount);
  rfirstname = document.querySelector('#rfirstnamed').innerHTML
  document.querySelector('#rfirstname').value = rfirstname
  rlastname  = document.querySelector('#rlastnamed').innerHTML
  document.querySelector('#rlastname').value = rlastname
  rcurrency  = document.querySelector('#rcurrencyd').innerHTML
  document.querySelector('#rcurrency').value = rcurrency
  ramount    = document.querySelector('#ramountd').innerHTML
  document.querySelector('#ramount').value = parseFloat(ramount)
  vcurrency  = document.querySelector('#vcurrencyd').innerHTML
  document.querySelector('#vcurrency').value = vcurrency
  vamount    = document.querySelector('#vamountd').innerHTML
  document.querySelector('#vamount').value = parseFloat(vamount)
}

function variances(){
    var samount = document.querySelector('#samount').value
    samount = parseFloat(samount)
    var ramount = document.querySelector('#ramount').value
    ramount = parseFloat(ramount)
    var scurrency = document.querySelector('#scurrency').value
    var rcurrency = document.querySelector('#rcurrency').value
    document.querySelectorAll('.amount').forEach(function(amount){
          amount.onchange = function(){
                if(amount.id === "samount" && scurrency === "AED"){
                      totalaedamount = (parseFloat(amount.value) + samount) / 3.68
                      constusdamount = ramount
                      if(totalaedamount > constusdamount){
                        variance = totalaedamount - constusdamount
                        document.querySelector('#vcurrency').value = "USD"
                      }
                      if(totalaedamount < constusdamount){
                        variance = (constusdamount - totalaedamount) * 3.68
                        document.querySelector('#vcurrency').value = "AED"
                      }
                      document.querySelector('#vamount').value = variance.toFixed(2);
                }else if(amount.id === "samount" && scurrency === "USD"){
                      totalusdamount = (parseFloat(amount.value) + samount) * 1.03 * 3.67 
                      constaedamount = ramount
                      if(totalusdamount > constaedamount){
                        variance = (totalusdamount - constaedamount)
                        document.querySelector('#vcurrency').value = "AED"
                      }
                      if(totalusdamount < constaedamount){
                        variance = (constaedamount - totalusdamount) * 0.97 / 3.67
                        document.querySelector('#vcurrency').value = "USD"
                      }
                      document.querySelector('#vamount').value = variance.toFixed(2);
                }else if(amount.id === "ramount" && rcurrency === "AED"){
                      totalaedamount = (parseFloat(amount.value) + ramount) / 0.97 / 3.67 
                      totalusdamount = samount
                      if(totalaedamount > totalusdamount){
                        variance = (totalaedamount - totalusdamount) / 0.97
                        document.querySelector('#vcurrency').value = "USD"
                      }
                      if(totalaedamount < totalusdamount){
                        variance = (totalusdamount - totalaedamount) * 1.03 * 3.67
                        document.querySelector('#vcurrency').value = "AED"
                      }
                      document.querySelector('#vamount').value = variance.toFixed(2);
                }else if(amount.id === "ramount" && rcurrency === "USD"){
                      const totalusdamount = parseFloat(amount.value) + ramount
                      const constaedamount = samount / 3.68
                      if(totalusdamount > constaedamount){
                        variance = (totalusdamount - constaedamount) * 3.68
                        document.querySelector('#vcurrency').value = "AED"
                      }
                      if(totalusdamount < constaedamount){
                      variance = constaedamount - totalusdamount
                      document.querySelector('#vcurrency').value = "USD"
                    }
                    document.querySelector('#vamount').value = variance.toFixed(2);
                }        
          }
    });
}


















/* 
document.querySelector('#samount').onchange = function(){
  if (document.querySelector('#scurrency').value == "AED"){
    var usddisb = document.querySelector('#samount').value / 3.68
    document.querySelector('#ramount').value = usddisb.toFixed(2);
  }else{
    aeddis = document.querySelector('#samount').value * 0.97 * 3.67
    document.querySelector('#ramount').value = aeddis.toFixed(2);
    }
  }*/