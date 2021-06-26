const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8000;
const cardModel = require('./models/card_model');
/*
app.set('socketio', io);
const router = require('./router');
app.use('/router', router);
*/

async function addCard(card) {
    await card.save();
    console.log(card);
}

async function readCard(id) {
    const card = await cardModel.findOne({ id });

    if (!card) { throw new Error(`DB Err in reading (id: ${id}) collection`); }

    return {
        id: id,
        content: card.content,
        author: card.author,
    };
}

async function updateCard(id, new_content) {
    const card = await cardModel.findOneAndUpdate({ id }, { content: new_content });

    if (!card) { throw new Error(`DB Err in updating card(id: ${id})`); }

    return {
        id: id,
        content: card.content,
        author: card.author,
    };
}

async function deleteCard(id) {
    const card = await cardModel.findOneAndDelete({ id });

    if (!card) { throw new Error(`DB Err in deleting card(id: ${id})`); }

    return {
        id: id,
        content: card.content,
        author: card.author,
    };
}

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    const db = mongoose.connection;

    socket.on('AddCard', (data_json) => {
        const { id, content, author, } = JSON.parse(data_json);
        const card = new cardModel({ id: id, content: content, author: author, });

        addCard(card)
            .then(doc => { console.log(doc); })
            .catch(err => { console.error(err) });
    })
    socket.on('ReadCard', (data_json) => {
        const { id } = JSON.parse(data_json);
        //const user = 
        readCard(id)
            .then(card => {
                console.log(card);
                socket.emit('ReadCard', JSON.stringify(card));
            })
            .catch(err => { console.error(err) });
    })
    socket.on('UpdateCard', (data_json) => {
        const { id, content } = JSON.parse(data_json);

        updateCard(id, content)
            .then(card => {
                console.log(card);
                socket.emit('UpdateCard', JSON.stringify(card));
            })
            .catch(err => { console.error(err) });
    })
    socket.on('DeleteCard', (data_json) => {
        const { id } = JSON.parse(data_json);

        deleteCard(id)
            .then(card => {
                console.log(`Deleted: ${card}`);
                //socket.emit('DeleteCard', JSON.stringify(card));  //DS2 said we don't need it.
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