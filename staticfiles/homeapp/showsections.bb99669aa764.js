document.addEventListener('DOMContentLoaded', function(){
  load_index('home/loadindex')
});
  function load_index(postlink){
      fetch(postlink)
      .then(response => response.json())
      .then(results => {
        const windowwith = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var cartitemnumber = results[results.length-1].length
        document.querySelectorAll('.customeroption').forEach(function(option){
            option.onclick = function(){
                    selectedoption = []
                    var section;
                    for (section = 0; section < results[option.id].length; section++){
                        if (results[option.id][section][0].entry.brandsection == option.innerHTML){
                            selectedoption.push(results[option.id][section][0])
                            }
                    }
                    document.querySelector('.navbar-toggler').click();
                    domspace = document.getElementById('image-slider-perfumes')
                    domspace.innerHTML =''
                    for (var image = 0; image < selectedoption.length; image++){
                            var sinlgenode = selectedoption[image] 
                            var mainthumbnail = document.createElement('div')
                                mainthumbnail.id = sinlgenode.entry.entryid
                                mainthumbnail.className = "thumbnail"
                            var thumbnailimages = document.createElement('img')
                                thumbnailimages.id = `img-${image}`
                                thumbnailimages.className = "img-list"
                                thumbnailimages.src = sinlgenode['images']
                                mainthumbnail.appendChild(thumbnailimages)
                            var productdetails = document.createElement('span')
                                productdetails.className = "product-details"
                                productdetails.id = option.id
                            var hrclass = document.createElement('hr')
                                hrclass.className = "hrclass"
                                productdetails.appendChild(hrclass)
                            var thumbnailbrand = document.createElement('h6')
                                thumbnailbrand.innerHTML = sinlgenode.entry.brand
                                productdetails.appendChild(thumbnailbrand)
                            var thumbnailprice = document.createElement('h6')
                                thumbnailprice.innerHTML = sinlgenode.entry.price
                                productdetails.appendChild(thumbnailprice)
                                mainthumbnail.appendChild(productdetails)
                            var thumbnailitemid = document.createElement('div')
                                thumbnailitemid.id = image
                                mainthumbnail.appendChild(thumbnailitemid)
                            document.getElementById('image-slider-perfumes').appendChild(mainthumbnail)
                            
                    }
                    document.querySelectorAll('.thumbnail').forEach(function(thumbnail){
                        thumbnail.addEventListener("click", function() {
                                document.getElementById('main-lines-container').innerHTML =''
                                thumbnailworks(results, thumbnail)
                          })
                      })
                }
        });

        
        var setofallitems = results
        var firstlength = results.length-2
          for (var result = 0; result < firstlength; result++){
                  if (result === 0){sectionid = 'image-slider-perfumes'} else if(result === 1){sectionid = 'image-slider-clothes'}
                  else if(result === 2){sectionid = 'image-slider-shoes'} else if(result === 3){sectionid = 'image-slider-hair'}
                  else{ sectionid = 'image-slider'}
                  for (var image = 0; image < setofallitems[result].length; image++){
                          var sinlgenode = setofallitems[result][image][0] 
                          var mainthumbnail = document.createElement('div')
                              mainthumbnail.id = sinlgenode.entry.entryid
                              mainthumbnail.className = "thumbnail"
                          var thumbnailimages = document.createElement('img')
                              thumbnailimages.id = `img-${image}`
                              thumbnailimages.className = "img-list"
                              thumbnailimages.src = sinlgenode['images']
                              mainthumbnail.appendChild(thumbnailimages)
                          var productdetails = document.createElement('span')
                              productdetails.className = "product-details"
                              productdetails.id = result
                          var hrclass = document.createElement('hr')
                              hrclass.className = "hrclass"
                              productdetails.appendChild(hrclass)
                          var thumbnailbrand = document.createElement('h6')
                              thumbnailbrand.innerHTML = sinlgenode.entry.brand
                              productdetails.appendChild(thumbnailbrand)
                          var thumbnailprice = document.createElement('h6')
                              thumbnailprice.innerHTML = '$' + sinlgenode.entry.price
                              productdetails.appendChild(thumbnailprice)
                              mainthumbnail.appendChild(productdetails)
                          var thumbnailitemid = document.createElement('div')
                              thumbnailitemid.id = image
                              mainthumbnail.appendChild(thumbnailitemid)
                          document.getElementById(`${sectionid}`).appendChild(mainthumbnail)
                  }
          }

          document.querySelectorAll('.thumbnail').forEach(function(thumbnail){
            thumbnail.addEventListener("click", function() {
                    document.getElementById('main-lines-container').innerHTML =''
                    if (windowwith < 430){
                        window.scrollTo(0, 380);
                    }else {
                        window.scrollTo(0, 450);
                    }
                    thumbnailworks(results, thumbnail);
              })
          })

        if (windowwith < 990){
            togglebutton = document.querySelector('.navbar-toggler') 
            togglebutton.onclick = function(){
                bodypadding = document.querySelector('body').style.paddingTop
                if (bodypadding === "355px" ){
                  document.querySelector('body').style.paddingTop = "0px"
                }else{
                  document.querySelector('body').style.paddingTop = "355px"
                }
            }

        }else{
          
          document.querySelectorAll('.slide-containers').forEach(function(anything){
            var buttonLeft = anything.firstElementChild
            var slider = anything.children[1]
            var buttonRight = anything.lastElementChild
                buttonLeft.addEventListener("click", function(event) {
                slider.scrollLeft -= 200
                })
                buttonRight.addEventListener("click", function(event) {
                slider.scrollLeft += 200
                })  
           })
        }
         
        document.querySelector('.notification').onclick = function() {
                cartindex = results.length-1
                cartlenght = results[cartindex].length
                if (cartlenght < 1){
                        alert(" You have not yet added items to cart");}
                else{
                    domspace = document.getElementById('main-lines-container')
                    if (windowwith < 430) {document.querySelector('.navbar-toggler').click(); window.scrollTo(0, 380);}
                    else {document.querySelector('.navbar-toggler').click(); window.scrollTo(0, 320);}
                    domspace.innerHTML =''
                        var cartmainitem = document.createElement('div')
                        cartmainitem.className = "cartmainitem"
                        for (var cart = 0; cart < cartlenght ; cart++){
                                cartmodelindex = results[cartindex][cart].modelindex
                                cartentryindex = results[cartindex][cart].entryindex
                                cartquntity = results[cartindex][cart].quantity
                                cartpath = results[cartmodelindex][cartentryindex][0]
                                var cartitem = document.createElement('span')
                                    cartitem.id = `cartentry-${cartentryindex}`
                                    cartitem.className = "cart-item-list"
                                var cartimages = document.createElement('img')
                                    cartimages.id = `img-${cart}`
                                    cartimages.className = "cart-img-list"
                                    cartimages.src = cartpath['images']
                                    cartitem.appendChild(cartimages)
                                    var hrclass = document.createElement('br')
                                    hrclass.className = "hrclass"
                                    cartitem.appendChild(hrclass)
                                var cartproductdetails = document.createElement('span')
                                    cartproductdetails.className = "cart-product-details"
                                var cartbrand = document.createElement('h6')
                                    cartbrand.innerHTML = cartpath.entry.brand
                                    cartproductdetails.appendChild(cartbrand)
                                var cartprice = document.createElement('h6')
                                    cartprice.innerHTML = '$' + cartpath.entry.price
                                    cartproductdetails.appendChild(cartprice)
                                    cartitem.appendChild(cartproductdetails)
                                    cartmainitem.appendChild(cartitem)
                                    
                        }
                        domspace.innerHTML = "<h3 class='carttitle'> Cart items </h3>"
                        domspace.appendChild(cartmainitem)
                        var cartorder = document.createElement('button');
                            cartorder.className = "btn border border-warning"
                            cartorder.id = "cartorder"
                            cartorder.innerHTML = "Confirm your Order"
                            domspace.appendChild(cartorder)
                            cartorder.addEventListener("click", function() {
                            fetch('home/loadindex', {
                                        method: 'POST', 
                                        body: JSON.stringify({
                                        modelindex: 1,
                                        entryindex: 1,
                                        quantity: "ordernow",
                                        })
                            })
                            .then(response => response.json())
                            .then(result => {});
                            cartitemnumber = 0
                            document.getElementById('badges').innerHTML = cartitemnumber;
                            document.querySelector('.badge').style.backgroundColor = "rgb(240, 237, 232) !important";
                            if (windowwith < 990) {
                                window.scrollTo(0, 380);
                                document.getElementById('mobile-badge').innerHTML = cartitemnumber;
                                document.querySelector('.mobile-badge').style.backgroundColor = "rgb(240, 237, 232) !important";
                            }else{
                                document.getElementById('badges').innerHTML = cartitemnumber;
                                document.querySelector('.badge').style.backgroundColor = "rgb(240, 237, 232) !important";
                            }
                            var ordersummary = document.createElement('div')
                                ordersummary.id  = "OrderedNow"
                            var advance = document.createElement('div')
                                advance.className = "container-fluid border"
                                advance.innerHTML = '<div class="row"><h6 class="advance"> Order Complete <h6></div> <br>'
                                ordersummary.appendChild(advance)
                            var ordermessage = document.createElement('div')
                                ordermessage.className = "container-fluid border"
                                ordermessage.innerHTML = `<h3>Dear ${results[4][0]}</h3>` + 
                                `<b> You have successfully ordered the below items, a confirmation message has been send following an invoice to ${results[4][1]} </b> <br>` +
                                '<hr class="my-2">'
                                ordersummary.appendChild(ordermessage)
                            var uorderlist = document.createElement('ul')
                            for (var cart = 0; cart < cartlenght ; cart++){
                                    cartmodelindex = results[cartindex][cart].modelindex
                                    cartentryindex = results[cartindex][cart].entryindex
                                    cartquntity = results[cartindex][cart].quantity
                                    cartpath = results[cartmodelindex][cartentryindex][0]
                                    var iorderlist = document.createElement('li')
                                        iorderlist.innerHTML = `${cartpath.entry.brand}     ` + `   $${cartpath.entry.price}` + "<br>"
                                    uorderlist.appendChild(iorderlist)            
                            }
                            ordersummary.appendChild(uorderlist)
                            var lastmessage = document.createElement('div')
                                lastmessage.className = "container-fluid border"
                                lastmessage.innerHTML = '<hr class="my-2">' + 
                                '<h6>Kindly visit our shop to pay half payment or send us an email at sales@eddmoak.com for payment arrangements</h6>'
                            var returnindex = document.createElement('button');
                                returnindex.className = "btn border returntosite border-warning"
                                returnindex.innerHTML = "Return to Site"
                                returnindex.onclick = function(){ window.location.replace('/')}
                                ordersummary.appendChild(returnindex)
                                ordersummary.appendChild(lastmessage)
                            domspace.innerHTML =''
                            domspace.appendChild(ordersummary) 
                            });
                        }
                }
                if (windowwith < 990){ 
                    document.querySelector('#menu-div').innerHTML += '<li class="nav-item mobile-cart"><span id="mobile-badge" class="mobile-badge"></span></li>';
                    document.querySelector('.mobile-badge').innerHTML = cartitemnumber;
                    document.querySelector('.badge').innerHTML = cartitemnumber;
                    if (cartitemnumber > 0 ){
                        document.querySelector('.mobile-badge').style.backgroundColor = "red";
                        document.querySelector('.badge').style.backgroundColor = "red";
                    }else{
                        document.querySelector('.mobile-badge').style.backgroundColor = "rgb(240, 237, 232) !important;";
                        document.querySelector('.badge').style.backgroundColor = "rgb(240, 237, 232) !important;";
                    }
                } else{
                    document.querySelector('.badge').innerHTML = cartitemnumber;
                    if (cartitemnumber > 0 ){
                        document.querySelector('.badge').style.backgroundColor = "red";
                    }else{
                        document.querySelector('.badge').style.backgroundColor = "rgb(240, 237, 232) !important;";
                    }
                }     
        })
}
   

