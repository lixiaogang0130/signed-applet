module.exports = {
  friendlyName:'apply',
  description:'apply methods you want to execute~~',
  inputs:{
    model:{
      type:'ref',
      required:true
    },
    name:{
      type:'string',
      required:true
    },
    params:{
      type:'ref',
      required:true
    }
  },
  exits:{},
  fn:async function(inputs,exits){
    let {model,name,params} = inputs;
    if(!_.keys(model).includes(name)){
      return exits.success({
        done: false,
        code: 10001,
        data: 'can not execute the methods defined in the service which match the params received~~'
      })
    }
    let reply = await model[name](params);
    return exits.success(reply);
  }
}
