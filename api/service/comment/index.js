const ModuleSql = {
  list:`SELECT
    comm.*,COUNT(dus.id) as praiseCnt
  FROM
    tp_reg_mp_comment comm
  LEFT JOIN tp_reg_mp_dis_or_like dus
  ON dus.target_type = 2
  AND dus.dis_or_like = 1
  AND dus.target_id = comm.id
  WHERE
    comm.flag = 0
  AND comm.target_id =?
  AND comm.target_type = ?
  GROUP BY comm.id
  ORDER BY
    comm.create_time DESC  `,
  insertComment:`INSERT INTO tp_reg_mp_comment(user_id,target_type,target_id,content) VALUES(?,?,?,?);`
}


const Methods = {

  commentList:async function (targetType,targetId,pageIndex,pageSize) {
    let statement = ModuleSql.list;
    let values = [targetId,targetType];
    if(pageIndex&&pageSize){
      statement += ' limit ?,?';
      let pages = [(pageIndex-1)*pageSize,pageSize];
      values = _.concat(values,pages);
    }
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return {done:true,data:reply.result};
    }else{
      return {done:false,code:10012,data:'service error,un correct statement~~'}
    }
    return reply.done?reply.result:[]
  },
  addComment:async function(user_id,target_type,target_id,content){
    let statement = ModuleSql.insertComment;
    let values = [user_id,target_type,target_id,content];
    let reply = await HELPER.query(statement,values);
    if(!reply.done){
      return {operation:false};
    }else{
      if(reply.result.insertId){
        return {operation:true};
      }
    }
    return {operation:false};
  }
}

module.exports = Methods;
