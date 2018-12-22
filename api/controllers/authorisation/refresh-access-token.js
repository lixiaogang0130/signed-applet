module.exports = {
  friendlyName:'refreshToken',
  description:'refresh expired access credential you use to access the API~~',
  inputs:{
    accessToken:{
      type:'string',
      required:true
    }
  },
  exits:{
    reply:{
      responseType:'reply',
      description:'personal defined response to the client~~'
    }
  },
  fn:async function(inputs,exits){
    let accessToken = inputs.accessToken;
    if(accessToken){
      let reply = await SERVICE.authorisation.execute('refreshAccessToken',accessToken);
      if(reply.done){
        return exits.reply({status:10000,data:{accessToken:reply.data}})
      }
    }
    return exits.reply({status:10010,data:{operation:false}})
  }
}
