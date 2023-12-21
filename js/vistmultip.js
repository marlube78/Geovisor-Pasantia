//BASEMAPAS
var mapboxTiles1 = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
	attr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data {attribution.OpenStreetMap}'
);

var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [
		[-85.0511287776, -179.999999975],
		[85.0511287776, 179.999999975]
	],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

var GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [
		[-75, -180],
		[81, 180]
	],
	minZoom: 2,
	maxZoom: 19,
	apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
});
//BASEMAPAS


var center = [4.7277831, -74.0080852];

var stamenOptions = {
    attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data OpenStreetmap',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20
};

var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', stamenOptions);
var tonerLite = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', stamenOptions);
var watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', stamenOptions);

var map2 = L.map('map',  {
    layers: [toner],
    center: center,
    zoom: 5
});

var mapA = L.map('mapA', {
    layers: [watercolor],
    center: center,
    zoom: 5,
    zoomControl: false
});
var mapB = L.map('mapB', {
    layers: [tonerLite],
    center: center,
    zoom: 5,
    zoomControl: false
});

map2.sync(mapA, {syncCursor: true});
map2.sync(mapB, {syncCursor: true});

// If you want interaction with mapA|B to be synchronized on map,
// add other links as well.
mapA.sync(map2, {syncCursor: true});
mapA.sync(mapB, {syncCursor: true});

mapB.sync(map2, {syncCursor: true});
mapB.sync(mapA, {syncCursor: true});

//BOTONES
//Edición de estilo para formas
var styleEditor = L.control.styleEditor({
	position: 'topleft'
})
map2.addControl(styleEditor)

var styleEditor = L.control.styleEditor({
	position: 'topleft'
})
mapA.addControl(styleEditor)

var styleEditor = L.control.styleEditor({
	position: 'topleft'
})
mapB.addControl(styleEditor)
//Edición de estilo para formas

//MOUSE
//add configured controls
L.control.coordinates({
	position: "bottomleft",
	decimals: 2,
	decimalSeperator: ",",
	labelTemplateLat: "Latitud: {y}",
	labelTemplateLng: "Longitud: {x}"
}).addTo(map2);
//add configured controls
L.control.coordinates({
	position: "bottomleft",
	decimals: 2,
	decimalSeperator: ",",
	labelTemplateLat: "Latitud: {y}",
	labelTemplateLng: "Longitud: {x}"
}).addTo(map2);
//MOUSE

//CAPAS
var myStyle = {
	"color": "#de2d26",
	"weight": 3,
	"opacity": 0.80
};
var sDeptos = {
	"color": "#080000",
	"weight": 1,
	"opacity": 0.80
};
var sInundaciones = {
	"color": "#001a57",
	"weight": 1,
	"opacity": 0.80
};
var sIncendios = {
	"color": "#f80000",
	"weight": 1,
	"opacity": 0.80
};
var sGAO = {
	"color": "#ffd700",
	"weight": 1,
	"opacity": 0.80
};
var sRM = {
	"color": "#e4e808",
	"weight": 1,
	"opacity": 1
};
var sRA = {
	"color": "#d37908",
	"weight": 1,
	"opacity": 1
};
var sRE = {
	"color": "#f80000",
	"weight": 1,
	"opacity": 1
};
var sVP = {
	"color": "#7f07c0",
	"weight": 1,
	"opacity": 1
};

var sDzmts ={
	"color":"#713b04",
	"weight":1,
	"opacity":1
}
var sCrecientes ={
	"color":"#18a6f6",
	"weight":1,
	"opacity":1
}
var sELN ={
	"color":"#f12a09",
	"weight":1,
	"opacity":1
}
var sRayos ={
	"color":"#f6c711",
	"weight":1,
	"opacity":1
}
var lim = L.geoJson(limcol, {
	style: myStyle
}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_0
});
var Deptos = L.geoJson(DeptosCol, {
	style: sDeptos
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1
});
var alertasCol = L.geoJson(alertasCol, {
});
var ELN = L.geoJson(ELN, {
	style:sELN
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+  'Ocupacion: '+ layer.feature.properties.OCUPACION +'</b><br />'+ 'Niv riesgo por violencia politica: '
	+ layer.feature.properties.VIO_POL
});
var GAO = L.geoJson(GAO, {
	style: sGAO
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1+ '</b><br />' + layer.feature.properties.NAME_2+ '</b><br />'
	+  'Ocupacion: '+ layer.feature.properties.OCUPACION +'</b><br />'+ 'Niv riesgo por violencia politica: '
	+ layer.feature.properties.VIO_POL
});
var n_RIES = L.geoJson(n_Ries, {
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1+ '</b><br />' + layer.feature.properties.NAME_2+ '</b><br />'
});
var vio_Pol = L.geoJson(vio_Pol, {
	style: sVP
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1+ '</b><br />' + layer.feature.properties.NAME_2+ '</b><br />'
	+ 'Niv riesgo por violencia politica: '	+ layer.feature.properties.VIO_POL+ '</b><br />'+
	'Niv riesgo electoral: '+ layer.feature.properties.NIVEL_RIES
});
var Inundac = L.geoJson(Inundac, {
	style: sInundaciones
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+layer.feature.properties.FENOMENO+'</b><br />'+'Alerta: '+layer.feature.properties.NIVEL
});
var Incendios = L.geoJson(Incendios, {
	style: sIncendios
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+layer.feature.properties.FENOMENO+'</b><br />'+'Alerta: '+layer.feature.properties.NIVEL
});
var CrecienteS = L.geoJson(CrecienteS, {
	style: sCrecientes
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1+ '</b><br />' + layer.feature.properties.NAME_2+ '</b><br />'
	+layer.feature.properties.FENOMENO+'</b><br />'+'Alerta: '+layer.feature.properties.NIVEL
});
var Desliz = L.geoJson(Deslizamientos, {
	style:sDzmts
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+layer.feature.properties.FENOMENO+'</b><br />'+'Alerta: '+layer.feature.properties.NIVEL
});
var RiesgoE_Medio = L.geoJson(RiesgoE_Medio, {
	style: sRM
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+'Niv riesgo por violencia politica: '+layer.feature.properties.VIO_POL + '</b><br />'
	+'Niv riesgo electoral: '+layer.feature.properties.NIVEL_RIES
	
});
var RiesgoE_Alto = L.geoJson(RiesgoE_Alto, {
	style: sRA
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1+ '</b><br />' + layer.feature.properties.NAME_2+ '</b><br />'
	+'Niv riesgo por violencia politica: '+layer.feature.properties.VIO_POL + '</b><br />'
	+'Niv riesgo electoral: '+layer.feature.properties.NIVEL_RIES
});
var RiesgoE_Extremo = L.geoJson(RiesgoE_Extremo, {
	style: sRE
	}).bindPopup(function(layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+'Niv riesgo por violencia politica: '+layer.feature.properties.VIO_POL + '</b><br />'
	+'Niv riesgo electoral: '+layer.feature.properties.NIVEL_RIES
});

