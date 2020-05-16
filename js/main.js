
const formId = 'telegramForm'
const form = document.getElementById(formId)
function toJSONString(form) {
  var obj = {}
  var elements = form.querySelectorAll('input, select, textarea')
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i]
    var name = element.name
    var value = element.value
    if (name) {
      obj[name] = value
    }
  }
  return JSON.stringify(obj)
}
if (form) {
  form.addEventListener('submit', event => {

    event.preventDefault()
    const json = toJSONString(form)
    const formReq = new XMLHttpRequest()
    formReq.open('POST', '/telegram', true)
    ///////////////////////////////////
    /////////////SweetAlert////////////
    formReq.onload = function (oEvent) {
      if (formReq.status === 200) {
        swal({
          title: 'Успешно отправлено!',
          icon: 'success',
          timer: 2000
        })
        document.querySelector('.sa-success').style.display = 'block'
        document.querySelector('.sa-button-container').style.opacity = '0'
      }
      if (formReq.status !== 200) {
        swal({
          title: 'Произошла ошибка!',
          icon: 'error',
          timer: 2000
        })
        document.querySelector('.sa-error').style.display = 'block'
        document.querySelector('.sa-button-container').style.opacity = '0'
      }
    }
    ////////////////////////////
    ////////////////////////////
    formReq.setRequestHeader('Content-Type', 'application/json')
    formReq.send(json)
  })
}


// Header animation 

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.menu');
  const navLinks = document.querySelectorAll('.menu li');

  burger.addEventListener('click', () => {
    // Toggle nav
    nav.classList.toggle('nav-active');

    // animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      }
      else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }


    });
    // burder animation
    burger.classList.toggle('toggle');
  });
}
navSlide();

// $(document).ready(function() {
// 	$('#fullpage').fullpage({
// 		//options here
// 		autoScrolling:false,
// 		navigation: true
//   });
// });
AOS.init(
  {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 150, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  }
);  


const slides=document.querySelector(".slider").children;
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const indicator=document.querySelector(".indicator");
let index=0;


  prev.addEventListener("click",function(){
      prevSlide();
      updateCircleIndicator(); 
      resetTimer();
  })

  next.addEventListener("click",function(){
     nextSlide(); 
     updateCircleIndicator();
     resetTimer();
     
  })

  // create circle indicators
   function circleIndicator(){
       for(let i=0; i< slides.length; i++){
         const div=document.createElement("div");
               div.innerHTML=i+1;
               div.setAttribute("onclick","indicateSlide(this)")
               div.id=i;
               if(i==0){
                 div.className="active";
               }
              indicator.appendChild(div);
       }
   }
   circleIndicator();

   function indicateSlide(element){
        index=element.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
   }
    
   function updateCircleIndicator(){
     for(let i=0; i<indicator.children.length; i++){
       indicator.children[i].classList.remove("active");
     }
     indicator.children[index].classList.add("active");
   }

  function prevSlide(){
     if(index==0){
       index=slides.length-1;
     }
     else{
       index--;
     }
     changeSlide();
  }

  function nextSlide(){
     if(index==slides.length-1){
       index=0;
     }
     else{
       index++;
     }
     changeSlide();
  }

  function changeSlide(){
           for(let i=0; i<slides.length; i++){
              slides[i].classList.remove("active");
           }

      slides[index].classList.add("active");
  }

  function resetTimer(){
      // when click to indicator or controls button 
      // stop timer 
      clearInterval(timer);
      // then started again timer
      timer=setInterval(autoPlay,5000);
  }

 
 function autoPlay(){
     nextSlide();
     updateCircleIndicator();
 }

 let timer=setInterval(autoPlay,5000);




// prices items expand

const btn = document.querySelectorAll('.btn__price');
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function () {
    if ($(this).prev().is(':visible')) {
      $(this).text('Подробнее');
      $(this).prev().hide('slow');
    } else {
      $(this).text('Назад');
      $(this).prev().show('slow')
    }
  })

}

// prices for online section

const onlinePrice = $('.btn__online__price');
const onlineInfo = document.querySelector('.online_prices');
onlinePrice.on('click', function () {
  if ($(this).next().is(':visible')) {
    $(this).text('Цены');
    $(this).next().hide('slow');
  } else {
    $(this).text('Свернуть');
    $(this).next().show('slow')
  }
})


// prices more info

let bthMore = $("#price__button")
let counter = 0;

bthMore.on('click', function () {
  if (!counter) {
    $('#price__more').show('slow');
    $(this).text('Назад');
    counter = 1
  }
  else {
    $('#price__more').hide('slow');
    $(this).text('Eщё');
    counter = 0
  }
}
)


//schedule images

function imageGalery() {
  const highlight = document.querySelector('.gallery-highlight');
  const previews = document.querySelectorAll('.image-preview img');

  previews.forEach(preview => {
    preview.addEventListener('click', function () {
      const smallSrc = this.src;
      const bigSrc = smallSrc.replace('small', 'big');
      highlight.src = bigSrc;
      previews.forEach(preview => preview.classList.remove('timetable-active'));
      preview.classList.add('timetable-active')
    })
  })
}
imageGalery()




jQuery(function ($) {
  $('input[type="tel"]').mask("+375 (99) 999-9999", { autoclear: false })
})

let namePattern = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
let telPattern =/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})+$/;
let inputs = document.querySelectorAll('input[data-rules]');
for (let input of inputs)
  input.addEventListener('blur', function () {
    let rules = this.dataset.rules;
    let value = this.value;
    let check;
    switch (rules) {
      case 'tel':
        if (!value.match(telPattern)) {
          check = false;
        } else {check=true;}
        break;
      case 'name': {
        if (!value.match(namePattern)) {
          check = false;
        } else { check = true }
      }
        break;
      case 'comment':
        if (!value.match(namePattern)) {
          check = false;
        } else {check:true }
        break;
    }
    if (check) {
      this.classList.remove('invalid');
      this.classList.add('valid');
    }
    else {
      this.classList.remove('valid');
      this.classList.add('invalid');
    }
  })


$()

//focus
let btnContactUs = $('.contact-us')
btnContactUs.on('click', function () {
  window.location.hash = "#contact-us";
})

let btnSchedule = $('#online__btn')
let onlineStr = $('.online__text h3')
btnSchedule.click(function () {
  onlineStr.focus();
  // var scroolToId = $(this).data('scroll');
  // var scrollToElement = document.getElementById("online_stretching")
  // window.location.hash = "#online_stretching";

});
