//Empezamos...Con el div arrastrable

function onDragStart(ev){
	var id = ev.target.id;
	var imagen = $("#"+id+" "+"img").attr("src");
	console.log(imagen);
	ev.dataTransfer.setData("ID", id);
	ev.dataTransfer.setData("IMG",imagen);
}

/*Contenedor que lo recibe*/

function allowDrop(ev){
	ev.preventDefault();
}
function drop(ev){
	$(".reproductor").empty();
	ev.preventDefault();
	var id = ev.dataTransfer.getData("ID");
	var imagen = ev.dataTransfer.getData("IMG");
	$(".reproductor").css('background-image', 'url(' + imagen + ')');
	SC.initialize({
		client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
		//Inicializamos el sonundcloud
	});
	SC.stream('/tracks/'+id).then(function(player){
		player.play();
	}).catch(function(err){
		console.error(err);
	});
}

/*Declaracion de variables*/
var listaBusqueda = [];
/*Boton de busqueda presionado*/
function search(){
	$(".list").empty();
	//console.log("Entra en Search");
	//Vamos a capturar el autor.
	var busqueda = $('#campoBusqueda').val();
	SC.initialize({
		client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
		//Inicializamos el sonundcloud
	});
	//console.log(busqueda);
	
	SC.get('/tracks',{q:busqueda}).then(function(tracks){
		//Tracks corresponde a el array de canciones que buscamos
		var number = 0;
		
		if(tracks.length > 12){
			number = 12;
		}else{
			number = tracks.length;
		}
		for(var i = 0; i<=number;i++){
			//console.log(tracks[i])
			if(tracks[i].artwork_url!==null){
				//console.log(tracks[i].artwork_url);
				constructor(tracks[i]);
			}
		}
	})
	
	//canciones(play);
	
}

function constructor(songsLista){
	$('.list').append("<div id='"+songsLista.id+"' class='item col-md-12' style='background: grey;border: 1px solid #000;height: 15vh;margin: 4px' ondragStart='onDragStart(event)' draggable='true' ><div class='row'><div class='col-md-3'><img class='img-thumbnail' src='"+songsLista.artwork_url+"'></div><div class='col-md-8'><h2 class='itemTitulo'>"+songsLista.title+"</h2></div></div></div>");
}