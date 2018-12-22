module.exports = {


  friendlyName: 'sqlFactory',


  description: 'produce sql statement factory',


  inputs: {
    select:{
      type:'ref',
      required:true
    },
    condition:{
      type:'ref'
    },
    extra:{
      type:'ref'
    }
  },


  exits: {

  },


  fn: async function(inputs, exits) {
    let select = inputs.select.model[inputs.select.type];
    if(inputs.condition&&!IsEmptyObj(inputs.condition)){
      select += inputs.condition.model[inputs.condition.type];
    }
    if(inputs.extra&&!IsEmptyObj(inputs.extra)){
      select += inputs.extra.model[inputs.extra.type];
    }
    return exits.success(select)
  }
};
