const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8000;
const cardModel = require('./models/card_model');
const cardController = require('./controllers/card_contorller');
/*
app.set('socketio', io);
const router = require('./router');
app.use('/router', router);
*/

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    const db = mongoose.connection;

    socket.on('addCard', (data_json) => {
        const { id, content, author, } = JSON.parse(data_json);
        const card = new cardModel({ id: id, content: content, author: author, status: '' });
        const emptyCard = new cardModel({ id: id, content: '', author: '', status: 'loading' });

        socket.emit('emptyCard', JSON.stringify(emptyCard));
        cardController.addCard(card)
            .then(doc => {
                socket.emit('getCard', JSON.stringify(card));
                console.log(doc);
            })
            .catch(err => {
                //Should we send emit about failure to stop loading status???
                console.error(err);
            });
    })
    socket.on('editCard', (data_json) => {
        const { id, content } = JSON.parse(data_json);

        cardController.updateCard(id, content, 'edited')
            .then(card => {
                console.log(card);
                socket.emit('getCard', JSON.stringify(card));
            })
            .catch(err => { console.error(err) });
    })
    socket.on('delCard', (data_json) => {
        const { id } = JSON.parse(data_json);

        cardController.updateCard(id, '', 'deleted')
            .then(card => {
                console.log(`Deleted: ${card}`);
                socket.emit('delCard', JSON.stringify(card));
            })
            .catch(err => { console.error(err) });
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const mongoose = require('mongoose');
const { json } = require('body-parser');
const connectionString = 'mongodb+srv://pmpknu:rCBLj1lgagRTmkNe@scrumcluster0.4l53c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function StartServer() {
    try {
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, });
        //const db = mongoose.createConnection(connectionString, { useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', _ => {
            console.log('Database connected'/*:', connectionString*/);
        });

        server.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });
    } catch (err) {
        console.log(`Server start error: ${err}`);
    }
}

StartServer();