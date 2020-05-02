const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const stock = await connection('stock').select('*');

        return response.json(stock);


    },
    async change(request, response) { 
        const stock = await connection('stock').where('itemId', request.body.itemId)
        .update(request.body.changeType, request.body.change);
        
        if(!stock) {
            return response.status(400).json({error: "error in update"});

        }

        return response.json(stock);
    }


}