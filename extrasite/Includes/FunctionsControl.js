$(document).ready(function(){
	
});

// Create a buttom to re-centralize the map.
function CentralizarControl(controlDiv, map, center, zoom) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
    controlDiv.style.paddingTop = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para retornar ao zoom inicial';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/Centralizar.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        map.setCenter(center);
        map.setZoom(zoom);
    });
}

//Create Filter to Search regions
function FiltroControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para filtrar/pesquisar por regiões';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgFiltro.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

	
    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#FiltroBox').css('display') == 'none')
		{
			$("#FiltroBox").css("display", "block");
		}else{
			$("#FiltroBox").css("display", "none");
		}
    });
}

//Geocode a Address the user enters
function LocalizarControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para procurar uma localização';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgLocalizar.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

	
    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#LocalizadorBox').css('display') == 'none')
		{
			$("#LocalizadorBox").css("display", "block");
		}else{
			$("#LocalizadorBox").css("display", "none");
		}
    });
	/*
	google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#elevation_chart').css('display') == 'none')
		{
			$("#elevation_chart").css("display", "block");
		}else{
			$("#elevation_chart").css("display", "none");
		}
    });*/
}

//Shows up the legend
function LegendaControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para ver a legenda do mapa';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgLegenda.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#LegendBox').css('display') == 'none')
		{
			$("#LegendBox").css("display", "block");
		}else{
			$("#LegendBox").css("display", "none");
		}
    });
}

//Shows up the legend
function FerramentasControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para calcular medidas no mapa';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgTools.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#ToolBox').css('display') == 'none')
		{
			$("#ToolBox").css("display", "block");
		}else{
			$("#ToolBox").css("display", "none");
			Clear_CalcDist_Path();
		}
    });
}

//Shows up the legend
function TrocarVisualizacaoControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para trocar as visualização dos Pontos no Mapa';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgLocalizarToogleOption.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#ToolBox_Control').css('display') == 'none')
		{
			$("#ToolBox_Control").css("display", "block");
		}else{
			$("#ToolBox_Control").css("display", "none");
		}
    });
}

//Shows up the Graph
function GraficoControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para gerar gráficos';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgGraph.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#GraphBox').css('display') == 'none')
		{
			$("#GraphBox").css("display", "block");
		}else{
			$("#GraphBox").css("display", "none");
		}
    });
}

//Shows up the Form
function FormularioControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para acessar o Formulário';
    controlDiv.appendChild(controlUI);
	
    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgForm.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#FormBox').css('display') == 'none')
		{
			$("#FormBox").css("display", "block");
		}else{
			$("#FormBox").css("display", "none");
		}

		$('#FormBox, #Form-overlay-back ').fadeIn(500); 
		
    });
}
//Shows up the Help
function AjudaControl(controlDiv, map) {
	
	// Set CSS to control the box that contains the Centralizar Button
	controlDiv.style.paddingRight = '6px';
	controlDiv.style.height = '40px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.marginBottom = '22px';
    controlUI.style.cursor = 'help';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Clique para abrir a janela de ajuda.';
    controlDiv.appendChild(controlUI);
	

    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
    ControlImage.style.padding = '1px 1px 1px 1px';
    ControlImage.innerHTML = '<img src="Icons_Images/ImgAjuda.png" width=32px height=32px>';
    controlUI.appendChild(ControlImage);

    google.maps.event.addDomListener(controlUI, 'click', function() {
		if($('#AjudaBox').css('display') == 'none')
		{
			$("#AjudaBox").css("display", "block");
		}else{
			$("#AjudaBox").css("display", "none");
		}

		$('#AjudaBox, #Ajuda-overlay-back ').fadeIn(500); 
		
    });
}


function NorteControl(controlDiv, map) {
    // Set CSS to control the box that contains the Logo
	controlDiv.style.padding = '0px 6px 0px 0px';
    // Create a empty Box to comprise the next Div that will contain the North Arrow
    var ControlBox1 = document.createElement('div');
    ControlBox1.style.opacity = 1;
    ControlBox1.style.textAlign = 'right';
    controlDiv.appendChild(ControlBox1);

    // Create a Box that contains the North Arrow and adds it to the previous Div
    var ControlImage = document.createElement('div');
    ControlImage.style.paddingLeft = '0px';
    ControlImage.style.paddingRight = '0px';
    ControlImage.style.paddingTop = '0px';
    ControlImage.style.paddingBottom = '1px';
    ControlImage.innerHTML = '<img src="Icons_Images/rosaventos.png" width=70px>';
    ControlBox1.appendChild(ControlImage);

}



var controlLatLong;
function LatlonControl(controlDiv, map) {

	//Separates the two div by adding a padding to it.
	controlDiv.style.padding = '5px 6px 5px 5px';
	
    // Create a empty Box to comprise the next Div that will contain the Latitude and Longitude Text 
    var ControlBox2 = document.createElement('div');
	ControlBox2.style.backgroundColor = 'rgba(255,255,255,0.8)';
	ControlBox2.style.border = '2px solid #fff';
	ControlBox2.style.borderRadius = '3px';
	ControlBox2.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    ControlBox2.style.borderStyle = 'solid';
    ControlBox2.style.borderWidth = '1px';
    ControlBox2.style.borderColor = 'rgba(132,132,132,0.8)';
    ControlBox2.style.textAlign = 'center';
    ControlBox2.title = '';
    controlDiv.appendChild(ControlBox2);
	
    // Create a Box that contains the Latitude and Longitude String and adds it to the previous Div
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Georgia, serif';
    controlText.style.fontSize = '10px';
    controlText.style.paddingLeft = '6px';
    controlText.style.paddingRight = '6px';
    controlText.style.paddingTop = '3px';
    controlText.style.paddingBottom = '3px';
    controlText.innerHTML = 'Lat / Long';
    controlLatLong = controlText;
    controlText.setAttribute("id", "mouseLatLong");
    ControlBox2.appendChild(controlText);
}


//Function: Logo with no background
function LogoControl(controlDiv, map) {
    // Set CSS to control the box that contains the Logo
	controlDiv.style.padding = '4px 4px 4px 7px';
	var controlUI = document.createElement('div');
	controlUI.className = 'ButtonMenu';
	controlUI.style.backgroundColor = 'rgba(255,255,255,0.9)';

    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = '';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var ControlImage = document.createElement('div');
	// Set CSS to control the box that contains the Logo
    ControlImage.style.padding = '5px';
	ControlImage.innerHTML = '<a href="http://www.pmambientalbrasil.org.br/" target="_blank"> <img src="Icons_Images/PCMG.png" width= 40px> </a>';
    
	controlUI.appendChild(ControlImage);
}
