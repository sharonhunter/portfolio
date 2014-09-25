//Add single breakpoint stylesheet directly to head for IE workaround

$(document).ready(function(){

if (window.ActiveXObject || "ActiveXObject" in window){
   $('head').append('<link rel="stylesheet" type="text/css" href="/static/css/style.css"  />');
   $('head').append('<link rel="stylesheet" type="text/css" href="/static/css/style-wide.css"  />');
   $('head').append('<link rel="stylesheet" type="text/css" href="/static/css/style-narrow.css"  />');
  
  }

});
