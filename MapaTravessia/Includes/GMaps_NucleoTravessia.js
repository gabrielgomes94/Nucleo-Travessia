/*
* Author: Matheus Siqueira Barros
* E-mail: matheus.eco.2010@gmail.com
*/

//Loading JQuery
$(document).ready(function(){
	
	var MG_Bounds;
	var Cities;

	var map;
	var infowindow;
	
	var CMD_marker;
	var AM_marker;
	var DJ_marker;
	var AngloAmerican_marker;

});

var fusionTable_ID = '1WMlA-1ik05epxVKu0l5Pgyi5WtmCg1W3-akwE4Ps';
var Line_Distance;
var Area_Distance;


//####################################### INITIALIZING MAP ######################################################
function initMap() { 		//http://devfestmtm.appspot.com/#1
	
	
	var mapProp = {
		zoom: 10,
		center: {lat: -18.92990560776172 , lng: -43.4406814550781},
		
		mapTypeControl: true,
		mapTypeControlOptions: 
		{
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.LEFT_TOP,
			mapTypeIds: 
			[
			google.maps.MapTypeId.TERRAIN, 
			google.maps.MapTypeId.SATELLITE, 
			google.maps.MapTypeId.HYBRID,
			google.maps.MapTypeId.ROADMAP, 
			]
		},

		mapTypeId: google.maps.MapTypeId.ROADMAP,
		
		
		zoomControl: true,		//http://stackoverflow.com/questions/2437683/google-maps-api-v3-can-i-setzoom-after-fitbounds
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER,
			style: google.maps.ZoomControlStyle.SMALL
		},
		
		scaleControl: true,
		
		draggable: true,
		
		rotateControl: true,
		overviewMapControl: true,
		
		fullscreenControl: false,
		streetViewControl: false,
		scrollwheel: true,
	};
	map = new google.maps.Map(document.getElementById('map'), mapProp); 

	
	Line_Distance = new google.maps.Polyline({
		strokeColor: '#FF8C00',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		editable: true,
		//geodesic: true,
		zIndex:10 //over other layers
	});
	
	
	Area_Distance = new google.maps.Polygon({
		strokeColor: '#FF8C00',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		editable: true,
		//geodesic: true,
		zIndex:10 //over other layers
	});
	
	google.maps.event.addListener(map, 'click', function(e) {
		
		if (document.getElementById('Calc_Dist_DIV').value == 1){
			addLatLng(e);
		}
		
	});	
	
	//Polygon Listeners
	google.maps.event.addListener(Area_Distance, 'click', function(e) {
		
		if (document.getElementById('Calc_Dist_DIV').value == 1){
			addLatLng(e);
		}
		
	});	
	google.maps.event.addListener(Area_Distance.getPath(), 'insert_at', function(e) {
		console.log( "insert:" + Area_Distance.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	});
    google.maps.event.addListener(Area_Distance.getPath(), 'set_at', function(e) {
		console.log( "set:" + Area_Distance.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	
    });
	
	//Polyline Listeners
	google.maps.event.addListener(Line_Distance.getPath(), 'insert_at', function(e) {
		console.log( "insert:" + Line_Distance.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	});
    google.maps.event.addListener(Line_Distance.getPath(), 'set_at', function(e) {
		console.log( "set:" + Line_Distance.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	
    });
	
	
	
	google.maps.event.addListener(map, 'rightclick', function() {
		
		Clear_CalcDist_Path();
		
	});	
	
	/*//Double click event for Line Distance
	google.maps.event.addListener(Line_Distance, 'dblclick', function() {
		Clear_CalcDist_Path();
	});	
    */
	
	/*
	//Custom Map Style
	// Create new style for the map
    //var Map_CustomStyle_Ter = GetMapStyle_Terrain();
	
	var Map_CustomStyle_Ter = [
		  {
			stylers: [
			  { hue: "#00ffe6" },
			  { saturation: -80 }
			]
		  },{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			  { lightness: 100 },
			  { visibility: "simplified" }
			]
		  },{
			featureType: "road",
			elementType: "labels",
			stylers: [
			  { visibility: "off" }
			]
		  }
		];

	//set Custom map
	map.setOptions({styles: Map_CustomStyle_Ter}); 
	*/
	
	//Instantiate the InfoWindow
	infowindow = new google.maps.InfoWindow({
		maxWidth: 350,
		pixelOffset: new google.maps.Size(0,5),
		zIndex: 5
	});

	
	//ADD LISTENERS
	google.maps.event.addListener(map, "click", function() { infowindow.close();});

	// START INFOWINDOW CUSTOMIZATION
	// the creation of the infowindow HTML structure 'domready'and before opening the infowindow, defined styles are applied.
	google.maps.event.addListener(infowindow, 'domready', function() {

		// Reference to the DIV that wraps the bottom of infowindow
		var iwOuter = $('.gm-style-iw');

		/* Since this div is in a position prior to .gm-div style-iw.
		* We use jQuery and create a iwBackground variable,
		* and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		*/
		var iwBackground = iwOuter.prev();

		// Removes background shadow DIV
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		// Removes white background DIV
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});

		// Moves the infowindow 115px to the right.
		iwOuter.parent().parent().css({left: '115px'});

		// Moves the shadow of the arrow 76px to the left margin.
		iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

		// Moves the arrow 76px to the left margin.
		iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

		// Changes the desired tail shadow color.
		iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(212, 131, 106, 0.6) 0px 1px 6px', 'z-index' : '1'});

		// Reference to the div that groups the close button elements.
		var iwCloseBtn = iwOuter.next();

		// Apply the desired effect to the close button
		iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #D4836A', 'border-radius': '13px', 'box-shadow': '0 0 5px #D4836A'});

		// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		if($('.iw-content').height() < 140){
		$('.iw-bottom-gradient').css({display: 'none'});
		}

		// The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		iwCloseBtn.mouseover(function(){
			$(this).css({opacity: '0.9'});
			$(this).css({zoom: '102%' });
		
		});
		iwCloseBtn.mouseout(function(){
			$(this).css({opacity: '1'});
			$(this).css({zoom: '100%' });
		});
	});

	//geocode option
	var geocoder = new google.maps.Geocoder();
	document.getElementById('submit-geocode').addEventListener('click', function() {
		geocodeAddress(geocoder, map, infowindow);
	});
	
	//buttons control
	//https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
	var homeControlDiv = document.createElement('div');
	var homeControl = new CentralizarControl(homeControlDiv, map, mapProp.center, mapProp.zoom);
	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(homeControlDiv);

	var FiltroControlDiv = document.createElement('div');
	var filterControl = new FiltroControl(FiltroControlDiv, map);
	FiltroControlDiv.index = 2;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(FiltroControlDiv);

	var LocationControlDiv = document.createElement('div');
	var localizeControl = new LocalizarControl(LocationControlDiv, map);
	LocationControlDiv.index = 3;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LocationControlDiv);
	
	var LegendaControlDiv = document.createElement('div');
	var legendControl = new LegendaControl(LegendaControlDiv, map);
	LegendaControlDiv.index = 4;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LegendaControlDiv);
	
	
	var FerramentaControlDiv = document.createElement('div');
	var legendControl = new FerramentasControl(FerramentaControlDiv, map);
	FerramentaControlDiv.index = 5;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(FerramentaControlDiv);
	
	var AjudaControlDiv = document.createElement('div');
	var helpControl = new AjudaControl(AjudaControlDiv, map);
	AjudaControlDiv.index = 6;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(AjudaControlDiv);
	
	var NorteControlDiv = document.createElement('div');
	var NorteArrowControl = new NorteControl(NorteControlDiv, map);
	NorteControlDiv.index = 8;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(NorteControlDiv);
	
	var latlonControlDiv = document.createElement('div');
	var latlonControl = new LatlonControl(latlonControlDiv, map);
	latlonControlDiv.index = 7;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(latlonControlDiv);

	var logoControlDiv = document.createElement('div');
	var logoControl = new LogoControl(logoControlDiv, map);
	logoControlDiv.index = 6;
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(logoControlDiv);

	//************* Loading Files  -  Setting URL 
	
	//load Geojson
	var Cities = new google.maps.Data();
	// The GeoJSON has to be a line feature.
	//If polygon it will change the mouse cursor, suggesting the user to click (even with the fillopacity set to 0)
	Cities.loadGeoJson('https://dl.dropboxusercontent.com/u/39041929/site/MapaTravessia/Files_LoadMap/Limites_Muni.geojson');
	Cities.setStyle({
			fillColor: 'black',
			fillOpacity: 0,
			strokeColor: '#058E8E',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			zIndex: 0, // If greater than 0 it will appear on top of the polygon layer
	});
	Cities.setMap(map);
	
	google.maps.event.addListener(Cities, 'click', function(e) {
		if (document.getElementById('Calc_Dist_DIV').value == 1){
			addLatLng(e);
		}else{
			var content = '<div id="iw-container">' + 
			'<div class="iw-title" style="background-color: #0C7E00;">'+e["feature"]["H"]["NM_MUNICIP"]+'</div>' +
			'<div class="iw-content">' + 
				'<div class="iw-subTitle"></div>' +		
					'<p style="text-align:center;"> Borda do Município</p>' + 
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';
		  
			infowindow.setContent(content);
			infowindow.setPosition(e.latLng);
			infowindow.open(map);
		}
	});
	google.maps.event.addListener(Cities, 'mouseover', function(e) {
		$(this).css( 'cursor', 'move' );
	});
	

	//###################################
	///************* Loading Fusion Table
	
	var tableId = '1WMlA-1ik05epxVKu0l5Pgyi5WtmCg1W3-akwE4Ps';
	var locationColumn = 'geometry';

	//Initialize the Fusion Table
	var script = document.createElement('script');
	var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	url.push('sql=');
	var query = 'SELECT * FROM ' + tableId;
	var encodedQuery = encodeURIComponent(query);
	url.push(encodedQuery);
	url.push('&callback=drawMap');  //Calls the drawMap function
	url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
	script.src = url.join('');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
	
	var Regioes_AOI_FusionTable = new google.maps.FusionTablesLayer({
		query: {
			select: locationColumn,
			from: tableId
		},
		
		styles: 
		[
			{
				where: "Sigla_Muni = 'AM'",
				polygonOptions: 
				{
					fillColor: '#A5C603', //RGB Doesn't work here. Value in RGB --> 'rgb(165,198,3)'
					strokeColor: '#FFFFFF',
				}
			}, 
			{
				where: "Sigla_Muni = 'CMD'",
				polygonOptions: 
				{
					fillColor: '#CD9503', //RGB Doesn't work here. Value in RGB -->  'rgb(205,149,3)',
					strokeColor: '#FFFFFF',
				}
			}, 
			{
				where: "Sigla_Muni = 'DJ'",
				polygonOptions: 
				{
					fillColor: '#CD1E03', //RGB Doesn't work here. Value in RGB --> 'rgb(205,30,3)',
					strokeColor: '#FFFFFF',
				}
			}, 
		],
		suppressInfoWindows: true,
		//map: map,
			
	});
	
	
	google.maps.event.addDomListener(document.getElementById('ButtonFiltro'), 'click', function() {
		UpdateFusionTable(Regioes_AOI_FusionTable , tableId, locationColumn);
		map.setZoom(10);
		map.setCenter({lat: -18.92990560776172 , lng: (-43.4406814550781 -0.24)});
		
	});
	


	//################### Loading City Markers
	var pinIconRed = {
		url: 'Icons_Images/red.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(21, 34),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		//anchor: new google.maps.Point(0, 20)
	  
	};
	var pinIconGreen = {
		url: 'Icons_Images/green.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(21, 34),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		//anchor: new google.maps.Point(0, 20)
	  
	};

	var IconShape = {
          coords: [0,0,  0,21,  20,21,  34,14,  34,6,  20,0  ],
          type: 'poly'
    };
	//************ Creating Marker of Downtown
	//Conceição do Mato Dentro
	CMD_marker = new google.maps.Marker({
		position: new google.maps.LatLng(-19.036999948,-43.4250011549999),
		map: map,
		icon: pinIconGreen,
		shape: IconShape,
		zIndex: 5,
		title:"Conceição do Mato Dentro"
	});
	AM_marker = new google.maps.Marker({
		position: new google.maps.LatLng(-18.73226,-43.36548),
		map: map,
		icon: pinIconGreen,
		shape: IconShape,
		zIndex: 5,
		title:"Alvorada de Minas"
	});
	

	//Dom Joaquim
	DJ_marker = new google.maps.Marker({
		position: new google.maps.LatLng(-18.966999945,-43.2560013),
		map: map,
		zIndex: 7,
		icon: pinIconGreen,
		shape: IconShape,
		title:"Dom Joaquim"
	});
	
	//Anglo American
	AngloAmerican_marker = new google.maps.Marker({
		position: new google.maps.LatLng(-18.890171, -43.430890),
		map: map,
		zIndex: 5,
		icon: pinIconRed,
		shape: IconShape,
		title:"Mina da Anglo American"
	});
	
	//*********** Creating event listener
	//## Downtown ##
	//Conceição do Mato Dentro
	google.maps.event.addListener(CMD_marker, 'click', function() {
		if (document.getElementById('Calc_Dist_DIV').value != 1){

			var content = '<div id="iw-container">' + 
			'<div class="iw-title" style="background-color: #0C7E00;">Conceição do Mato Dentro</div>' +
			'<div class="iw-content">' + 
				'<a href="http://cmd.mg.gov.br/" target="_blank"><img src="Icons_Images/CMD.jpg" alt="Conceição do Mato Dentro" width="100"></a>' + 
				'<div class="iw-subTitle">Dados</div>' +		
				'<p><b>População Total*: </b>17.908<br>'+
					'<b>População Urbana*: </b>12.269<br>'+
					'<b>População Rural*: </b>5.639<br>'+
				'</p>  '+
				'<p style="font-size: 8px">*IBGE 2010</p>' +
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';
		  
			infowindow.setContent(content);
			infowindow.open(map,CMD_marker);
		}
	});
	
	/*
	google.maps.event.addListener(AngloAmerican_marker, 'mousemove', function() {

		document.getElementById("RegionHoverComment").textContent= "Deu certo";
			
		$('#RegionHover').css({'top':mouseY-55,'left':mouseX}).fadeIn(5);
			
	});
	google.maps.event.addListener(AngloAmerican_marker, 'mouseout', function() {
			
		$('#RegionHover').fadeOut(5);
			
	});
	*/
	
	google.maps.event.addListener(AM_marker, 'click', function() {
		if (document.getElementById('Calc_Dist_DIV').value != 1){

			var content = '<div id="iw-container">' + 
			'<div class="iw-title" style="background-color: #0C7E00;">Alvorada de Minas</div>' +
			'<div class="iw-content">' + 
				'<a href="http://www.alvoradademinas.mg.gov.br/" target="_blank"><img src="Icons_Images/AM.jpg" alt="Alvorada de Minas" width="100"></a>' + 
				'<div class="iw-subTitle">Dados</div>' +		
				'<p><b>População Total*: </b>3.546<br>'+
					'<b>População Urbana*: </b>1.450<br>'+
					'<b>População Rural*: </b>2.096<br>'+
				'</p>  '+
				'<p style="font-size: 8px">*IBGE 2010</p>' +
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';
		  
			infowindow.setContent(content);
			infowindow.open(map,AM_marker);
		}
	});

	
	//Dom Joaquim
	google.maps.event.addListener(DJ_marker, 'click', function() {
		if (document.getElementById('Calc_Dist_DIV').value != 1){

			var content = '<div id="iw-container">' +
			'<div class="iw-title" style="background-color: #0C7E00;">Dom Joaquim</div>' +
			'<div class="iw-content">' +
				'<a href="http://www.domjoaquim.mg.gov.br/site/" target="_blank"><img src="Icons_Images/DJ.jpg" alt="Dom Joaquim" width="100"></a>' +
				'<div class="iw-subTitle">Dados</div>' +
				'<p><b>População Total*: </b>4.535<br>'+
					'<b>População Urbana*: </b>2.922<br>'+
					'<b>População Rural*: </b>1.613<br>'+
				'</p>  '+
				'<p style="font-size: 8px">*IBGE 2010</div>' +
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';
		  
			infowindow.setContent(content);
			infowindow.open(map,DJ_marker);
		}
	});
	
	
	//Mina da Anglo American
	google.maps.event.addListener(AngloAmerican_marker, 'click', function() {
		if (document.getElementById('Calc_Dist_DIV').value != 1){
			var content = '<div id="iw-container">' +
			'<div class="iw-title" style="background-color: #BD001A;">Mina - Anglo American</div>' +
			'<div class="iw-content">' +
				'<a href="http://brasil.angloamerican.com/" target="_blank"><img src="Icons_Images/Anglo.png" alt="Anglo" width="100"></a>' +
				'<div class="iw-subTitle">Dados</div>' +
				'<p>Mina de extração de minério de ferro. Projeto Minas-Rio<br>'+
				'</p>  '+
				'<br>'+
				'<br>'+
				'<br>'+
				'<br>'+
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';
		  
			infowindow.setContent(content);
			infowindow.open(map,AngloAmerican_marker);
		}
	});	
	
	//## Map ##
	// Display Lat and Long while the mouse is moving above the map
	google.maps.event.addDomListener(map, 'mousemove', function(event) {
		lat = event.latLng.lat().toString();
		lon = event.latLng.lng().toString();
		lat = lat.substr(0, lat.indexOf(".")+6);
		lon = lon.substr(0, lon.indexOf(".")+6);
		controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;
	});
	
	//## Cities Layer ##
	// Display Lat and Long while the mouse is moving above the City Layer
	google.maps.event.addDomListener(Cities, 'mousemove', function(event) {
		lat = event.latLng.lat().toString();
		lon = event.latLng.lng().toString();
		lat = lat.substr(0, lat.indexOf(".")+6);
		lon = lon.substr(0, lon.indexOf(".")+6);
		controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;
	});

}// End Map



