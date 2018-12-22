module.exports = {


  friendlyName: 'operation',


  description: 'database operation',


  inputs: {
    sql: {
      type: 'string'
    },
    values:{
      type:['ref']
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // get connection from database connect pool
    CONNECT_POOL.getConnection((e, client) => {
      if (e) throw new Error('access connection from connection pool occur error ! error:' + e.message + '~~');
      //execute  sql
      client.query(inputs.sql, inputs.values || [], (err, result) => {
        client.release();
        if (err) {
          console.log(`[SQL ERROR]:${err.message}~~`);
          return exits.success({
            done: false,
            result: err
          });
        }
        return exits.success({
          done: true,
          result: result
        });
      })
    })
  }


};
