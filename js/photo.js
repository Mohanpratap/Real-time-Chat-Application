const  di = document.getElementById('pho');
const photo = document.querySelector('#image');
const btn = document.querySelector('#uploadbtn');
const file = document.querySelector('#file');
// const li = document.querySelector('.icon-photo');
 
 btn.style.display = "none";
di.addEventListener('mouseenter', function(){
      photo.style.display = "none";
      btn.style.display = "block";
    
});

 di.addEventListener('mouseleave', function(){
     photo.style.display = "block";
      btn.style.display = "none";
});

file.addEventListener('change', function(){
      const choosedFile = this.files[0];

if(choosedFile){
      const reader = new FileReader();
      
      reader.addEventListener('load', function(){
            photo.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);

}
});