//Draw and counts the polygons
function UpdateFusionTable(Regioes_AOI_FusionTable , tableId, locationColumn) {
	var queryGenerated = CreateQueryToFusionTable();
	if (queryGenerated) {
		Regioes_AOI_FusionTable.setOptions({
		query: {
				select: locationColumn, 
				from: tableId,
				where: queryGenerated
			}
		});
		
		// Initialize JSONP request
		var script = document.createElement('script');
		var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
		url.push('sql=');
		var query = 'SELECT COUNT() FROM ' + tableId +" WHERE "+ queryGenerated;
		var encodedQuery = encodeURIComponent(query);
		url.push(encodedQuery);
		url.push('&callback=NumberOfRows'); //Calls the NumberOfRows() function
		url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
		script.src = url.join('');
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(script);
		
		// Initialize JSONP request
		var script = document.createElement('script');
		var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
		url.push('sql=');
		var query = 'SELECT * FROM ' + tableId +" WHERE "+ queryGenerated;
		var encodedQuery = encodeURIComponent(query);
		url.push(encodedQuery);
		url.push('&callback=drawMap');  //Calls the drawMap function
		url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
		script.src = url.join('');
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(script);
			
	
	} else {
		Regioes_AOI_FusionTable.setOptions({
		query: {
			select: locationColumn, 
			from: tableId
			}
		});
		
		// Initialize JSONP request
		var script = document.createElement('script');
		var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
		url.push('sql=');
		var query = 'SELECT COUNT() FROM ' + tableId;
		var encodedQuery = encodeURIComponent(query);
		url.push(encodedQuery);
		url.push('&callback=NumberOfRows');  //Calls the drawMap function
		url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
		script.src = url.join('');
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(script);
		
		// Initialize JSONP request
		var script = document.createElement('script');
		var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
		url.push('sql=');
		var query = 'SELECT * FROM ' + tableId;
		var encodedQuery = encodeURIComponent(query);
		url.push(encodedQuery);
		url.push('&callback=drawMap');  //Calls the drawMap function
		url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
		script.src = url.join('');
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(script);
	}
	
	
}

