module.exports ={
  friendlyName:'transaction',
  description:'sql statement of transaction',

  inputs: {
    options:{
      type:'ref'
    }
  },


  exits: {

  },
  fn:async function(inputs,exits) {
    CONNECT_POOL.getConnection((connectionError,client)=>{
      if(connectionError) throw new Error('access connection from connection pool occur error ! error:' + connectionError.message + '~~');
      client.beginTransaction(startError=>{
        if(startError){
          client.release();
          throw new Error('start transaction occur error! error:'+ startError.message+'~~');
        }
        client.query(inputs.options[0].sql,inputs.options[0].values,(firstError,first)=>{
          if(firstError){
            client.rollback(function () {
              client.release();
              throw new Error('sql statement occur error on the first step~~'+firstError.message);
            });
          }
          if(inputs.options.extra){
            let temp = [first[inputs.options.extra]];
            inputs.options[1].values = _.concat(temp,inputs.options[1].values);
          }
          client.query(inputs.options[1].sql,inputs.options[1].values,(secondError,second)=>{
            if(secondError){
              client.rollback(function () {
                client.release();
                throw new Error('sql statement occur error on the second step~~'+secondError.message);
              });
            }
            else{
              client.commit(function (commitError, info) {
                if (commitError) {
                  client.rollback(function () {
                    client.release();
                  return exits.success({
                      done: false
                    });
                  });
                } else {
                  client.release();
                  return exits.success({
                    done: true
                  });
                }
              })
            }
          })
        })
      })
    })
  }

}
