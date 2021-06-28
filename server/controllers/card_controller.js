const cardModel = require('../models/card_model');

class cardController {
    async addCard(card) {
        await card.save();
        console.log(card);
    }

    async updateCard(id, new_content, new_status) {
        const card = await cardModel.findOneAndUpdate({ id }, { content: new_content, status: new_status });

        if (!card) { throw new Error(`DB Err in updating card(id: ${id})`); }

        return {
            id: id,
            content: new_content,
            author: card.author,
            status: new_status,
            colId: card.colId
        };
    }

    /*
    return new Promise((resolve, reject) => {
            const card = cardModel.findOneAndUpdate({ id }, { content: new_content, status: new_status });
            if (!card) reject(`DB Err in updating card(id: ${id})`);
            resolve(card);
        })
            .then(card => {
                return {
                    id: id,
                    content: new_content,
                    author: card.author,
                    status: new_status,
                    colId: card.colId
                }
            })
            .catch(error => { throw new Error(error) });
    */

    async restoreCards() {
        const cards = await cardModel.find();

        return cards;
    }
    async setStatusCard(id, new_status) {
        const card = await cardModel.findOneAndUpdate({ id }, { status: new_status });

        if (!card) { throw new Error(`DB Err in set status card(id: ${id})`); }

        return {
            id: id,
            content: card.content,
            author: card.author,
            status: new_status,
            colId: card.colId
        };
    }
}

module.exports = new cardController();
/*(id) => {
    const user = await userModel.findById(id);
    if (!user) { throw new Error('Wrong id. User not found.'); }

    return {
        name: user.name,
        id: user._id
    }
}*/