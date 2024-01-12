
$(document).ready(function(){


$(window).on('load',function(){
  $('.preloader').addClass('complete')
});

$(window).on('scroll',function(){
  var scroll = $(window).scrollTop();
  console.log(scroll);
  if(scroll >=50){
    $(".sticky").addClass("stickyadd");
  }else{
    $(".sticky").removeClass("stickyadd");
  }
});

// progress bars

var waypoint = new Waypoint({
  element: document.getElementById('experience'),
  handler: function() {

    var p = document.querySelectorAll('.progress-bar');
    p[0].setAttribute("style", "width:100%;transition:1s all;");
    p[1].setAttribute("style", "width:95%;transition:1.5s all;");
    p[2].setAttribute("style", "width:85%;transition:1.7s all;");
    p[3].setAttribute("style", "width:80%;transition:2s all;");
   


  },
   offset: '90%'
});

var $child = $('.way-fade-up').children();
$child.each(function(){
  var self= $(this);
  $(this).waypoint(function(){
    self.addClass('animated fadeInUp');
  },{offset: '90%'});
});

var $child = $('.way-fade-left').children();
$child.each(function(){
  var self= $(this);
  $(this).waypoint(function(){
    self.addClass('animated fadeInLeft');
  },{offset: '90%'});
});

var $child = $('.way-fade-right').children();
$child.each(function(){
  var self= $(this);
  $(this).waypoint(function(){
    self.addClass('animated fadeInRight');
  },{offset: '90%'});
});

  var typed = new Typed(".element", {
  strings: ["Kunal Shinde", "a Frontend Developer"],
  smartBackspace: true,
   typeSpeed: 100,
   backSpeed: 100,
   loop: true,
  loopCount: Infinity,
  startDelay: 1000
});


$('a').smoothScroll({

  speed:2000,
});

});


function validateForm(event) {
  event.preventDefault(); 

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');
  var messageError = document.getElementById('messageError');

  
  nameError.innerHTML = '';
  emailError.innerHTML = '';
  messageError.innerHTML = '';

  var errors = []; 

  
  if (name === '') {
      errors.push('Please enter your name');
      displayError(nameError, 'Please enter your name');
  }

  
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
      errors.push('Please enter a valid email address');
      displayError(emailError, 'Please enter a valid email address');
  }

 
  if (message === '') {
      errors.push('Please enter your message');
      displayError(messageError, 'Please enter your message');
  }

  
  if (errors.length > 0) {
      return; 
  }

  
  console.log('Form submitted successfully!');
}

function displayError(errorElement, errorMessage) {
  var errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = errorMessage;
  errorElement.appendChild(errorDiv);
}


function fetchData(xmlPath, containerId, templateCallback) {
  $.ajax({
    type: "GET",
    url: xmlPath,
    dataType: "xml",
    success: function(xml) {
      parseData(xml, containerId, templateCallback);
    },
    error: function(xhr, status, error) {
      console.error("Error fetching XML:", error);
    }
  });
}

function parseData(xml, containerId, templateCallback) {
  var container = $("#" + containerId);

  $(xml).find('entry').each(function() {
    var data = {
      title: $(this).find('title').text(),
      description: $(this).find('description').text(),
    };

    var html = templateCallback(data);

    container.append(html);
  });
}

function projectTemplate(data) {
  return `<div class="col-md-4 mb-4 way-fade-left">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <p class="card-text" style="text-align:justify;font-size:15px">${data.description}</p>
    </div>
  </div>
</div>`;
}

fetchData('../project.xml', 'projects-list', projectTemplate);