/// function that allows to add to cart
function thumbnailworks(results, thumbnail){
    document.getElementById('main-lines-container').innerHTML =''
    var completewrapper = document.createElement('div')
        completewrapper.id = "complete-wrapper"
    var thumbnailwrapper = document.createElement('div')
        thumbnailwrapper.id = "thumbnail-wrapper"

    for (var item = 0; item < results[thumbnail.children[1].id][thumbnail.lastElementChild.id].length; item++){
            var thumbnailimage = document.createElement('img')
            var br = document.createElement('br')
                thumbnailimage.className = "thumbnail-image"
                thumbnailimage.id = results[thumbnail.children[1].id][thumbnail.lastElementChild.id].id
                thumbnailimage.src = results[thumbnail.children[1].id][thumbnail.lastElementChild.id][item]['images']
                thumbnailwrapper.appendChild(thumbnailimage)
                thumbnailwrapper.appendChild(br)
    }
    completewrapper.appendChild(thumbnailwrapper)

    var mainimage = document.createElement('img')
        mainimage.className = "main-image"
        mainimage.id = "main-image"
        mainimage.src = results[thumbnail.children[1].id][thumbnail.lastElementChild.id][0]['images']
        completewrapper.appendChild(mainimage)

    var itemdescsection = document.createElement('div')
        itemdescsection.className = "itemdesc-section"
    var itembrand = document.createElement('h2')
        itembrand.className = "item-brand"
        itembrand.innerHTML = results[thumbnail.children[1].id][thumbnail.lastElementChild.id][0].entry.brand
        itemdescsection.appendChild(itembrand)
    var itemprice = document.createElement('h4')
        itemprice.className = "item-price"
        itemprice.innerHTML =  "$" + results[thumbnail.children[1].id][thumbnail.lastElementChild.id][0].entry.price + ".00"
        itemdescsection.appendChild(itemprice)
    var itemdesc = document.createElement('p')
        itemdesc.className = "item-desc"
        itemdesc.innerHTML = results[thumbnail.children[1].id][thumbnail.lastElementChild.id][0].entry.description
        itemdescsection.appendChild(itemdesc)
    var plusbutton = document.createElement('button')
        plusbutton.className = "btn border border-warning"
        plusbutton.id = "plusbutton"
        plusbutton.innerHTML = '<i class="fas fa-plus"></i>'
        itemdescsection.appendChild(plusbutton)
    var minusbutton = document.createElement('button')
        minusbutton.className = "btn border border-warning"
        minusbutton.id = "minusbutton"
        minusbutton.innerHTML = '<i class="fas fa-minus"></i>'
        itemdescsection.appendChild(minusbutton)
    var cartcounter = 1
    var cartquantity = document.createElement('cartquantity')
        cartquantity.id = "cartquantity"
        cartquantity.innerHTML = cartcounter
        itemdescsection.appendChild(cartquantity)
    var cartbuttonform = document.createElement('button');
        cartbuttonform.className = "btn border border-warning"
        cartbuttonform.id = "cart-buttons"
        cartbuttonform.innerHTML = "Add to Cart"
        itemdescsection.appendChild(cartbuttonform)
    var backbuttonform = document.createElement('button');
        backbuttonform.className = "btn border border-danger"
        backbuttonform.id = "back-button"
        backbuttonform.innerHTML = "Back"
        backbuttonform.onclick = function(){ window.location.href = "/"}
        itemdescsection.appendChild(backbuttonform)
        completewrapper.appendChild(itemdescsection)
    document.getElementById('main-lines-container').appendChild(completewrapper)

    document.querySelectorAll('.thumbnail-image').forEach(function(viewme){
            viewme.addEventListener("click", function() {
            mainimage.src = viewme.src
            })
    })
    document.getElementById('plusbutton').onclick = function(){
      cartcounter = cartcounter + 1
      document.getElementById('cartquantity').innerHTML = cartcounter
    }
    document.getElementById('minusbutton').onclick = function(){
      if (cartcounter > 0){
          cartcounter = cartcounter - 1;
          document.getElementById('cartquantity').innerHTML = cartcounter
      }
    }
    cartquantity = document.getElementById('cartquantity').innerHTML,
    addtocart = document.getElementById('cart-buttons')
    addtocart.addEventListener("click", function() {
        if (results[4][1] === "emai"){
            window.location.replace('login')
        }else{
        {fetch('home/loadindex', {
                method: 'POST',
                body: JSON.stringify({
                modelindex: thumbnail.children[1].id,
                entryindex: thumbnail.lastElementChild.id,
                entrysid: thumbnail.id,
                quantity: cartcounter,
                })
        })
        .then(response => response.json())
        .then(result => {
        cartitemnumber = cartitemnumber + cartcounter
        if(windowwith < 990){ 
            document.querySelector('.mobile-badge').innerHTML = cartitemnumber;
            document.querySelector('.mobile-badge').style.backgroundColor = "red";
        } else{
            document.querySelector('.badge').innerHTML = cartitemnumber
            document.querySelector('.badge').style.backgroundColor = "red";
        }
        });
        window.location.replace('/')}
        }

    })
}