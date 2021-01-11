const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log(`Ticket: ${siguiente}`);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    
    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:'El escritorio no ha sido enviado'
            })
        }
        let atenderTicket=ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {         
            ultimos4: ticketControl.getUltimos4()
        });
    });
});

//al correor con nodemon, hay un rpoblema, estamos haciendo cambios en el
//archivo .json, y esto hace que se reinicie
//nodemon server/server -e js,html
//lo anterior hace que solo este pendiente de archivos js y html

// o nodemon server/server --ignore 'server/data/*.json'