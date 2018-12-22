module.exports = {


  friendlyName: 'Comment',


  description: 'Comment moment.',


  inputs: {
    targetType: { type: 'number', required: true },
    targetId: { type: 'number', required: true },
    content: { type: 'string', required: true }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let {targetType=1,targetId,content,userId=1} = inputs;

    let reply = await SERVICE.comment.addComment(userId,targetType,targetId,content);
    return exits.reply({status:10000,data:reply});
    let open_id = sails.session.open_id;
    if (!open_id) { return exits.success(await sails.helpers.reply(null, 13042)) }
    let pre_sql = `INSERT INTO tb_reg_mp_comment ( open_id, target_type, target_id, content )
    VALUES ( '${open_id}', '${inputs.target_type}', '${inputs.target_id}', '${inputs.content}' )`
    await sails.helpers.query(pre_sql);
    return exits.reply();

  }


};
