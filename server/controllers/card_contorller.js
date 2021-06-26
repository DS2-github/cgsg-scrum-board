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
            content: card.content,
            author: card.author,
            status: card.status
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