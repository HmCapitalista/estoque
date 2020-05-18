const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const entries_and_exits = await connection('entries_and_exits');
        const last_date = (await connection('last_date').max('id').select('date'))[0];

        return response.json({entries_and_exits, last_date});

    },
    async create(request, response) {
        const { type, changes, itemThatChange, alterator, state } = request.body;
        let day, month, hour, minutes;
        day = new Date().getDate();
        month = 1+(new Date().getMonth());
        hour = new Date().getHours();
        minutes = new Date().getMinutes();

        if(parseInt(day) < 10) {day = '0' + day;}
        if(parseInt(month) < 10) {month = '0' + month;}
        if(parseInt(hour) < 10) {hour = '0' + hour;}
        if(parseInt(minutes) < 10) {minutes = '0' + minutes;}

        const date = day + '/' + month + '/' + (new Date().getFullYear());
        const time = hour + ':' + minutes;

        await connection('entries_and_exits').insert({
            date,
            time,
            type,
            changes,
            itemThatChange,
            alterator,
            state,

        });

        await connection('last_date').insert({ date });

        const changie = (await connection('entries_and_exits').max('id').select('*'))[0];
        const last_date = (await connection('last_date').max('id').select('date'))[0];
        
        return response.json({changie, last_date});
    }

}