const listModel = require('../models/list_model');
const cardController = require('./card_controller');

class listController {
    async add(list) {
        await list.save();
        console.log(list);
    }

    async rename(id, new_title) {
        const list = await listModel.findOneAndUpdate({ id }, { title: new_title });

        if (!list) { throw new Error(`DB Err in renaming list(id: ${id})`); }

        return {
            id: id,
            title: new_title,
            cards: list.cards,
            status: list.status
        };
    }

    async restore() {
        return await listModel.find();
    }

    async setStatus(id, new_status) {
        const list = await listModel.findOneAndUpdate({ id }, { status: new_status });

        if (!list) { throw new Error(`DB Err in set status list(id: ${id})`); }

        return {
            id: id,
            title: list.title,
            cards: list.cards,
            status: new_status
        };
    }

    async clear(id) {
        const list = await listModel.findOne({ id });

        if (!list) { throw new Error(`DB Err in set status list(id: ${id})`); }

        for (el of list.cards)
            cardController.setStatus(el, 'deleted');

        return {
            id: id,
            title: list.title,
            cards: [],
            status: list.status
        };
    }
}

module.exports = new listController();