// set mapbox tile layer
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

var map2 = L.map('example2')
	.setView([4.7277831, -74.0080852], 5)
	.addLayer(mapboxTiles1);


$("#printBtn").click(function () {
	$('#map').print();
});

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

//Edición de estilo para formas

var styleEditor = L.control.styleEditor({
	position: 'topleft'
})
map2.addControl(styleEditor)
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

/*L.geoJSON(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);*/




//CAPAS
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
/*function basementDweller (feature, layer) {
	layer.bindPopup("<h1> HI I'm an info window </h1>");
            };
 */
var ilic = L.geoJson(cilicitos, {});
var col = L.layerGroup([lim, Deptos, alertasCol, ELN, GAO, n_RIES, vio_Pol]);
var baseMaps = {
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
//CAPAS
//Leyenda

//CREACIÓN DE FORMAS
const m1 = L.circleMarker([51.50313, -0.091223], {
	radius: 10
});
const m2 = L.marker([51.50614, -0.0989]);
const m3 = L.marker([51.50915, -0.096112], {
	pmIgnore: true
});
const mGroup = L.layerGroup([m1, m2, m3]).addTo(map2);
// mGroup.pm.enable();
map2.pm.addControls({
	drawMarker: false,
	drawPolygon: true,
	editPolygon: false,
	drawPolyline: false,
	deleteLayer: true,
});
map2.pm.addControls({
	drawMarker: true,
	drawPolygon: true,
	editPolygon: true,
	drawPolyline: true,
	deleteLayer: true,
});
map2.on('pm:globaleditmodetoggled', function (e) {
	// console.log(e);
});

const theCollection = L.geoJson(geoJsonData, {
	pointToLayer: (feature, latlng) => {
		if (feature.properties.customGeometry) {
			return new L.Circle(latlng, feature.properties.customGeometry.radius);
		} else {
			return new L.Marker(latlng);
		}
	},
	// onEachFeature: (feature, layer) => {
	//     layer.addTo(map2);
	// },
});
theCollection.addTo(map2);
const b = theCollection.getBounds();
map2.fitBounds(b);
console.log(theCollection);
theCollection.on('pm:edit', function (e) {
	console.log(e);
});
theCollection.on('pm:dragstart', function (e) {
	console.log(e);
});
map2.on('pm:drawstart', function (e) {
	var layer = e.workingLayer;
	// console.log(layer);
	layer.on('pm:centerplaced', function (e) {
		// console.log(e);
	});
});
map2.on('pm:create', function (e) {
	var layer = e.layer;
	// console.log(layer);
	layer.on('pm:centerplaced', function (e) {
		// console.log(e);
	});
});

polygonLayer.on('pm:update', function (e) {
	console.log(e);
});
polygonLayer.on('pm:intersect', function (e) {
	console.log(e);
});
map2.pm.enableDraw('Polygon', {
	allowSelfIntersection: false
});
map2.pm.disableDraw('Polygon');
map2.pm.enableDraw('Line', {
	allowSelfIntersection: false
});
map2.pm.disableDraw('Line');
map2.on('pm:create', function (e) {
	e.layer.pm.enable({
		allowSelfIntersection: false
	});

	e.layer.on('pm:markerdragend', function (e) {
		// console.log(e);
	});

	e.layer.on('pm:update', function (e) {
		console.log(e);
	});

	e.layer.on('pm:cut', function (e) {
		console.log(e);
	});
});
map2.on('pm:drawstart', function (e) {
	var layer = e.workingLayer;
	layer.on('pm:vertexadded', function (e) {
		// console.log(e);
		// console.log(e.workingLayer.pm.hasSelfIntersection());
	});
});

polygonLayer.on('pm:vertexadded', function (e) {
	// console.log(e);
});
polygonLayer.on('pm:vertexremoved', function (e) {
	// console.log(e);
});
polygonLayer.on('pm:markerdragstart', function (e) {
	// console.log(e);
});
layerGroup.addLayer(someLayer);

someLayer.addData(feature);
layerGroup.on('pm:snap', function (e) {
	console.log('snap');
	console.log(e);
});
layerGroup.on('pm:unsnap', function (e) {
	console.log('unsnap');
	console.log(e);
});
layerGroup.addLayer(layerGroupItem2);
layerGroup.on('pm:dragstart', function (e) {
	console.log(e);
});
layerGroup.on('pm:drag', function (e) {
	console.log(e);
});
layerGroup.on('pm:dragend', function (e) {
	console.log(e);
});
layerGroup.on('pm:markerdragstart', function (e) {
	console.log(e);
});
layerGroup.on('pm:markerdragend', function (e) {
	console.log(e);
});
//CREACIÓN DE FORMAS