const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name, password } = request.body;

        const accountName = await connection('accounts').where('name', name)
        .select('password')
        .first();

        const accountId = await connection('accounts').where('name', name)
        .select('id')
        .first(); 
        
        const accountType = await connection('accounts').where('name', name)
        .select('type')
        .first(); 

        if(!accountName) {
            return response.status(400).json({ error: "No account exists with this name" });


        }

        if(accountName !== password) {
            return response.status(400).json({ error: "Password is wrong" });

        }

        
        return response.json({ accountId, accountType });
    }



}