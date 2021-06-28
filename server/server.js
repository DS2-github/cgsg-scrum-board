const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8000;
const cardModel = require('./models/card_model');
const cardController = require('./controllers/card_controller');
const listModel = require('./models/list_model');
const listController = require('./controllers/list_controller');

/*
app.set('socketio', io);
const router = require('./router');
app.use('/router', router);
*/

///CLIENT IS COMING!!!
io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    const db = mongoose.connection;

    ///CARDS
    cardController.restoreCards()
        .then(cards => {
            console.log(cards);
            socket.emit('restoreCards', cards);
        })
        .catch(err => { console.error(err) });

    socket.on('addCard', (data) => {
        const card = new cardModel({ id: data.id, content: data.content, author: data.author, status: data.status, colId: data.colId });
        const emptyCard = new cardModel({ id: data.id, colId: data.colId, content: '', author: data.author, status: 'loading' });

        socket.emit('emptyCard', emptyCard);
        cardController.addCard(card)
            .then(doc => {
                io.emit('addCard', card);
                console.log(doc);
            })
            .catch(err => {
                //Should we send emit about failure to stop loading status???
                console.error(err);
            });
    });
    socket.on('editCard', (data) => {
        cardController.updateCard(data.id, data.content, 'edited')
            .then(card => {
                console.log(card);
                io.emit('editCard', card);
            })
            .catch(err => { console.error(err) });
    });
    socket.on('delCard', (data) => {
        cardController.setStatusCard(data.id, 'deleted')
            .then(card => {
                console.log(`Deleted: ${card}`);
                io.emit('delCard', card);
            })
            .catch(err => { console.error(err) });
    });

    ///LISTS
    socket.on('addList', (data) => {
        const list = new listModel({ id: data.id, title: data.title, cards: data.cards, status: data.status, });

        listController.addList(list)
            .then(doc => {
                io.emit('addList', list);
                console.log(doc);
            })
            .catch(err => {
                //Should we send emit about failure to stop loading status???
                console.error(err);
            });
    });
    socket.on('renameList', (data) => {
        listController.renameList(data.id, data.title)
            .then(list => {
                console.log(list);
                io.emit('renameList', list);
            })
            .catch(err => { console.error(err) });
    });
    socket.on('delList', (data) => {
        listController.setStatusCard(data.id, 'deleted')
            .then(list => {
                console.log(`Deleted: ${list}`);
                io.emit('delList', list);
            })
            .catch(err => { console.error(err) });
    });
    socket.on('delAllCardsOfList', (data) => {
        listController.delAllCardsOfList(data.id, 'deleted')
            .then(list => {
                console.log(`Deleted: ${list}`);
                io.emit('delAllCardsOfList', list);
            })
            .catch(err => { console.error(err) });
    });

    ///CLIENT GONE AWAY!!!
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