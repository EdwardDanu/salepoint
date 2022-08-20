document.addEventListener('DOMContentLoaded', function(){
  toclick()
  document.querySelectorAll('.buythephone').forEach(function(item){
  item.onclick = function(){
    if (this.id == "addcart") {
      document.querySelector('#anyname').value = this.id
      if(!localStorage.getItem('counter')){
        localStorage.setItem('counter', 1);
       }else{
        counter = document.querySelector('#cartlistcount').innerHTML;
        localStorage.setItem('counter', counter);
       }
      } 
    else if (this.id == "ordernow") {
      document.querySelector('#anyname').value = this.id}
    else {
      document.querySelector('#anyname').value = this.id}
    console.log(document.querySelector('#anyname').value)
    document.getElementById("buyformid").submit();
    }
  })
})

function toclick(){
  document.querySelectorAll('.img-toggler').forEach(function(toggler){
     toggler.onclick = function(){
     oldnode = document.getElementById('main-image-div').firstElementChild
     var newnode = document.createElement("img");
     newnode.setAttribute("src", this.src);
     newnode.setAttribute('class', 'main-image')
     newnode.setAttribute('id', this.id )
     var space = document.getElementById('main-image-div');
     space.replaceChild(newnode, oldnode);
    }
   })
}