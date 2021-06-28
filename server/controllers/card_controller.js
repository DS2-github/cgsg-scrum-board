const cardModel = require('../models/card_model');

class cardController {
    async add(card) {
        await card.save();
        console.log(card);
    }

    async update(id, new_content, new_status) {
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

    async restore() {
        return await cardModel.find();
    }
    async setStatus(id, new_status) {
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