//INITIALZE MASONRY
$(function(){
    $('#masonry_grid').masonry({
        itemSelector:'.masonryitem',
        columnWidth:225,
        stamp: ".stamp"        
   });
   
});

//TOUCH DEVICE SUPPORT FOR CSS FLIPS

 function is_touch_device() { 
  	return 'ontouchstart' in window // works on most browsers 
    || 'onmsgesturechange' in window; // works on ie10
 }; 



$(document).ready(function(){
	if (is_touch_device()){
		$('.flip-container').bind('touchstart',function(e){
			e.preventDefault();
			$(this).toggleClass("hover");
		});
	}
});

//NOTE GAME STARTS HERE

var correctCards = 0;

$(init);
  
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);

function setUpDrag() {
	$('#cardPile img').draggable({
	containment:'#card_game_container',
	cursor:'move',
	snap:'.card_holder',
	stack:'#cardPile div',
	revert:true
	});
	
	$('#cardSlots img').droppable({
		accept: '#cardPile img',
		drop: handleCardDrop
		
	});
}

function handleCardDrop(event, ui){
	
	var slotLetter = $(this).attr('data-title');
	var cardLetter = ui.draggable.attr('data-title');
	
	if (slotLetter == cardLetter) {
		ui.draggable.addClass('correct').draggable('disable');
		ui.draggable.position( { of: $(this), my: 'left top', at: 'left top'});
		ui.draggable.draggable('option','revert', false);
		$(this).droppable('disable').addClass('green_glow');
		correctCards++;
		}
		
	if (correctCards == 5) {
	$('#successMessage').show();
	$('#successMessage').animate( {
	  left: '380px',
	  top: '200px',
	  width: '400px',
	  height: '100px',
	  opacity: 1
	  });
	  
	  }
   }

function init(){
	$('#cardPile').empty();
	$('#cardSlots').empty();
	$('#defaultCardPile img').clone().appendTo('#cardPile');
	$('#defaultCardSlots img').clone().appendTo('#cardSlots');
	$('#cardPile img').shuffle();
	setUpDrag();
	correctCards = 0;
	//hide success message initially
    $('#successMessage').hide();
    $('#successMessage').css({
        left: '580px',
        top:'250px',
        width:0,
        height:0
    });
    
} //end of entire init function

//form JS
$(document).ready(function(){
    $("#submit").click(function(){
        $("#form-container").slideUp(900, "linear");
		$("#message-box").css("display", "block").delay(2500).fadeOut(1500, "swing");
    });
});//end of form JS


$(document).on('submit','#contact_form',function(e) { 
   var form = $('#contact_form');
   var data = form.serialize();
   $.post('/contactform', data, function(response) {
	  // Use jQuery animations or what-have-you to hide the form and show the thank-you message
   });
   return false;
});