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
  document.getElementById('submitmwf').onclick = function(){ location.reload();}
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
    var usddeposit = document.querySelector('#samount').value * 3.5599
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
  if (samount == 'None'){ samount = 0.00} else {document.querySelector('#samount').value = parseFloat(samount);}
  rfirstname = document.querySelector('#rfirstnamed').innerHTML
  document.querySelector('#rfirstname').value = rfirstname
  rlastname  = document.querySelector('#rlastnamed').innerHTML
  document.querySelector('#rlastname').value = rlastname
  rcurrency  = document.querySelector('#rcurrencyd').innerHTML
  document.querySelector('#rcurrency').value = rcurrency
  ramount    = document.querySelector('#ramountd').innerHTML
  if (ramount == 'None'){ ramount = 0.00} else {document.querySelector('#ramount').value = parseFloat(ramount);}
  vcurrency  = document.querySelector('#vcurrencyd').innerHTML
  document.querySelector('#vcurrency').value = vcurrency
  vamount    = document.querySelector('#vamountd').innerHTML
  if (vamount == 'None'){ vamount = 0.00} else {document.querySelector('#vamount').value = parseFloat(vamount);}
}

function variances(){
    var scurrency = document.querySelector('#scurrency').value
    var samount = document.querySelector('#samount').value
    if (samount ==''){samount = parseFloat(0.00) } else {samount = parseFloat(samount) }
    var rcurrency = document.querySelector('#rcurrency').value 
    var ramount = document.querySelector('#ramount').value
    if (ramount ==''){ramount = parseFloat(0.00) } else {ramount = parseFloat(ramount) }
    document.querySelectorAll('.amount').forEach(function(amount){
          amount.onchange = function(){
                if(amount.id === "samount" && scurrency === "AED"){
                      totalaedamount = (parseFloat(amount.value) + samount)
                      equivalentusd = totalaedamount / 3.68
                      if(equivalentusd >= ramount){
                        variance = equivalentusd - equivalentusd
                        document.querySelector('#vcurrency').value = "USD"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                      else if(equivalentusd < ramount){
                        variance = (ramount - equivalentusd) * 3.68
                        document.querySelector('#vcurrency').value = "AED"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                }else if(amount.id === "samount" && scurrency === "USD"){
                      totalusdamount = (parseFloat(amount.value) + samount) 
                      equivalentaed = totalusdamount * 3.5599
                      if(equivalentaed >= ramount){
                        variance = (equivalentaed - ramount)
                        document.querySelector('#vcurrency').value = "AED"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                      else if(equivalentaed < ramount){
                        variance = (ramount - equivalentaed) / 3.5599
                        document.querySelector('#vcurrency').value = "USD"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                }else if(amount.id === "ramount" && rcurrency === "AED"){
                      totalaedamount = (parseFloat(amount.value) + ramount)
                      equivalentaed = samount * 3.5599
                      if(totalaedamount > equivalentaed){
                        variance = (totalaedamount - equivalentaed) / 3.5599
                        document.querySelector('#vcurrency').value = "USD"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                      if(totalaedamount <= equivalentaed){
                        variance = (equivalentaed - totalaedamount)
                        document.querySelector('#vcurrency').value = "AED"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                }else if(amount.id === "ramount" && rcurrency === "USD"){
                      const totalusdamount = parseFloat(amount.value) + ramount
                      const equivalentusd = samount / 3.68
                      if(totalusdamount > equivalentusd){
                        variance = (totalusdamount - equivalentusd) * 3.68
                        document.querySelector('#vcurrency').value = "AED"
                        document.querySelector('#vamount').value = variance.toFixed(2);
                      }
                      else if(totalusdamount <= equivalentusd){
                      variance = equivalentusd - totalusdamount
                      document.querySelector('#vcurrency').value = "USD"
                      document.querySelector('#vamount').value = variance.toFixed(2);
                    }
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