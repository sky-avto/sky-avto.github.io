$(document).ready(function() { 

// <-------КАРТА
	ymaps.ready(init);
    var map, 
    	metka;

    function init(){     
        map = new ymaps.Map ("map", {
            center: [44.597658, 33.528305],
            zoom: 14,
        });

        metka = new ymaps.Placemark([44.604400, 33.506890], 
        	{ hintContent: 'Автошкола Скай авто', 
        	  iconContent: 'Sky Avto' }, 
        	  { preset: 'twirl#blueStretchyIcon' });   
        metka2 = new ymaps.Placemark([44.593279, 33.552887], 
        	{ hintContent: 'Автошкола Скай авто', 
        	  iconContent: 'Sky Avto' }, 
        	  { preset: 'twirl#blueStretchyIcon' });   
    
    map.behaviors.enable('scrollZoom');	
    map.geoObjects.add(metka);
    map.geoObjects.add(metka2);
    // Ползунок изменения масштаба
	map.controls.add('zoomControl', {
	    float: 'none',
	    position: { left: 10, top: 44 }
	});
	}
	
	var wow = new WOW();
	wow.init();

    $("a.fancyimage").fancybox({
        openEffect : 'elastic',
		openSpeed  : 150,

		closeEffect : 'elastic',
		closeSpeed  : 150,

		fixed : false,
	    autoCenter : true
    });

	$("#konsul").submit(function(event){
		event.preventDefault();
		submitForm();
	});
/*
    $('#callModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var recipient = button.data('whatever') // Extract info from data-* attributes
		  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		  var modal = $(this)
		  modal.find('.modal-title').text(recipient)
		 // modal.find('.modal-body input').val(recipient)
	});*/

	$("#phonemessage").inputmask({"mask": "+7 (999) 999-9999"});

	$("#zakaz").on("click", function(){
		var phone = $("#phonemessage").val();
		var regex = /\+7 \(\d{3}\) \d{3}\-\d{4}/;
		if (phone.search(regex) == -1){
			
			$('#phonemessage').addClass("form-error");
			return false;
		}
		$('#phonemessage').removeClass("form-error");
		return true;
	});
	$('#media').carousel({
	    pause: true,
	    interval: false,
  	});
});

jQuery(document).ready(function($) {
	
	$("#messageform").submit(function(){
		var form = $(this);
		var error = false;

		$("#namemessage").focus(function () {
			$('#namemessage').removeClass("form-error");
		});
		$("#phonemessage").focus(function () {
			$('#phonemessage').removeClass("form-error");
		});				

		form.find('input').each( function(){
			if ($('#namemessage').val() == '') {
				$('#namemessage').addClass("form-error");
				
				error = true;
			}

			if ($('#phonemessage').val() == '') {
				$('#phonemessage').addClass("form-error");
				
				error = true;
			}				
		});

		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: 'php/form.php',
			   dataType: 'json',
			   data: data,
		       beforeSend: function(data) {
		            form.find('button[type="submit"]').attr('disabled', 'disabled');
		          },
		       success: function(data){
		       		if (data['error']) {
		       			alert(data['error']);
		       		} else {
		       			 $('#namemessage, #phonemessage').val('');
		       			 $('#alert-message').show('fast').delay(3000).hide('fast', function() {		       			 	
		       			 	$.fancybox.close();
		       			 });
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		         },
		       complete: function(data) {
		            form.find('button[type="submit"]').prop('disabled', false);
		         }
		                  
			     });
		}
		return false;
	});
	
});
function PopUpHide(){
    $('[data-toggle="popover"]').popover('hide');
}

/** Fancybox **/

$(document).ready(function() {
	$(".fancybox").fancybox({
		padding: [10,10,10,10]
	});
});
var buttons7Click = Array.prototype.slice.call( document.querySelectorAll( '#btn-click button' ) ),
	buttons9Click = Array.prototype.slice.call( document.querySelectorAll( 'button.btn-8g' ) ),
	totalButtons7Click = buttons7Click.length,
	totalButtons9Click = buttons9Click.length;

	buttons7Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );
	buttons9Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );

	function activate() 
	{
		var self = this, activatedClass = 'btn-activated';

		if( classie.has( this, 'btn-7h' ) ) {
			// if it is the first of the two btn-7h then activatedClass = 'btn-error';
			// if it is the second then activatedClass = 'btn-success'
			activatedClass = buttons7Click.indexOf( this ) === totalButtons7Click-2 ? 'btn-error' : 'btn-success';
		}
		else if( classie.has( this, 'btn-8g' ) ) {
			// if it is the first of the two btn-8g then activatedClass = 'btn-success3d';
			// if it is the second then activatedClass = 'btn-error3d'
			activatedClass = buttons9Click.indexOf( this ) === totalButtons9Click-2 ? 'btn-success3d' : 'btn-error3d';
		}

		if( !classie.has( this, activatedClass ) ) {
			classie.add( this, activatedClass );
			setTimeout( function() { classie.remove( self, activatedClass ) }, 1000 );
		}
	}