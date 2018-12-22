module.exports = {


  friendlyName: 'Like moment',


  description: '',


  inputs: {
    target_id: {
      type: 'number',
      required: true
    },
    target_type: {
      type: 'number',
      required: true
    },
    dis_or_like: {
      type: 'number',
      required: true
    }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let open_id = sails.session.open_id;
    if (!open_id) { return exits.success(await sails.helpers.reply(null, 13042)) }
    console.log(open_id);
    let pre_sql = `INSERT INTO tb_reg_mp_dis_or_like ( open_id, target_id, target_type, dis_or_like ) VALUES
      ( '${open_id}', '${inputs.target_id}', '${inputs.target_type}', '${inputs.dis_or_like}' ) ON DUPLICATE KEY UPDATE dis_or_like = '${inputs.dis_or_like}'`
    await sails.helpers.query(pre_sql);
    return exits.reply();

  }


};
