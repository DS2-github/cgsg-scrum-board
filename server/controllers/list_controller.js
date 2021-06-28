const listModel = require('../models/list_model');
const cardController = require('./card_controller');

class listController {
    async addList(list) {
        await list.save();
        console.log(list);
    }

    async renameList(id, new_title) {
        const list = await listModel.findOneAndUpdate({ id }, { title: new_title });

        if (!list) { throw new Error(`DB Err in renaming list(id: ${id})`); }

        return {
            id: id,
            title: list.title,
            cards: list.cards,
            status: list.status
        };
    }

    async setStatusCard(id, new_status) {
        const list = await listModel.findOneAndUpdate({ id }, { status: new_status });

        if (!list) { throw new Error(`DB Err in set status list(id: ${id})`); }

        return {
            id: id,
            title: list.title,
            cards: list.cards,
            status: list.status
        };
    }

    async delAllCardsOfList(id) {
        const list = await listModel.findOne({ id });

        if (!list) { throw new Error(`DB Err in set status list(id: ${id})`); }

        for (el of list.cards)
            cardController.setStatusCard(el, 'deleted');

        return {
            id: id,
            title: list.title,
            cards: [],
            status: list.status
        };
    }
}

module.exports = new listController();
