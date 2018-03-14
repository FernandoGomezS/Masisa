 function changeClassDiv(id,num){
            var NAME = document.getElementById(id);

            if(num==1 ){
                NAME.className = "input-group has-success"; 
                $("#spanDuracion").css("display", "none"); 
            }
            else  if(num==2){
                NAME.className = "input-group has-error";
                $("#spanDuracion").css("display", "none");
            }
            else if(num==3){
                NAME.className = "form-group has-success";
            }
            else if(num==4){
                NAME.className = "form-group has-error";
            }
            else{
                NAME.className = "input-group has-warning";
                $("#spanDuracion").css("display", "block");
            }
        } 

        $(document).ready(function() {
            $.ajax({
                type: "POST",
                url: "escorrentiaInfo.php",
                success: function(dato)
                {
                    $('#selectEscorrentia1').html(dato).fadeIn();
                }
            }); 
        });

        $(document).ready(function() {

            $('input[type=radio][name=optionsRadiosUno]').change(function() {
                $('#coeficienteEscorrentia').val('');
                validarPaso2_1();
                if (this.value == 'option1') {                
                    $("#valorTablaDiv").css("display", "block");
                    $("#valorManualDiv").css("display", "block");
                }
                else if (this.value == 'option2') {
                    $("#valorManualDiv").css("display", "block");
                    $("#valorTablaDiv").css("display", "none");
                }            
            });

            $('input[type=radio][name=optionsRadiosDos]').change(function() { 
                $('#coeficienteRugosidad').val('');  
                validarPaso3();       
                if (this.value == 'option3') {
                    console.log("entro");
                    $("#valorTabla2Div").css("display", "block");
                    $("#valorManual2Div").css("display", "block");
                }
                else if (this.value == 'option4') {
                    $("#valorManual2Div").css("display", "block");
                    $("#valorTabla2Div").css("display", "none");
                }
            });
        });

        $(document).ready(function() {
            $.ajax({
                type: "POST",
                url: "rugosidadInfo.php",
                success: function(dato)
                {
                    $('#selectRugosidad1').html(dato).fadeIn();
                }
            });  
        });
        function activaTab(tab){

            if(tab==4 ){
                if(caudal!="" && caudal!=0){
                    $('.nav-tabs a[href="#tab' + tab + '"]').tab('show'); 
                    validarPaso3();
                }
            }
            if(tab==3 ){            
                $('.nav-tabs a[href="#tab' + tab + '"]').tab('show'); 
                validarPaso2_1();           
            }
            else{
                $('.nav-tabs a[href="#tab' + tab + '"]').tab('show'); 
                validarPaso2(); 
            }
        }

        function cargarAño(valor){
            if(valor==0){
                document.getElementById("selectEscorrentia2").disabled=true;
                document.getElementById("selectEscorrentia1").disabled=true;       
                cargarEscorrentia(0);
                changeClassDiv('selectRetornoDiv',4);
                changeClassDiv('selectEscorrentia1Div',4);
                validarPaso2(); 
            }
            else{      
                changeClassDiv('selectRetornoDiv',3);
                document.getElementById("selectEscorrentia1").disabled=false;              
                cargarSelect1(-1);  
                validarPaso2();  
            }
        }
        function cargarEscorrentia(valor){
            if(valor!=0){    
                changeClassDiv('selectEscorrentia2Div',3);
                changeClassDiv('coeficienteEscorrentiaDiv',3);    
            }
            else{       
                changeClassDiv('selectEscorrentia2Div',4); 
                changeClassDiv('coeficienteEscorrentiaDiv',4) 
            }
            $('#coeficienteEscorrentia').val(valor);
            validarPaso2_1(); 
        }
        function cargarRugosidad(valor){  
            if(valor!=0){    
                changeClassDiv('selectRugosidad2Div',3);
                changeClassDiv('coeficienteRugosidadDiv',3);
            }
            else{       
                changeClassDiv('selectRugosidad2Div',4); 
                changeClassDiv('coeficienteRugosidadDiv',4)
            }  
            $('#coeficienteRugosidad').val(valor);    
            validarPaso3();    
        }

        function cargarSelect1(valor){
            if(valor==0)
            {
                changeClassDiv('selectEscorrentia1Div',4); 
                document.getElementById("selectEscorrentia2").disabled=true;
                document.getElementById("selectEscorrentia2").value=0;
                cargarEscorrentia(0);

            }
            else{
                changeClassDiv('selectEscorrentia1Div',3);  
                var v1 = document.getElementById("selectEscorrentia1");
                var valor1 = v1.options[v1.selectedIndex].value;

                var v2 = document.getElementById("selectRetorno");
                var valor2 = v2.options[v2.selectedIndex].value; 

                var v3 = document.getElementById("selectEscorrentia2");
                var valor3 = v3.selectedIndex;     
                $.ajax({
                    type: "GET",
                    url: "escorrentiaInfo2.php",
                    data:  {"tipo_superficie": valor1, "retorno": valor2} ,
                    success: function(response)
                    {
                        $('#selectEscorrentia2').html(response).fadeIn();
                        var v4 = document.getElementById("selectEscorrentia2");
                        var valor4 = v4.options[valor3].value;
                        document.getElementById("selectEscorrentia2").value=valor4;
                        if(valor4!=0){          
                            cargarEscorrentia(valor4); 
                        }
                    }
                });

                if(valor1!=0){    
                    document.getElementById("selectEscorrentia2").disabled=false;
                }
                else{
                    changeClassDiv('selectEscorrentia1Div',4); 
                }
            }
        }

        function cargarSelect2()
        {
            var v1 = document.getElementById("selectRugosidad1");
            var valor1 = v1.options[v1.selectedIndex].value;

            var  v2 = document.getElementById("selectRugosidadValor");
            var  valor2 = v2.options[v2.selectedIndex].value;

            if(valor2==0 )
            {
                changeClassDiv('selectRugosidadValorDiv',4); 
                changeClassDiv('selectRugosidad2Div',4);  
                document.getElementById("selectRugosidad2").disabled=true;
            }
            else{
                changeClassDiv('selectRugosidadValorDiv',3); 
            }
            if(valor1==0){
                changeClassDiv('selectRugosidad1Div',4);
                changeClassDiv('selectRugosidad2Div',4);
                document.getElementById("selectRugosidad2").disabled=true;
            }
            else{
                changeClassDiv('selectRugosidad1Div',3);
            }
            if(valor1!=0 && valor2!=0){ 
                $.ajax({
                    type: "GET",
                    url: "rugosidadInfo2.php",
                    data:  {"tipo_material": valor1, "tipo_valor": valor2} ,
                    success: function(response)
                    {
                        $('#selectRugosidad2').html(response).fadeIn();
                    }
                });
                document.getElementById("selectRugosidad2").options.length=0;
                document.getElementById("selectRugosidad2").disabled=false;
            }
        }

        function buscarSelect2(value)
        {
            var v1 = document.getElementById("selectEscorrentia1");
            var text1 = v1.options[v1.selectedIndex].text;
            var v2 = document.getElementById("selectEscorrentia2");
            var text2= v2.options[v2.selectedIndex].text;

            $.getJSON("escorrentiaInfo.php", { tipo_superficie  :text1, tipo_pendiente: text1}, success = function(data2){
            }).fail( function(d, textStatus, error) {
                console.error("getJSON failed, status: " + textStatus + ", error: "+error );
            });
        }

        function editarEscorentia(){
            var isChecked = $('#editarEscorentiaId').is(':checked');       
            if(isChecked)
                document.getElementById("coeficienteEscorrentia").disabled=false;
            else
                document.getElementById("coeficienteEscorrentia").disabled=true;
        }
        function editarRugosidad(){
            var isChecked = $('#editarRugosidad').is(':checked');       
            if(isChecked)
                document.getElementById("coeficienteRugosidad").disabled=false;
            else
                document.getElementById("coeficienteRugosidad").disabled=true;
        }


        function validaInput(e){
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla==8){
                return true;
            }
            patron =/[0-9-.]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
        }
        var caudal=0;
        var superficieCuenca=0;
        var DuracionIDF=0;
        var coeficienteEscorrentia=0;
        var retorno=0;

        function validarPaso2(){
            superficieCuenca=document.getElementById("superficieCuenca").value;
            DuracionIDF=document.getElementById("DuracionIDF").value;
            coeficienteEscorrentia=document.getElementById("coeficienteEscorrentia").value;

            var v2 = document.getElementById("selectRetorno");
            retorno = v2.options[v2.selectedIndex].value;   


            if(superficieCuenca!='' && DuracionIDF!='' && retorno!=0 ){
                if(superficieCuenca!=0 && DuracionIDF!=0 && retorno!=0 ){    

                    document.getElementById('infoCaudal').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp; Datos Correctos</h4><p>Click en siguiente para continuar</p></div>";  
                    document.getElementById("btnTab2").disabled=false;                                     
                }  
                else if(superficieCuenca==0 || DuracionIDF==0 || retorno==0){
                    document.getElementById('infoCaudal').innerHTML = "<div class='callout callout-danger'><h4><i class='icon fa fa-ban'></i>&nbsp; Datos Incorrectos!</h4><p>Revisar los Campos ingresados</p>";
                    document.getElementById("btnTab2").disabled=true;

                }
            }
            else{
                document.getElementById('infoCaudal').innerHTML = "<div class='callout callout-info' ><h4><i class='icon fa fa-info'></i> &nbsp; Completar Todos los campos  para calcular el caudal. </h4></div>";
                document.getElementById("btnTab2").disabled=true;
            }
        }

        function validarPaso2_1(){
            superficieCuenca=document.getElementById("superficieCuenca").value;
            DuracionIDF=document.getElementById("DuracionIDF").value;
            coeficienteEscorrentia=document.getElementById("coeficienteEscorrentia").value;

            var v2 = document.getElementById("selectRetorno");
            retorno = v2.options[v2.selectedIndex].value;   


            if(superficieCuenca!="" && DuracionIDF!="" && coeficienteEscorrentia!="" && retorno!=0 ){
                if(superficieCuenca!=0 && DuracionIDF!=0 && coeficienteEscorrentia!=0 ){

                    var retorno1=retorno.replace(/^\D+/g, ""); 
                    var retorno2=Math.pow(retorno1,var_m); 
                    var DuracionIDF1=Math.pow(DuracionIDF,var_n);   
                    var intensidad=(var_k*retorno2)/DuracionIDF1;
                    caudal =(((superficieCuenca*intensidad*coeficienteEscorrentia)/3600)*1.3)/1000; 
                    var caudal1=caudal.toFixed(4);  
                    var math = document.getElementById("formulaIDF");               
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);

                    document.getElementById('infoCaudal2').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp; El Caudal es:</h4><p>"+caudal1+" <b>m³/s</b></p></div>";  
                    document.getElementById("btnTab2_1").disabled=false;                                     
                }
                else{
                    document.getElementById('infoCaudal2').innerHTML = "<div class='callout callout-danger'><h4><i class='icon fa fa-ban'></i>&nbsp; Datos Incorrectos!</h4><p>Revisar los Campos ingresados</p>";
                    document.getElementById("btnTab2_1").disabled=true;
                    caudal=0;
                }
            }
            else{
                document.getElementById('infoCaudal2').innerHTML = "<div class='callout callout-info' ><h4><i class='icon fa fa-info'></i> &nbsp; Completar Todos los campos  para calcular el caudal. </h4></div>";
                document.getElementById("btnTab2_1").disabled=true;
                caudal=0;
            }    
        }

        var coeficienteRugosidad=0;
        var pendienteConducto=0;
        var alturaObra=0;
        function validarPaso3(){
            coeficienteRugosidad=document.getElementById("coeficienteRugosidad").value;
            pendienteConducto=document.getElementById("pendienteConducto").value;   

            if(coeficienteRugosidad!="" && pendienteConducto!="" ){
                if(coeficienteRugosidad!=0 && pendienteConducto!=0 ){

                    alturaObra=1.548*Math.pow(((caudal*coeficienteRugosidad)/Math.pow(pendienteConducto/100, 0.5)),3/8);

                    document.getElementById("btnDescargar").disabled=false;
                    if(alturaObra<=0.3){
                        document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp;Calculo de la Altura:</h4><p> 0,3 metros de altura. </p></div>";
                    }
                    else if(alturaObra<=0.5){
                        document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp;Calculo de la Altura:</h4><p> 0,5 metros de altura. </p></div>"; 
                    }         
                    else if(alturaObra<=0.7){
                        document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp;Calculo de la Altura:</h4><p> 0,7 metros de altura. </p></div>"; 
                    }                           
                    else if(alturaObra<=1){
                        document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp;Calculo de la Altura:</h4><p> 1 metro de altura. </p></div>"; 
                    }
                    else{
                        document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-success'><h4><i class='icon fa fa-check'></i>&nbsp;Calculo de la Altura:</h4><p> Sobre 1 metros de altura. Se solicita la posibilidad de construir un puente o badén </p></div>";
                    }
                }
                else{
                    document.getElementById('infoRugosidad').innerHTML = "<div class='callout callout-danger'><h4><i class='icon fa fa-ban'></i>&nbsp; Datos Incorrectos!</h4><p>Revisar los Campos ingresados</p>";  
                    document.getElementById("btnDescargar").disabled=true;          
                }
            }
            else{ 
                document.getElementById('infoRugosidad').innerHTML =  "<div class='callout callout-info' ><h4><i class='icon fa fa-info'></i> &nbsp; Completar Todos los campos  para calcular la altura de obra. </h4></div>";
                document.getElementById("btnDescargar").disabled=true;  
            }    
        }

        $("#coeficienteEscorrentia").on("input", function() {
            validarPaso2_1();
            var coeficienteEscorrentia = document.getElementById('coeficienteEscorrentia').value;
            if(coeficienteEscorrentia>1 || coeficienteEscorrentia<0){

                document.getElementById('coeficienteEscorrentia').value= '0.';        
                changeClassDiv('coeficienteEscorrentiaDiv',4);
                validarPaso2_1();
            }
            else if(coeficienteEscorrentia==0){
                changeClassDiv('coeficienteEscorrentiaDiv',4);
            }
            else{
                changeClassDiv('coeficienteEscorrentiaDiv',3);

            }
        });

        $("#DuracionIDF").on("input", function() {
            validarPaso2(); 
            var DuracionIDF = document.getElementById('DuracionIDF').value;     
            if(DuracionIDF>1440 || DuracionIDF<=0){  
                if(DuracionIDF!=''){      
                    document.getElementById('DuracionIDF').value= 0;
                }        
                changeClassDiv('DuracionIDFDiv',2);
            }
            else{
                if(DuracionIDF<15){
                    changeClassDiv('DuracionIDFDiv',6);
                }
                else{
                    changeClassDiv('DuracionIDFDiv',1);
                }}

            });

        $("#superficieCuenca").on("input", function() {
            var superficieCuenca = document.getElementById('superficieCuenca').value;    
            validarPaso2();  
            if(superficieCuenca<=0){
                if(superficieCuenca!=''){       
                    document.getElementById('superficieCuenca').value= 0;
                }
                changeClassDiv('superficieCuencaDiv',2);
            }
            else{
                changeClassDiv('superficieCuencaDiv',1);
            }

        });

        $("#pendienteConducto").on("input", function() {
            validarPaso3(); 
            var pendiente = document.getElementById('pendienteConducto').value;     
            if(pendiente>100 || pendiente<0){        
                document.getElementById('pendienteConducto').value= 0;
                changeClassDiv('pendienteConductoDiv',2);
            } 
            else if(pendiente==0){
                changeClassDiv('pendienteConductoDiv',2);
            } 
            else{
                changeClassDiv('pendienteConductoDiv',1);
            }
        });

        $("#coeficienteRugosidad").on("input", function() {
            validarPaso3();
            var coeficienteRugosidad = document.getElementById('coeficienteRugosidad').value;
            if(coeficienteRugosidad>1 || coeficienteRugosidad<0){
                document.getElementById('coeficienteRugosidad').value= '0.';        
                changeClassDiv('coeficienteRugosidadDiv',4);
            }
            else if(coeficienteRugosidad==0){
                changeClassDiv('coeficienteRugosidadDiv',4);
            }
            else{
                changeClassDiv('coeficienteRugosidadDiv',3);
            }
        });