var gpolygons = [];
//Draws each polygon returned by the query
function drawMap(data) {
	for (var i=0; i<gpolygons.length; i++) {
		gpolygons[i].setMap(null);
	}
	var rows = data['rows'];
	var colors = ['#CD9503', '#A5C603', '#CD1E03']; 
	var ColorReceived;	
	for (var i in rows) {
		var newCoordinates = [];
		newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
		
		
		if (rows[i][3] == 'CMD') ColorReceived = 0;
		if (rows[i][3] == 'AM') ColorReceived = 1;
		if (rows[i][3] == 'DJ') ColorReceived = 2;

		Regions = new google.maps.Polygon({
			paths: newCoordinates,
			strokeColor: '#FFFFFF',
			strokeOpacity: 1,
			strokeWeight: 1,
			fillColor: colors[ColorReceived],
			fillOpacity: 0.6,
			zIndex:1,
			
			//retrieve all the Fusion Table information for each row
			row: (function(index){
						var row={};
							for(var j=0;j<data['rows'][index].length;++j){
							row[data.columns[j]]=data['rows'][index][j];
						}
						return row;
					})(i)
		});

		//Working mouseover event
		google.maps.event.addListener(Regions, 'mousemove', function(event) {
			
			this.setOptions({strokeWeight: 3});
			
			FT_Click_Info = Click_Info(this.row['Cod_Comu']);
			document.getElementById("RegionHoverComment").textContent= FT_Click_Info[0];
			
			$('#RegionHover').css({'top':mouseY-55,'left':mouseX}).fadeIn(5);

			lat = event.latLng.lat().toString();
			lon = event.latLng.lng().toString();
			lat = lat.substr(0, lat.indexOf(".")+6);
			lon = lon.substr(0, lon.indexOf(".")+6);
			controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;

		});	
		
		google.maps.event.addListener(Regions, 'rightclick', function() {
		
			Clear_CalcDist_Path();
			
		});	
	
		//Working Mouseout event
		google.maps.event.addListener(Regions, 'mouseout', function() {
			this.setOptions({strokeWeight: 1});
			
			//document.getElementById("RegionHoverComment").textContent= "";
			
			$('#RegionHover').fadeOut(5);
			
		});

		// Working click event
		google.maps.event.addListener(Regions, 'click', function (e) {
			if (document.getElementById('Calc_Dist_DIV').value == 1){
				addLatLng(e);
			}else{
				var Cod_Muni = this.row['Cod_Comu'];
				windowControl(e, infowindow, map, Cod_Muni);
			}
		});
		
		Regions.setMap(map);
		gpolygons.push(Regions);
	}

}

