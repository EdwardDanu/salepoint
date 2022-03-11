window.onload = function() {
  //Check File API support
  let counter = 0;
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");
    filesInput.addEventListener("change", function(event) {
      var files = event.target.files; //FileList object
      var output = document.getElementById("result");
      for (var i = 0; i < 5; i++) {
        var file = files[i];
        //Only pics
        if (!file.type.match('image'))
          continue;
        var picReader = new FileReader();
        picReader.addEventListener("load", function(event) {
          var picFile = event.target;
          var div = document.createElement("div");
          div.innerHTML = "<img class='contentone' src='" + picFile.result + "'" +
            "title='" + picFile.name + "'/>";
          output.insertBefore(div, null);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
    });
  } else {
    console.log("Your browser does not support File API");
  }
}
document.addEventListener('DOMContentLoaded', function(){
  var brandsection = document.getElementById("brandsection")
  brandsection.onchange = function() {
  document.querySelectorAll('.selectedbrand').forEach(function(button){
  button.hidden = true
  })
  var selectedValue = brandsection.options[brandsection.selectedIndex].value;
  var selectedoption = document.querySelector(`#${selectedValue}`).removeAttribute("hidden")
  }
  let counter = 0;
  document.querySelector('.addimage').onclick = function(){
       if (counter < 5){
          document.getElementById('files').id ="files";
          document.getElementById('formset').innerHTML= "Add Another Image";
        }else{
           document.getElementById('files').id = "none";
           document.getElementById('formset').innerHTML= "Maximum 5 Images";
        }
      counter++;
  } 
});

/*<script>
      document.addEventListener('DOMContentLoaded', function(){
       var imagenode = document.querySelectorAll('.toclick');
       for (var i = 0; i < imagenode.length; i++){
       var imagesrc = imagenode[i].firstElementChild;
       if (imagenode[i].onclick){
       var x = document.createElement("img");
       x.setAttribute("src", imagesrc.src);
       var space = document.getElementById('mainimage');
       space.appendChild(x);
         }else{
          var imagesrc = imagenode[0].firstElementChild;
          var x = document.createElement("img");
          x.setAttribute("src", imagesrc.src);
          var space = document.getElementById('mainimage');
          space.appendChild(x);
         }
       }
      });
    </script>*/




    /*<script>
      document.addEventListener('DOMContentLoaded', function(){
       document.querySelectorAll('.toclick').forEach(function(button){
         button.onclick = function(){
          var imagesrc = button.firstElementChild;
          var x = document.createElement("img");
          x.setAttribute("src", imagesrc.src);
          var space = document.getElementById('mainimage');
          space.appendChild(x);
         }
        })
       });
    </script>*/





    /*<script>
  document.addEventListener('DOMContentLoaded', function(){
   var imagenode = document.querySelectorAll('.toclick');
   for (var i = 0; i < imagenode.length; i++){
    var image = imagenode[i];
    var imagesrc = imagenode[0].firstElementChild;
    var x = document.createElement("img");
    x.setAttribute("src", imagesrc.src);
    var space = document.getElementById('mainimage');
    space.appendChild(x);
    image.addEventListener("click", function(){
    var x = document.createElement("img");
    x.setAttribute("src", image.firstElementChild.src);
    var space = document.getElementById('mainimage');
    space.appendChild(x);*/