$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================

	$('.category_item').click(function(){
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.news-item').css('transform', 'scale(0)');
		function hideProduct(){
			$('.news-item').hide();
		} setTimeout(hideProduct,400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct(){
			$('.news-item[category="'+catProduct+'"]').show();
			$('.news-item[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.news-item').show();
			$('.news-item').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
	});



	//============================================
	// MOSTRAR PHOTO SELECCIONADA 


		var $lightbox = $('#lightbox');
		var titleModal = document.getElementById("h5Modal");

		function enviarAlt(alt){
			var titleh5 = document.createElement("h5"); 
			titleh5.setAttribute("class","mt-2 text-left pl-1");
			titleh5.innerHTML = alt;
			titleModal.appendChild(titleh5);
		}
		
		$('[data-target="#lightbox"]').on('click', function(event) {
			var $img = $(this).find('img'), 
				src = $img.attr('src'),
				alt = $img.attr('alt');
		
			$lightbox.find('.close').addClass('hidden');
			$lightbox.find('img').attr('src', src);
			$lightbox.find('img').attr('alt', alt);	

			enviarAlt(alt);

		});

		$lightbox.on('hidden.bs.modal', function(e){
			$('#h5Modal h5').remove();
		});

		$lightbox.on('shown.bs.modal', function (e) {
			var $img = $lightbox.find('img');
			$lightbox.find('.close').removeClass('hidden');
		});

});

//===================== VALIDAR FORM

function validar(){
	var nombre, apellidos, telefono, correo, verificacion;
	nombre = document.getElementById('firstname').value;
	apellidos = document.getElementById('lastname').value;
	telefono = document.getElementById('phone').value;
	correo = document.getElementById('email').value;
 
	verificacion = /\w+@\w+\.+[a-z]/;

	msj1 = 'The fields cannot be empty!';
	msj2 = 'The Name is too long  1';
	msj3 = 'The Lastname is too long';
	msj4 = 'The telephone is too long';
	msj5 = 'The phone number entered is not a number';
	msj6 = 'The mail is very long';
	msj7 = 'The email is not valid';
	msj8 = 'Message sent successfully!';

	/* Danger Alert */
	function addDivAlert(msjAlert){
		var msjDiv = document.getElementById("msj");
		var miMsj = document.createElement("div"); 
		miMsj.setAttribute("class","col-12 mb-0 alert alert-warning alert-dismissible fade show msj-danger");
		miMsj.setAttribute("role","alert");
		miMsj.innerHTML = '<i class="fas fa-exclamation-circle pr-2"></i> ' + msjAlert + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		msjDiv.appendChild(miMsj);	

		/*Tiempo en que se muestra y se remueve el alert */
		setTimeout(function() {
			$(".msj-danger").fadeOut(1500);
			miMsj.remove();
		},3000);
	}

	/*Success Alert*/
	function addDivSuccess(msjAlert){
		var msjDiv = document.getElementById("msj");
		var miMsj = document.createElement("div"); 
		miMsj.setAttribute("class","col-12 mb-0 alert alert-warning alert-dismissible fade show msj-success");
		miMsj.setAttribute("role","alert");
		miMsj.innerHTML = '<i class="fas fa-exclamation-circle pr-2"></i> ' + msjAlert + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		msjDiv.appendChild(miMsj);	

		/*Aqui la idea es borrar lo que se coloco en los campos, falta textarea y checkbox porque no se manejan igual */
		document.getElementById('firstname').value = "";
		document.getElementById('lastname').value = "";
		document.getElementById('phone').value = "";
		document.getElementById('email').value = "";

		/*Tiempo en que se muestra y se remueve el alert */
		setTimeout(function() {
			$(".msj-danger").fadeOut(1500);
			miMsj.remove();
		},3000);
	}

	if(nombre === "" || apellidos === "" || telefono === "" || correo === "" ){
		addDivAlert(msj1);
		return false;
	}else if (nombre.length>40){
		addDivAlert(msj2);
		return false;
	}else if (apellidos.length>45){
		addDivAlert(msj3);
		return false;
	}else if (telefono.length>11){
		addDivAlert(msj4);
		return false;
	}else if(isNaN(telefono)){
		addDivAlert(msj5);
		return false;
	}else if (correo.length>100){
		addDivAlert(msj6);
		return false;
	}else if (!verificacion.test(correo)){
		addDivAlert(msj7);
		return false;
	}else{
		addDivSuccess(msj8);
		return false;
	}
 }

 // ======================= smoothScroll

 smoothScroll.init({
	selector: '[data-scroll]', // Selector de enlaces (debe ser una clase, ID, atributo de datos o etiqueta de elemento)
	selectorHeader: null, // Selector para encabezados fijos (debe ser un selector de CSS válido) [opcional]
	speed: 2000, // Integer. Qué tan rápido completar el rollo en milisegundos
	easing: 'easeInOutCubic', // facilita el patrón para usar
	offset: 0, // Integer. Qué tan lejos compensar la ubicación de anclaje de desplazamiento en píxeles
	callback: function ( anchor, toggle ) {} // Función para ejecutar después del desplazamiento
});

//=================== API YOUTUBE ======== FALTA HACERLO PERSONALIZADO SEGUN CADA URL DE YOUTUBE
var data_x = [];
var urlse= "https://www.youtube.com/watch?v=aJOTlE1K90k";
var videoidse = urlse.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
if(videoidse != null) {
	$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=aJOTlE1K90k&key=AIzaSyBRQhUkF02YYkx1Qf9Hv1gDUTBaBPscWEc', function(data) {
		//console.log(data.items[0].statistics.viewCount);
		$('#arrayCount')[0].innerHTML = data.items[0].statistics.viewCount + " <span>visualizaciones</span>";
		$('#like')[0].innerHTML = data.items[0].statistics.likeCount;
		$('#nolike')[0].innerHTML = data.items[0].statistics.dislikeCount;
	})
}

 
 