//Access the lat and long for each node and return a array containing those values, extracted from fusion table.
function constructNewCoordinates(polygon) {
	var newCoordinates = [];
	var coordinates = polygon['coordinates'][0];
	for (var i in coordinates) {
	  newCoordinates.push(
		// write the lat and long respectively
		  new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
	}
	return newCoordinates;
}

//This Returns the number of rows returned from a query search of the FUSION TABLE
function NumberOfRows(data){
	//debug
	//console.log( data );
	var Count_SelectedFilter = "";
	
	
	if(typeof data['rows']  !== 'undefined') { // typeof returns the type of the variable for example: typeof 37 === 'number';. If the variable does exist it will be "undefined"
		Count_SelectedFilter = data['rows'][0];
	}

	if (Count_SelectedFilter){
		if (Count_SelectedFilter == 1 ){
		$('#FiltroComment').text(Count_SelectedFilter + ' região foi selecionada. Total: 19');			
		}else{
			$('#FiltroComment').text(Count_SelectedFilter + ' regiões foram selecionadas. Total: 19');	
		}	
	}else{ // number of rows == 0
		$('#FiltroComment').text('Nenhuma região foi selecionada. Total: 19');	
	}
}

//Creates the Trace for the Distance Calculator
function addLatLng(event) { //https://developers.google.com/maps/documentation/javascript/geometry  ->>> CTRL + F ->>> ".getPath()"
	
	ToolChecked = document.getElementById('Calculadora_Radio').value;

	if(document.getElementById('RadioDist').checked) { //For polyline
		pathLine = Line_Distance.getPath();
		pathLine.push(event.latLng);
		
		ValueUnit = google.maps.geometry.spherical.computeLength(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

	}else if(document.getElementById('RadioArea').checked) { //For polygon
		pathLine = Area_Distance.getPath();
		pathLine.push(event.latLng);
		
		ValueUnit = google.maps.geometry.spherical.computeArea(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;
		

	}

}

//Updates the Path of the polygon/Polyline when the user changes its bounds
function UpdatePath(event) { 

	ToolChecked = document.getElementById('Calculadora_Radio').value;

	if(document.getElementById('RadioDist').checked) { //For polyline
		pathLine = Line_Distance.getPath();
		
		ValueUnit = google.maps.geometry.spherical.computeLength(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

	}else if(document.getElementById('RadioArea').checked) { //For polygon
		pathLine = Area_Distance.getPath();
		
		ValueUnit = google.maps.geometry.spherical.computeArea(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;
		
	}
	
}

//Open the info Window for the Fusion table click
function windowControl(e, infowindow, map, Cod_Comu) {

	var FT_Click_Info = Click_Info(Cod_Comu);
	
	var URL_Link = "http://nucleotravessia.unifei.edu.br/comunidades/"+Cod_Comu;

	var content = '<div id="iw-container">' +
	'<div class="iw-title">'+FT_Click_Info[0]+'</div>' +
	'<div class="iw-content">' + 
		'<table id="InfoBoxTable" border=1 frame=void rules=rows>' +
			'<caption>Informações sobre essa região:</caption>'+
			'<tr>' +
				'<td class="InfoBoxTitle">' +
					'Lavouras Anuais e Permanentes:' +
				'</td>' +
				'<td class="InfoBoxTxt"> ' +
					FT_Click_Info[1] +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td class="InfoBoxTitle">' +
					'Hortaliças:' +
				'</td>' +
				'<td class="InfoBoxTxt"> ' +
					FT_Click_Info[2] +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td class="InfoBoxTitle">' +
					'Pomar:' +
				'</td>' +
				'<td class="InfoBoxTxt"> ' +
					FT_Click_Info[3] +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td class="InfoBoxTitle">' +
					'Indústria Doméstica Rural:' +
				'</td>' +
				'<td class="InfoBoxTxt"> ' +
					FT_Click_Info[4] +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td class="InfoBoxTitle">' +
					'Produção Animal:' +
				'</td>' +
				'<td class="InfoBoxTxt"> ' +
					FT_Click_Info[5] +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td class="LastRow" colspan="2" >' +

					'<a href=\"'+URL_Link+'\" target="_blank">Clique aqui</a> para obter mais informações sobre essa comunidade.'+
				'</td>' +
			'</tr>' +
		'</table>' +

	'<div class="iw-bottom-gradient"></div>' +
	'</div>';
		
	infowindow.setOptions({
		content: content,
		position: e.latLng,
	});
	
	infowindow.open(map);
	
}

//Geocoder Panel
function geocodeAddress(geocoder, resultsMap, infowindow) {
	var address = "";
	if ($('#check_ComunidadesEstudo').prop('checked')){
		address = document.getElementById('ComunidadesSelect').value;
	}
	else{
		address = document.getElementById('address').value;
	}
	
	if (address == ""){
		alert("Escolha / Digite um local para procurar");
		return;
	}
	
	if ($('#check_ComunidadesEstudo').prop('checked')){ //if checkbox is checked do not use the geocoder, just get its value and text
		var DD_Text = document.getElementById("ComunidadesSelect").options[document.getElementById("ComunidadesSelect").selectedIndex].text;
		var DD_Coords = (document.getElementById('ComunidadesSelect').value).split(","); // DD_Coords[0] == Lat; DD_Coords[1] == Long; 

		
		var content = '<div id="iw-container">' +
				'<div class="iw-title" style="background-color: #027DAC;" >'+DD_Text+'</div>' +
				'<div class="iw-content" style="text-align:center;" >' +
					'<p class="pBigger" >'+
					'<b>Coordenadas Geográficas: </b><br>'+
					'Lat: '+DD_Coords[0]+'<br>'+
					'Long: '+DD_Coords[1]+
					'</p>  '+
				'</div>' +
				'<div class="iw-bottom-gradient"></div>' +
				'</div>';
				
		
			infowindow.setPosition( { lat: Number(DD_Coords[0]) , lng: Number(DD_Coords[1]) } );
			infowindow.setContent(content);
			resultsMap.setZoom(12);
			resultsMap.setCenter({ lat: (Number(DD_Coords[0]) + 0.04), lng: (Number(DD_Coords[1]) + 0.05) });
			infowindow.open(resultsMap);
		
	}
	else{ // if the check box is not checked, use the Google Maps Geocoder
		
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) { // If everything is alright
				//debug
				//console.log(results);
								
				var content = '<div id="iw-container">' +
					'<div class="iw-title" style="background-color: #027DAC;">'+results[0].address_components[0].long_name+'</div>' +
					'<div class="iw-content" style="text-align:center;" >' +
						'<div class="iw-subTitle">'+results[0].formatted_address+'</div>' +
						'<p class="pBigger">'+
						'<b>Coordenadas Geográficas: </b><br>'+
						'Lat: '+results[0].geometry.location.lat()+'<br>'+
						'Long: '+results[0].geometry.location.lng()+
						'</p>  '+
					'</div>' +
					'<div class="iw-bottom-gradient"></div>' +
					'</div>';
					
				infowindow.setPosition(results[0].geometry.location);
				infowindow.setContent(content);
				resultsMap.setZoom(12);
				
				resultsMap.setCenter( { lat: (results[0].geometry.location.lat() + 0.04), lng: results[0].geometry.location.lng() + 0.05} );
				infowindow.open(resultsMap);
				

			} else { //If something went wrong
				alert('Verifique o endereço digitado. Há algo inconsistente ou Localização ainda não foi mapeada.');
			}
			
		});
		
	}
	
}


