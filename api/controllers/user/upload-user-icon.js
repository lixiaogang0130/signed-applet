module.exports = {


  friendlyName: 'Upload user icon',


  description: '',


  inputs: {

    icon: { type: 'string', required: true }

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

    let pre_sql = `UPDATE tb_reg_mp_open_id_mapping SET user_icon = '${inputs.icon}' WHERE open_id = '${open_id}'`

    await sails.helpers.query(pre_sql);

    return exits.reply();

  }


};