var Rayos = L.geoJSON(Rayos, {
style: sRayos
}).bindPopup(function (layer) {
	return layer.feature.properties.NAME_1 + '</b><br />'+ layer.feature.properties.NAME_2+ '</b><br />'
	+layer.feature.properties.FENOMENO+'</b><br />'+'Alerta: '+layer.feature.properties.NIVEL
});
var ilic = L.geoJson(cilicitos, {});
var col = L.layerGroup([lim, Deptos, alertasCol, ELN, GAO, n_RIES, vio_Pol]);

var baseMaps = {
	"Black&white": toner,
	"OpenStreetM": mapboxTiles1,
	"Noche": NASAGIBS_ViirsEarthAtNight2012,
	"Satelital": GeoportailFrance_orthos
};
var overlayMaps = {
	"Limites": lim,
	"Deptos": Deptos,
	/*"C_ilicitos": ilic,*/
	/*"Alertas": alertasCol,*/
		/*"Nivel_Riesgo": n_RIES,*/	
	"Inundaciones": Inundac,
	"Incendios": Incendios,
	"Deslizamientos": Desliz,
	"Rayos":Rayos,
	"CrecienteSubita":CrecienteS,
	"Violencia_Politica": vio_Pol,
	"Presencia_ELN": ELN,
	"Presencia_GAO": GAO,
	"RiesgoE_Medio":RiesgoE_Medio,
	"RiesgoE_Alto":RiesgoE_Alto,
	"RiesgoE_Extremo":RiesgoE_Extremo
};
L.control.layers(baseMaps, overlayMaps).addTo(map2);
Deptos.addTo(map2);

var baseMaps = {
	"Wather Color": watercolor,
	"OpenStreetM": mapboxTiles1,
	"Noche": NASAGIBS_ViirsEarthAtNight2012,
	"Satelital": GeoportailFrance_orthos
};
var overlayMaps = {
	"Limites": lim,
	"Deptos": Deptos,
	/*"C_ilicitos": ilic,*/
	/*"Alertas": alertasCol,*/
		/*"Nivel_Riesgo": n_RIES,*/	
	"Inundaciones": Inundac,
	"Incendios": Incendios,
	"Deslizamientos": Desliz,
	"Rayos":Rayos,
	"CrecienteSubita":CrecienteS,
	"Violencia_Politica": vio_Pol,
	"Presencia_ELN": ELN,
	"Presencia_GAO": GAO,
	"RiesgoE_Medio":RiesgoE_Medio,
	"RiesgoE_Alto":RiesgoE_Alto,
	"RiesgoE_Extremo":RiesgoE_Extremo
};
L.control.layers(baseMaps, overlayMaps).addTo(mapA);
	


var baseMaps = {
	"Mapa Leaflet": watercolor,
	"OpenStreetM": mapboxTiles1,
	"Noche": NASAGIBS_ViirsEarthAtNight2012,
	"Satelital": GeoportailFrance_orthos
};
var overlayMaps = {
	"Limites": lim,
	"Deptos": Deptos,
	/*"C_ilicitos": ilic,
	"Alertas": alertasCol,
	"Nivel_Riesgo": n_RIES,*/	
	"Inundaciones": Inundac,
	"Incendios": Incendios,
	"Deslizamientos": Desliz,
	"Rayos":Rayos,
	"CrecienteSubita":CrecienteS,
	"Violencia_Politica": vio_Pol,
	"Presencia_ELN": ELN,
	"Presencia_GAO": GAO,
	"RiesgoE_Medio":RiesgoE_Medio,
	"RiesgoE_Alto":RiesgoE_Alto,
	"RiesgoE_Extremo":RiesgoE_Extremo
};
L.control.layers(baseMaps, overlayMaps).addTo(mapB);
//CAPAS
