/*
/*
* Author: Matheus Siqueira Barros
* E-mail: matheus.eco.2010@gmail.com
*/

//Loading JQuery
$(document).ready(function(){

	var map;
	var infowindow;
	var Cities;
	

});

var Line_Path;
var Area_Path;
var Circle_Path;
var Marker_Path;
var elevator;


var FusionElemLength = null;


//####################################### INITIALIZING MAP ######################################################
function initMap() { 		//http://devfestmtm.appspot.com/#1
	
	
	var mapProp = {
		zoom: 9,
		center: {lat: -22.3051 , lng: -45.3384},
		
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

	
	//load Geojson
	Cities = new google.maps.Data();
	// The GeoJSON has to be a line feature.
	//If polygon it will change the mouse cursor, suggesting the user to click (even with the fillopacity set to 0)
	Cities.loadGeoJson('https://dl.dropboxusercontent.com/u/39041929/site/Mapa_PMA/Files_LoadMap/Municipios_AOI_72.geojson');
	
	Cities.setStyle({
			fillColor: 'black',
			fillOpacity: 0,
			strokeColor: '#058E8E',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			zIndex: 0, // If greater than 0 it will appear on top of the polygon layer
	});
	
	Cities.setMap(map);
	
	
	//Elevatios Service
	elevator = new google.maps.ElevationService;
	
	var Path_Color = "#7C06B7";
	var Fill_Color = "#000000";
	
	Line_Path = new google.maps.Polyline({
		strokeColor: Path_Color,
		strokeOpacity: 1.0,
		strokeWeight: 3,
		editable: true,
		//geodesic: true,
		zIndex:10 //over other layers
	});
	
	Area_Path = new google.maps.Polygon({
		strokeColor: Path_Color,
		strokeOpacity: 1.0,
		strokeWeight: 3,
		fillColor: Fill_Color,
		editable: true,
		fillOpacity: 0.35,
		//geodesic: true,
		zIndex:10 //over other layers
	});
	
	Circle_Path = new google.maps.Circle({
		strokeColor: Path_Color,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: Fill_Color,
		fillOpacity: 0.35,
		zIndex:10, //over other layers
		editable: true,
		radius: 7000,
    });
	
	Marker_Path = new google.maps.Marker({
		zIndex:10, //over other layers
	});
	
	
	google.maps.event.addListener(map, 'zoom_changed', function(e) {
		if (HeatmapActivated == 1){
			
			var HeatMapRadius = DefineHeatMapRadius(); //Greater the zoom, greater the Radius
			
			heatmap.set('radius', HeatMapRadius );
			console.log(map.getZoom());
			console.log(HeatMapRadius);
		}
		
		
	});	
	
	
	google.maps.event.addListener(map, 'click', function(e) {
		
		if (document.getElementById('Calc_Dist_DIV').value == 1){
			addLatLng(e);
		}
		
	});	
	
	google.maps.event.addListener(Circle_Path, 'radius_changed', function(e) {
		radius = Circle_Path.getRadius();
		ValueUnit = Math.PI*radius*radius;
		UnitConversion = document.getElementById('UnitConversion').value;
		
		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

		document.getElementById("Radius").value= (radius/UnitConversion).toFixed(3);
		
	});	

	
	//Polygon Listeners
	google.maps.event.addListener(Area_Path, 'click', function(e) {
		
		if (document.getElementById('Calc_Dist_DIV').value == 1){
			addLatLng(e);
		}
		
	});

	google.maps.event.addListener(Area_Path.getPath(), 'insert_at', function(e) {
		console.log( "insert:" + Area_Path.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	});
 
	google.maps.event.addListener(Area_Path.getPath(), 'set_at', function(e) {
		console.log( "set:" + Area_Path.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	
    });
	
	//Polyline Listeners
	google.maps.event.addListener(Line_Path.getPath(), 'insert_at', function(e) {
		console.log( "insert:" + Line_Path.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	});
  
	google.maps.event.addListener(Line_Path.getPath(), 'set_at', function(e) {
		console.log( "set:" + Line_Path.getPath().getAt(e).toUrlValue(6) );
		UpdatePath(e);
	
    });
	
	google.maps.event.addListener(map, 'rightclick', function() {
		Clear_CalcDist_Path();
		$( "#elevation_chart" ).hide();
		$( "#CloseChart" ).hide();
	});	
	
	google.maps.event.addDomListener(Circle_Path, 'rightclick', function(event) {
		Clear_CalcDist_Path();
		$( "#elevation_chart" ).hide();
		$( "#CloseChart" ).hide();
	});
	
	google.maps.event.addDomListener(Area_Path, 'rightclick', function(event) {
		Clear_CalcDist_Path();
	});
	
	//Custom Map Style
	// Create new style for the map
    
	/*
	// White Type
	var Map_CustomStyle_Ter = [
		  {	stylers: [ { hue: "#00ffe6" },  { saturation: -80 }	]},
		  {featureType: "road",elementType: "geometry",stylers: [ { lightness: 100 }, { visibility: "simplified" }]},
		  {featureType: "road",elementType: "labels",	stylers: [  { visibility: "off" }	]  }
		];
	*/
	
	/*
	//https://citytrees.ca/map style
	var Map_CustomStyle_Ter = [
		{ stylers: [ { hue: "#ff0000" }] },
		{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},
		{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},
		{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},
		{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#c4e0ae"},{saturation:"0"},{visibility:"on"}]},
		{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},
		{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},
		{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},
		{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},
		{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}
		];
	*/
	
	//Created by me
	var Map_CustomStyle_Ter = GetMapStyle_Terrain();
	
	//set Custom map
	map.setOptions({styles: Map_CustomStyle_Ter}); 
	
	//Instantiate the InfoWindow
	infowindow = new google.maps.InfoWindow({
		maxWidth: 350,
		pixelOffset: new google.maps.Size(0,-20),
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
	var IndexButton = 1;
	//https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
	var homeControlDiv = document.createElement('div');
	var homeControl = new CentralizarControl(homeControlDiv, map, mapProp.center, mapProp.zoom);
	homeControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(homeControlDiv);
	IndexButton++;
	
	var FiltroControlDiv = document.createElement('div');
	var filterControl = new FiltroControl(FiltroControlDiv, map);
	FiltroControlDiv.index  = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(FiltroControlDiv);
	IndexButton++;
	
	var LocationControlDiv = document.createElement('div');
	var localizeControl = new LocalizarControl(LocationControlDiv, map);
	LocationControlDiv.index  = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LocationControlDiv);
	IndexButton++;
	
	var LegendaControlDiv = document.createElement('div');
	var legendControl = new LegendaControl(LegendaControlDiv, map);
	LegendaControlDiv.index  = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LegendaControlDiv);
	IndexButton++;
	
	var FerramentaControlDiv = document.createElement('div');
	var legendControl = new FerramentasControl(FerramentaControlDiv, map);
	FerramentaControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(FerramentaControlDiv);
	IndexButton++;
	
	var TrocarVisualizacaoControlDiv = document.createElement('div');
	var legendControl = new TrocarVisualizacaoControl(TrocarVisualizacaoControlDiv, map);
	TrocarVisualizacaoControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(TrocarVisualizacaoControlDiv);
	IndexButton++;
	
	var GraficoControlDiv = document.createElement('div');
	var graphControl = new GraficoControl(GraficoControlDiv, map);
	GraficoControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(GraficoControlDiv);
	IndexButton++;
	
	var FormularioControlDiv = document.createElement('div');
	var formControl = new FormularioControl(FormularioControlDiv, map);
	FormularioControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(FormularioControlDiv);
	IndexButton++;
	
	var AjudaControlDiv = document.createElement('div');
	var helpControl = new AjudaControl(AjudaControlDiv, map);
	AjudaControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(AjudaControlDiv);
	IndexButton++;
	
	var NorteControlDiv = document.createElement('div');
	var NorteArrowControl = new NorteControl(NorteControlDiv, map);
	NorteControlDiv.index = IndexButton;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(NorteControlDiv);
	IndexButton++;
	
	var latlonControlDiv = document.createElement('div');
	var latlonControl = new LatlonControl(latlonControlDiv, map);
	latlonControlDiv.index = 7;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(latlonControlDiv);

	var logoControlDiv = document.createElement('div');
	var logoControl = new LogoControl(logoControlDiv, map);
	logoControlDiv.index = 6;
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(logoControlDiv);


	//###################################
	///************* Loading Fusion Table
	//Old Version
	//var tableId = '12E2KRkbI9eVGeeb_9qZoCWb_EZAVRl-bAB2kMXRb';
	//MG
	//var tableId = '1RtqthP3pcySuGC19eITf34j7ooACxhtDNkHmb9M3';
	
	
	//Crimes reference
	//1RKY-cTKs7UZ-ROc3iRhTa8NIu9c7bbwEQqAgN5ut
	
	//72 municipios response
	var tableId = '14Ji0iP1orr0-P9YHFgMLtkyRjmlyCdAgGVX_xcdJ';
	var locationColumn = 'geometry';
	

	//Get the Acces to the Referece Fusion Table
	var script = document.createElement('script');
	var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	url.push('sql=');
	var query = 'SELECT * FROM ' + '1RKY-cTKs7UZ-ROc3iRhTa8NIu9c7bbwEQqAgN5ut'; //+" " +"WHERE 'Município' IN ('Aiuruoca', 'Alagoa') AND 'Descrição' IN ('Explora Floresta Veg Especies Area Comuns S/Aut', 'Explorar Florestas Veg Area Preservacao Perman S/Aut')";
	var encodedQuery = encodeURIComponent(query);
	url.push(encodedQuery);
	url.push('&callback=drawMapw');  //Calls the drawMap function
	url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
	script.src = url.join('');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
	
	
	//Initialize the Fusion Table
	var script = document.createElement('script');
	var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	url.push('sql=');
	var query = 'SELECT * FROM ' + tableId; //+" " +"WHERE 'Município' IN ('Aiuruoca', 'Alagoa') AND 'Descrição' IN ('Explora Floresta Veg Especies Area Comuns S/Aut', 'Explorar Florestas Veg Area Preservacao Perman S/Aut')";
	var encodedQuery = encodeURIComponent(query);
	url.push(encodedQuery);
	url.push('&callback=drawMap');  //Calls the drawMap function
	url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
	script.src = url.join('');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
	
	// Counts the number of elements in the fusion table
	var script = document.createElement('script');
	var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	url.push('sql=');
	var query = 'SELECT COUNT() FROM ' + tableId;
	var encodedQuery = encodeURIComponent(query);
	url.push(encodedQuery);
	url.push('&callback=NumberOfRows'); //Calls the NumberOfRows() function
	url.push('&key=AIzaSyCoC9A3WgFneccRufbysInygnWrhCie-T0');
	script.src = url.join('');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
	
	var Regioes_AOI_FusionTable = new google.maps.FusionTablesLayer({
		query: {
			select: locationColumn,
			from: tableId
		},
		
		//suppressInfoWindows: true,
		//map: map,
			
	});
	
	
	
	google.maps.event.addDomListener(document.getElementById('ButtonFiltro'), 'click', function() {
		UpdateFusionTable(Regioes_AOI_FusionTable , tableId, locationColumn);
		map.setZoom(9);
		map.setCenter({lat: -22.3051 , lng: (-45.3384 -0.24)});
		
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
	
	google.maps.event.addDomListener(Circle_Path, 'mousemove', function(event) {
		lat = event.latLng.lat().toString();
		lon = event.latLng.lng().toString();
		lat = lat.substr(0, lat.indexOf(".")+6);
		lon = lon.substr(0, lon.indexOf(".")+6);
		controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;
	});
	
	
	google.maps.event.addDomListener(Area_Path, 'mousemove', function(event) {
		lat = event.latLng.lat().toString();
		lon = event.latLng.lng().toString();
		lat = lat.substr(0, lat.indexOf(".")+6);
		lon = lon.substr(0, lon.indexOf(".")+6);
		controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;
	});
	
	
	
}// End Map


function displayPathElevation() {
	// Create a PathElevationRequest object using this array.
	// Ask for 256 samples along that path.
	// Initiate the path request.

	
	
	var CoordinatesArray = [];
	var lat;
	var lng;

	for (var i = 0; i < Line_Path.getPath().getLength(); i++) {
		lat = parseFloat( (  Line_Path.getPath()["j"][i].lat()  ).toFixed(5) );
		lng = parseFloat( (  Line_Path.getPath()["j"][i].lng()  ).toFixed(5) );
		CoordinatesArray.push({lat: lat, lng: lng});
	}

	//Debug
	//console.log(CoordinatesArray);

	elevator.getElevationAlongPath({
		'path': CoordinatesArray,
		'samples': 100
	}, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
	var chartDiv = document.getElementById('elevation_chart');
	if (status !== 'OK') {
		// Show the error code inside the chartDiv.
		chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
		status;
		return;
	}
	// Create a new chart in the elevation_chart DIV.
	var chart = new google.visualization.ColumnChart(chartDiv);

	// Extract the data from which to populate the chart.
	// Because the samples are equidistant, the 'Sample'
	// column here does double duty as distance along the
	// X axis.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Sample');
	data.addColumn('number', 'Elevation');
	for (var i = 0; i < elevations.length; i++) {
		data.addRow(['', elevations[i].elevation]);
	}

	// Draw the chart using the data within its DIV.
	chart.draw(data, {
		height: 150,
		width: 700,
		legend: 'none',
		titleY: 'Elevação (m)',
	});
}


//Draw and counts the polygons
function UpdateFusionTable(Regioes_AOI_FusionTable , tableId, locationColumn) {
	var queryGenerated = CreateQueryToFusionTable();
	
	console.log("Generated QUERY¬¬¬");
	console.log(queryGenerated);
	
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
		url.push('&callback=NumberOfRows');  //Calls the NumberOfRows function
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

var rowsReference;
function drawMapw(data) {
	//console.log(data);
	rowsReference = data['rows'];
	//console.log(rowsReference[0]);
}

var gFeatures = []; //this adds markers, polygons and polylines
var markers = []; //This only add markers
var HeatMap_markers = []; //This only add markers
var markerCluster = null;
var NumberOfTimesCalled = 0;
//Draws each polygon returned by the query
function drawMap(data) {
	console.log(data);
	if (HeatmapActivated == 1){
		$( "#ToggleCluster" ).click();
	}else{ //make sure to reset all the markers before apply the filter
		if (parseInt( $("#ToggleCluster").prop("value") ) == 0){
				markers.forEach(function(entry) {
					entry.setMap(null);
				});
				
				$("#ToggleCluster").html('Ver Pontos');
				$("#ToggleCluster").prop('value', '1'); 
		}
	}
	
	HeatMap_markers.length = 0;
	
	for (var i=0; i<gFeatures.length; i++) {
		gFeatures[i].setMap(null);
		gFeatures.length = 0;
		//console.log("gFeatures=="+gFeatures);
	}
	
		
	for (var i=0; i<markers.length; i++) {
		markers[i].setMap(null);
		markers.length = 0;
		//console.log("markers=="+markers);
	}
	
	if (markerCluster) {
		markerCluster.clearMarkers();
		markerCluster = null;
		//console.log("markerCluster=="+markerCluster);
	}

	var rows = data['rows'];

	if (NumberOfTimesCalled == 0){ // when the map is loaded will call the DrawMap() that will call ConstructFilter().
		ConstructFilter(rows);
	}
	//console.log(rows[0][2]);

	var ColorReceived;	
	//Get the colors here: http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFA07A
	var colors = ['Orange', 'Green', 'Brown', 'Lime', 'DarkGoldenRod', 'CornflowerBlue']; //HTML SUPPORTED COLORS ->>>> http://www.w3schools.com/colors/colors_names.asp
	var colorsActive = ['', '', '', '', '', '']; //Need to have same length of the "colors" Array
	var CrimeActiveCount = [0, 0, 0, 0, 0, 0]; 

	var Coordinates;
	var Lat;
	var Lng;

	for (var i in rows) {
		
		//COMMON TO ALL
		switch ( rows[i][2] ){
			case "Contra a Fauna":
				ColorReceived = 0;
				break;
			case "Contra a Flora":
				ColorReceived = 1;
				break;
			case "Poluicao e outros crimes ambientais":
				ColorReceived = 2;
				break;
			case "Contra o ordenamento urbano e o patrimonio cultural":
				ColorReceived = 3;
				break;
			case "Infracoes Administrativas":
				ColorReceived = 4;
				break;
			case "Outras":
				ColorReceived = 5;
				break;
		}
		//count the number of crime sxist for each time the ButtonFiltro is activated
		
		if(typeof rows[i][2]   !== 'undefined') {
			CrimeActiveCount[ColorReceived]++;
		}
		
		
		//console.log(rows[i][2] +"-"+  CrimeActiveCount[0] +"-"+ CrimeActiveCount[1] +"-"+  CrimeActiveCount[2] +"-"+  CrimeActiveCount[3] +"-"+ CrimeActiveCount[4] +"-"+  CrimeActiveCount[5] )
		
		//Only Pts
		if (  (rows[i][1] == 'Ponto')  ||  (rows[i][1] == 'Georreferenciar')  ){
			
			Coordinates = (String(rows[i][0])).split(",");
			Lat = parseFloat(Coordinates[0]);
			Lng = parseFloat(Coordinates[1]);
			
			//add the markers to create the heat map layer
			HeatMap_markers.push( new google.maps.LatLng(Lat, Lng) );
			
			Features = new google.maps.Marker({
				position: {lat: Lat, lng: Lng},
				icon: 	{
							url: 'Icons_Images/Pin_'+colors[ColorReceived]+'.png',
							size: new google.maps.Size(21, 34),
							origin: new google.maps.Point(0, 0),
						},
				shape: 	{
							coords: [0,0,  0,21,  20,21,  34,14,  34,6,  20,0  ],
							type: 'poly'
						},
				title: 'clique para obter mais informações',
				zIndex:3,
				//retrieve all the Fusion Table information for each row
				row: (function(index){
							var row={};
								for(var j=0;j<data['rows'][index].length;++j){
								row[data.columns[j]]=data['rows'][index][j];
							}
							return row;
						})(i)
			});
			
			markers.push(Features);

		}
		//Only Lines
		else if (  (rows[i][1] == 'Linha')  ){
			
			var newCoordinates = [];
            newCoordinates = constructNewCoordinates(rows[i][0]['geometry'], "Polyline"); //Always send th second Argument
 
            var Features = new google.maps.Polyline({
                path: newCoordinates,           //Line is "path" and polygon is "paths"
                strokeColor: colors[ColorReceived],
                strokeOpacity: 1.0,
                strokeWeight: 2,
                zIndex:2,
                row: (function(index){
                        var row={};
                            for(var j=0;j<data['rows'][index].length;++j){
                            row[data.columns[j]]=data['rows'][index][j];
                        }
                        return row;
                    })(i)
            });
			
		}
		//Only Polygons
		else if (  (rows[i][1] == 'Poligono')  ){
			
			var newCoordinates = [];
			newCoordinates = constructNewCoordinates(rows[i][0]['geometry'], "Polygon");

			Features = new google.maps.Polygon({
				paths: newCoordinates,
				strokeColor: 'white', 				//Line is "path" and polygon is "paths"
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: colors[ColorReceived],
				fillOpacity: 0.6,
				zIndex:1,
				row: (function(index){
							var row={};
								for(var j=0;j<data['rows'][index].length;++j){
									row[data.columns[j]]=data['rows'][index][j];
								}
							return row;
						})(i)
			});
			
			
			
		}
		
		//Get All Colors Active in the map
		colorsActive[ColorReceived] = colors[ColorReceived];
		
		// COMMON TO ALL (polygon, lines and pts)
		Features.setMap(map);
		
		//console.log(Features);
		
        gFeatures.push(Features);
		
		//Add Listeners
		//Working MouseMove event
		google.maps.event.addListener(Features, 'mousemove', function(event) {
			
			//Change the Lat Lng Box
			lat = event.latLng.lat().toString();
			lon = event.latLng.lng().toString();
			lat = lat.substr(0, lat.indexOf(".")+6);
			lon = lon.substr(0, lon.indexOf(".")+6);
			controlLatLong.innerHTML =  "Lat: " + lat + " / Long: " + lon;

			//Set Content to DIV
			document.getElementById("RegionHoverComment").textContent= this.row['Tipo do ocorrido'];
			
			//Show DIV
			$('#RegionHover').css({'top':mouseY-75,'left':mouseX}).fadeIn(5);
			
			//Change Stroke Style
			this.setOptions({strokeWeight: 3});

		});
	
		//Working RightClick event
		google.maps.event.addListener(Features, 'rightclick', function() {
			Clear_CalcDist_Path();
			
		});	
	
		//Working MouseOut event
		google.maps.event.addListener(Features, 'mouseout', function() {
			this.setOptions({strokeWeight: 2});
			$('#RegionHover').fadeOut(5);
			
		});

		// Working Click event
		google.maps.event.addListener(Features, 'click', function (e) {
			if (document.getElementById('Calc_Dist_DIV').value == 1){
				addLatLng(e);
			}else{	
			
				//Create Info Windows
				var URL_Link = "http://www.pmambientalbrasil.org.br/";

				var FoundSomething = 0;
				for (var k = 0; k < rowsReference.length; k++) { 
					if (this.row['Código Subclasse'] === rowsReference[k][0]){
						console.log(rowsReference[k]);
						FoundSomething = 1;
						break;
					}
				}
				
				if (FoundSomething == 0){ //There's no reference attached to it. Category: "Outras"
					for (var k = 0; k < rowsReference.length; k++) { 
						if (rowsReference[k][0] === 'NODATA'){
							console.log(rowsReference[k]);
							break;
						}
					}
					
				}
				
				var CrimeAmbText = "";
				if (rowsReference[k][11]){
					CrimeAmbText = '<tr>' +
							'<td class="InfoBoxTitle">' +
								'Lei de Crimes Ambientais:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								rowsReference[k][11] +
							'</td>' +
						'</tr>';
				}
				
				var PenalidadeB = "";
				if (rowsReference[k][13]){
					PenalidadeB = '<br>'+rowsReference[k][13];
				}
				var PenalidadeC = "";
				if (rowsReference[k][14]){
					PenalidadeC = '<br>'+rowsReference[k][14];
				}
				var PenalidadeD = "";
				if (rowsReference[k][15]){
					PenalidadeD = '<br>'+rowsReference[k][15];
				}
				
				var content = '<div id="iw-container">' +
				'<div class="iw-title">Crime Amb.: '+this.row['Tipo do ocorrido']+'</div>' +
				'<div class="iw-content">' + 
					'<table id="InfoBoxTable" border=1 frame=void rules=rows>' +
						'<caption>Informações Adicionais: </caption>'+
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Descrição do Ocorrido:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								this.row['Descrição'] +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Número do REDS:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								this.row['Número do REDS'] +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Dia do Evento:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								this.row['Início do evento'] +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Código da Infração:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								rowsReference[k][8] +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Penalidade:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								rowsReference[k][12] +
								PenalidadeB+
								PenalidadeC+
								PenalidadeD+
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Classificação:' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								rowsReference[k][10] +
							'</td>' +
						'</tr>' +
						CrimeAmbText+
						'<tr>' +
							'<td class="InfoBoxTitle">' +
								'Página do SIDS(MG):' +
							'</td>' +
							'<td class="InfoBoxTxt"> ' +
								rowsReference[k][3] +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="LastRow" colspan="2" >' +
								'<a href=\"'+URL_Link+'\" target="_blank">Clique aqui</a> para obter mais informações sobre a Policia Ambiental.'+
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
		});
	
	}//End For
	
	UpdateLegend(colorsActive, CrimeActiveCount);
	

	markerCluster = new MarkerClusterer(map, markers, {
		maxZoom: 21, //Max zoom that the MarkerCluster works
		gridSize: 40, //radius to count the markers  
		//imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m',
		imagePath: 'Icons_Images/cluster/m',
	});
		
	
	//console.log(gFeatures)
	NumberOfTimesCalled++;
}

//https://googlemaps.github.io/js-marker-clusterer/docs/examples.html
//https://googlemaps.github.io/js-marker-clusterer/examples/advanced_example.html


//Update the Legend
function UpdateLegend(ColorsActive, CrimeActiveCount) {
	//console.log(ColorsActive);
	
    var table = document.getElementById("LegendTable");
	//console.log("table= "+table);
	var RowLength = document.getElementById("LegendTable").rows.length;
	//console.log("RowLength= "+RowLength);
	
	var row;
	var cell1;
	var cell2;
	var LegendText;
	
	//Deleting all Rows
	for (i = 0; i < RowLength; i++) {
		
		table.deleteRow(document.getElementById("LegendTable").rows[i]);
		
		/*
		//check the value of each legend row
		var Row = document.getElementById("LegendTable").rows[i];
		var Cells = Row.getElementsByTagName("td");
		console.log("item= "+Cells[1].innerText);
		*/
		
		//console.log("i= "+i);
	}
	
	row = table.insertRow(0);
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell1.innerHTML = '<div style="text-align:center; margin: 3px; width:25px; height:25px; border: 2px solid rgba(5, 142, 142,0.8); ">';
	cell1.className = "LegendImg";
	cell2.innerHTML = 'Limite dos municípios';
	cell2.className = "LegendTxt";
	
	var NumberCount;
	for (i = 0; i < ColorsActive.length; i++) { 
		var rowNumber = 0;
		if (ColorsActive[i] == ""){
			//debug
			//console.log("IF==="+i);
			continue;
		}else{
			//debug
			//console.log("ELSE==="+i);
			switch (  i  ){
				case 0:
					LegendText = "Contra a fauna";
					NumberCount = CrimeActiveCount[i];
					break;
				case 1:
					LegendText = "Contra a flora";
					NumberCount = CrimeActiveCount[i];
					break;
				case 2:
					LegendText = "Poluição e outros crimes ambientais";
					NumberCount = CrimeActiveCount[i];
					break;
				case 3:
					LegendText = "Contra o ordenamento urbano e o patrimônio cultural";
					NumberCount = CrimeActiveCount[i];
					break;
				case 4:
					LegendText = "Infrações Administrativas";
					NumberCount = CrimeActiveCount[i];
					break;
				case 5:
					LegendText = "Outras";
					NumberCount = CrimeActiveCount[i];
					break;
			}
	
			row = table.insertRow(rowNumber);
			cell1 = row.insertCell(0);
			cell2 = row.insertCell(1);
			cell1.innerHTML = '<div style="background-color: '+ColorsActive[i]+'; margin: 3px; width:30px; height:30px; border: 0.8px solid white; "></div>';
			cell1.className = "LegendImg";
			cell2.innerHTML = LegendText+" ["+NumberCount+"]";
			cell2.className = "LegendTxt";	
			rowNumber += 1;
		}

	}
}


//Access the lat and long for each node and return a array containing those values, extracted from fusion table.
function constructNewCoordinates(CoordArray, Feature) {
	var newCoordinates = [];
	console.log(Feature);
	console.log("######################");
	if (Feature == "Polygon"){
		var coordinates = CoordArray['coordinates'][0];
		for (var i in coordinates) {
			newCoordinates.push(
				// write the lat and long respectively
				new google.maps.LatLng(coordinates[i][1], coordinates[i][0])
			);
			console.log(coordinates[i][1] +" , "+ coordinates[i][0]);
		}
	}
	else if (Feature == "Polyline"){
		var coordinates = CoordArray['coordinates'];
		for (var i in coordinates) {
			newCoordinates.push(
				// write the lat and long respectively
				new google.maps.LatLng(coordinates[i][1], coordinates[i][0])
			);
			
			console.log(coordinates[i][1] +" , "+ coordinates[i][0]);
		}
		
	}
	
	console.log("######################");

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
	
	if(!FusionElemLength) { //the variable = null;
		FusionElemLength = Count_SelectedFilter;
		var now = new Date;
		$('#FiltroComment').text("Total de infrações ambientais registradas até "+now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+": "+FusionElemLength);	
	}else{
		if (Count_SelectedFilter){
			if (Count_SelectedFilter == 1 ){
			$('#FiltroComment').text(Count_SelectedFilter + ' infração selecionada. Total: '+ FusionElemLength);			
			}else{
				$('#FiltroComment').text(Count_SelectedFilter + ' infrações foram selecionadas. Total: '+FusionElemLength);	
			}	
		}else{ // number of rows == 0
			$('#FiltroComment').text('Nenhuma infração foi encontrada. Total: '+FusionElemLength);	
		}
	}
	
}

//Creates the Trace for the Distance Calculator
function addLatLng(event) { //https://developers.google.com/maps/documentation/javascript/geometry  ->>> CTRL + F ->>> ".getPath()"
	
	ToolChecked = document.getElementById('Calculadora_Radio').value;

	if(document.getElementById('RadioDist').checked) { //For polyline
		pathLine = Line_Path.getPath();
		pathLine.push(event.latLng);
		
		ValueUnit = google.maps.geometry.spherical.computeLength(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

	}else if(document.getElementById('RadioArea').checked) { //For polygon
		pathLine = Area_Path.getPath();
		pathLine.push(event.latLng);
		
		ValueUnit = google.maps.geometry.spherical.computeArea(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;
		

	}else if(document.getElementById('RadioCircle').checked) { //For polygon
		Circle_Path.setCenter(new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()));	
		radius = Circle_Path.getRadius();
		ValueUnit = Math.PI*radius*radius;
		UnitConversion = document.getElementById('UnitConversion').value;
		
		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

		document.getElementById("Radius").value= (radius/UnitConversion).toFixed(3);

	}else if(document.getElementById('RadioPoint').checked) { //For polygon	
		Marker_Path.setPosition(new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()));	

		document.getElementById('Distance').value =  event.latLng.lat().toFixed(5).toString() +","+ event.latLng.lng().toFixed(5).toString();

	}

}

//Updates the Path of the polygon/Polyline when the user changes its bounds
function UpdatePath(event) { 

	ToolChecked = document.getElementById('Calculadora_Radio').value;

	if(document.getElementById('RadioDist').checked) { //For polyline
		pathLine = Line_Path.getPath();
		
		ValueUnit = google.maps.geometry.spherical.computeLength(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;

	}else if(document.getElementById('RadioArea').checked) { //For polygon
		pathLine = Area_Path.getPath();
		
		ValueUnit = google.maps.geometry.spherical.computeArea(pathLine);
		UnitConversion = document.getElementById('UnitConversion').value;

		document.getElementById('Distance').value =  (ValueUnit/UnitConversion).toFixed(3) ;
		
	}
	
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


