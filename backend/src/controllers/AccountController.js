const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { name, password } = request.body;

        const accountName = (await connection('accounts').where('name', name)
        .select('password')
        )[0].password;

        const accountId = (await connection('accounts').where('name', name)
        .select('id'))[0].id;
        
        const accountType = (await connection('accounts').where('name', name)
        .select('type'))[0].type;

        if(!accountName) {
           


        }

        if(accountName !== password) {
            return response.status(400).json({ error: "Password is wrong" });

        }

        
        return response.json({ accountId, accountType });
    },
    async create(request, response) {
        const { name, password, type } = request.body;

        const maxId = await connection('accounts').select('id');
        const id = maxId.length + 1;

        console.log(id);

        const account = await connection('accounts').insert({
            name,
            password,
            type,
            id
        });

        if(!maxId){
            return response.status(400).json({error: "erro no maxId"});

        }
        if(!id){
            return response.status(400).json({error: "erro no new id"});

        }
        if(!account){
            return response.status(400).json({error: "erro no account"});

        }

        return response.json(await connection('accounts').where('id', id).select('*'));

    },

}