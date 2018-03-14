function crearPdf(){

//creamos el pdf
var doc = new jsPDF('p','','letter'); 

//algunos datos necesarios
var tipoSuperficie=document.getElementById("selectEscorrentia1").value;
var v1=document.getElementById("selectEscorrentia2");
var tipoPendiente=v1.options[v1.selectedIndex].text; 
var v2=document.getElementById("selectRugosidad2");
var tipoCanal=v2.options[v2.selectedIndex].text; 

// titulo PDF 
doc.setFontSize(18);
doc.setTextColor(0, 0, 0);
doc.setFont("helvetica");
doc.setFontType("bold");
doc.text(74, 25, 'Informe de Resultados');
doc.setLineWidth(0.8);
doc.line(20, 35, 198, 35);
//Primer item  
doc.setFontSize(15);
doc.text(20, 45, 'Predio Selecionado');
doc.setTextColor(125, 125, 125); 
doc.setFontSize(13);
doc.setFontType('normal');
doc.text(20, 50, 'Nombre: '+nombrePredio+".");
doc.text(20, 55, 'Empresa: '+empresaPredio+".");
doc.text(20, 60, 'Latitud: '+latPredio+".");
doc.text(20, 65, 'Longitud: '+lonPredio+".");
doc.text(20, 70, 'Código: '+codigoPredio+".");
doc.text(20, 75, 'Area Predio: '+area_hecPredio+" ha.");
doc.setTextColor(0, 0, 0);
//segundo item
doc.setFontSize(15);
doc.setFontType("bold");
doc.text(20, 85, 'Estación IDF más cercana');
doc.text(155, 85, 'Ecuación IDF');
doc.setFontType('normal');
doc.setFontSize(13);
doc.setTextColor(125, 125, 125);
doc.text(20, 90, 'Nombre: '+nombreIDF+"."); 
doc.text(20, 95, 'Latitud: '+latitudIDF+".");
doc.text(20, 100, 'Longitud: '+longitudIDF+".");
doc.setTextColor(0, 0, 0);
doc.setFontSize(15);
doc.setFontType("bold");
//tercer item
doc.text(20, 110, 'Calculo de Caudal');
doc.setFontType('normal');
doc.setFontSize(13); 
doc.setTextColor(125, 125, 125);    
doc.text(20, 115, 'Superficie cuenca: '+superficieCuenca+' m\².');
doc.text(20, 120, 'Duracion intensidad: '+DuracionIDF+' minutos.');
doc.text(20, 125, 'Periodo de retorno : '+retorno.replace(/^\D+/g, "")+' Años.');

var radioEscorrentia=$('input:radio[name=optionsRadiosUno]:checked').val();
if(radioEscorrentia=='option1'){
    doc.text(20, 130, 'Tipo de superficie: '+tipoSuperficie+'.');
    doc.text(20, 135, 'Pendiente: '+tipoPendiente+'.'); 
    doc.text(20, 140, 'Coeficiente de Escorrentía : '+coeficienteEscorrentia+'.'); 
    doc.setFontSize(15);  
    doc.setFontType("bold");    
    doc.text(20, 145, 'Caudal : '+caudal.toFixed(4)+' m\³/s.');    
} 
else{
    doc.text(20, 130, 'Selección de coeficiente Manual.'); 
    doc.text(20, 135, 'Coeficiente de Escorrentía : '+coeficienteEscorrentia+'.'); 
    doc.setFontSize(15);  
    doc.setFontType("bold");    
    doc.text(20, 140, 'Caudal : '+caudal.toFixed(4)+' m\³/s.');      
}  
doc.setTextColor(0, 0, 0);
doc.setFontSize(15);
doc.setFontType("bold");
//cuarto item
doc.text(20, 155, 'Calculo de altura ');
doc.setFontType('normal');
doc.setFontSize(13); 
doc.setTextColor(125, 125, 125);

var radioRugosidad=$('input:radio[name=optionsRadiosDos]:checked').val();
if(radioRugosidad=='option3'){
    doc.text(20, 160, 'Tipo  de canal: '+tipoCanal+'.');
}
else{
    doc.text(20, 160, 'Selección de coeficiente Manual.');
} 
doc.text(20, 165, 'Coeficiente de Rugosidad de conducto: '+coeficienteRugosidad+'.');
doc.text(20, 170, 'Pendiente de conducto '+pendienteConducto+' %.');
doc.setFontSize(15);     
doc.setFontType("bold");
doc.text(20, 175, 'Altura de conducto : '+alturaObra.toFixed(4)+' metros.'); 
doc.setTextColor(255, 0, 0);
doc.setFontSize(18);    
doc.setFontType("bold");
if(alturaObra<=0.3){     
    doc.text(20, 190, 'Altura de conducto sugerida : 0.3 metros.'); 
}
else if(alturaObra<=0.5){
    doc.text(20, 190, 'Altura de conducto sugerida : 0.5 metros.'); 
}         
else if(alturaObra<=0.7){
    doc.text(20, 190, 'Altura de conducto sugerida : 0.7 metros.'); 
}                           
else if(alturaObra<=1){
    doc.text(20, 190, 'Altura de conducto sugerida : 1 metro.'); 
}
else{
    doc.text(20, 190, 'Sobre 1 metro de altura.'); 
    doc.text(20, 197, 'Se solicita la posibilidad de construir un puente o badén. '); 
}    
//fecha y hora de la generacion del informe
var f = new Date();
var hora = f.getHours();
var minuto = f.getMinutes();
var segundo = f.getSeconds();
str_hora = new String(hora);

var dia=f.getDate();
var mes=(f.getMonth() +1);
var año=f.getFullYear();

if (str_hora.length == 1) {
    hora = '0' + hora;
}
str_minuto = new String(minuto);
if (str_minuto.length == 1) {
    minuto = '0' + minuto;
}
str_segundo = new String(segundo);
if (str_segundo.length == 1) {
    segundo = '0' + segundo;
}
str_dia = new String(dia);
if (str_dia.length == 1) {
    dia = '0' + dia;
}
str_mes = new String(mes);
if (str_mes.length == 1) {
    mes = '0' + mes;
}
str_año = new String(año);
if (str_año.length == 1) {
    año = '0' + año;
}
doc.setTextColor(0, 0, 0); 
doc.setFontSize(13);
doc.setFontType('normal');
doc.text(160, 45, 'Fecha: '+dia+'/'+mes+'/'+año);
doc.text(160, 50, 'Hora: '+hora+':'+minuto+':'+segundo);

//imagenes  , ecuacion idf   
var equation = null;
MathJax.Hub.queue.Push(function () {
    equation = MathJax.Hub.getAllJax("MathOutput")[0];
    render();
});

function render() {
//ecuacion idf en latex 
var text = "\\Huge {I=\\frac{"+var_k+"T^{"+var_m+"}}{D^{"+var_n+"}}}";
MathJax.Hub.queue.Push(['Text', equation, text]);
MathJax.Hub.queue.Push(showSource);
}
function showSource() {
    var glyphs = document.getElementById('MathJax_SVG_glyphs');         
    var span = document.getElementById(equation.root.inputID+'-Frame');
    var svg = span.firstChild;
    var svgString = '<' + '?xml version="1.0" encoding="UTF-8" standalone="no" ?' + '>\n';
    svgString += '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var i = 0; i < svg.attributes.length; i++) svgString += ' ' + svg.attributes[i].name + '="' + svg.attributes[i].value + '"';
        svgString += '>\n';
    svgString += glyphs.outerHTML;
    svgString += '\n';
    svgString += svg.innerHTML;
    svgString += '\n</svg>';   
    var blob = new Blob([svgString], {type: 'image/svg+xml'});
    var url = URL.createObjectURL(blob);
    var svg = svgString;
    if (svg)
        svg = svg.replace(/\r?\n|\r/g, '').trim();     
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvg(canvas, svg);
    var imgData3 = canvas.toDataURL('image/png');

    var img = new Image;
    img.onload = function() {
        doc.addImage(this, 150,12,54,18)
    };
    img.crossOrigin = "";  
    img.src="/dist/img/masisa_logo.jpg";

    var img2 = new Image;
    img2.onload = function() {
        doc.addImage(this, 20,7,24,24)           
    };
    img2.crossOrigin = "";  
    img2.src="/dist/img/logo_ctha.jpg";    

    $.ajax({
        type: "POST",
        url: "pngtojpg.php",
        data:  {"png": imgData3} ,
        success: function(dato)
        {
            var img3 = new Image;
            img3.onload = function() {
                doc.addImage(this, 140,86);
                doc.save('Calculo_altura_obra_'+dia + "_" + mes+ "_" + año+'.pdf');

                $.ajax({
                    type: "POST",
                    url: "deletejpg.php",
                    data:  {"jpg": dato} ,
                    success: function(dato2)
                    {
                    }
                });  
            };
            img3.crossOrigin = "";  
            var jpg ='/images/'+dato;
            img3.src=jpg;
        }
    });  
    setTimeout(function(){
        location.href="index.html";
    }, 1500);       
}
}