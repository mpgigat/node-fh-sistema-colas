var socket =io();

//ojo que esto edge no lo soporta
var searchParams= new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio =searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio '+escritorio);
var label=$('small');

socket.on('connect',function(){
    console.log('conectado al servidor');
});

socket.on('disconnect',function(){
    console.log('desconectado al servidor');
});

$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){        
        if(resp.mensaje==='No hay tickets'){
            console.log('entre');
            label.text(resp.mensaje);
            alert(resp.mensaje);
            return;
        }
        label.text('Ticket '+resp.numero);
    });
});