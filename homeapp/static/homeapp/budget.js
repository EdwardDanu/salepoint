document.addEventListener('DOMContentLoaded', function(){
    var name = document.querySelector('#budgetname').innerHTML
    document.querySelectorAll('.expeincome').forEach(function(item){
        item.onclick = function(){ 
            if (item.className === "btn btn-outline-primary textforma  income expeincome"){
            document.querySelector('#updateincomeitem').removeAttribute("hidden");
            document.querySelector('#budgetmainpage').hidden = true;
            document.querySelector('#incomename').value = item.innerHTML;
        }else{
            document.querySelector('#updateexpenseitem').removeAttribute("hidden");
            document.querySelector('#budgetmainpage').hidden = true;
            document.querySelector('#expensename').value = item.innerHTML;
            }
            }})
    if (name === "addincomeitem"){
        document.querySelector('#addincomeitem').removeAttribute("hidden");
        document.querySelector('#addexpenseitem').hidden = true;
        document.querySelector('#updateincomeitem').hidden = true;
        document.querySelector('#updateexpenseitem').hidden = true;
        document.querySelector('#budgetmainpage').hidden = true;
    } else if(name === "addexpenseitem"){
        document.querySelector('#addexpenseitem').removeAttribute("hidden");
        document.querySelector('#updateexpenseitem').hidden = true;
        document.querySelector('#addbudgetitem').hidden = true;
        document.querySelector('#updateincomeitem').hidden = true;
        document.querySelector('#addincomeitem').hidden = true;
    }else if(name === "budgetmainpage"){
        document.querySelector('#budgetmainpage').removeAttribute("hidden");
        document.querySelector('#updateexpenseitem').hidden = true;
        document.querySelector('#addincomeitem').hidden = true;
        document.querySelector('#addexpenseitem').hidden = true;
        document.querySelector('#updateincomeitem').hidden = true;
    }


})