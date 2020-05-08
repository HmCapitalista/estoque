const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const stock = await connection('stock').select('*');

        return response.json(stock);


    },
    async create(request, response) {
        const { itemName, itemQuant } = request.body;

        const stock = await connection('stock').insert({
            itemName,
            itemQuant
        });

        if(!stock){
            return response.status(400).json({error: "erro no stock"});

        }

        const id = (await connection('stock').where('itemName', itemName)
        .select('id'))[0].id;

        return response.json(await connection('stock').where('id', id).select('*'));
        
    },
    async change(request, response) { 
        const stock = await connection('stock').where('id', request.body.id)
        .update(request.body.changeType, request.body.change);
        
        if(!stock) {
            return response.status(400).json({error: "error in update"});

        }

        return response.json(await connection('stock').where('id', request.body.id));
    },
    async delete(request, response) {
        let stock;

        try {
            stock = await connection('stock').where('id', request.params.id)
            .delete();

        } catch(err) {
            console.log(request.params.id);
            return response.status(400).json({error: "error in delete"});

        } 

        return response.json(stock);

    }

}