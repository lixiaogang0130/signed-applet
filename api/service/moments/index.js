'use strict';
const ModuleSql = {
  //index sql statement
  indexList:`SELECT
      dynamic.id AS dynamicId,
      dynamic.activity_id AS activityId,
      dynamic.images AS dynamicImages,
      dynamic.content AS dynamicContent,
      dynamic.create_time AS createTime,
      dynamic.update_time AS updateTime,
      relation.user_id as userId,
      COUNT(distinct stat.id) AS praiseCnt,
      COUNT(distinct comm.id) AS commentCnt,
      u.nickname as userName,
      u.faceimg as userIcon
    FROM
      tp_reg_mp_dynamic dynamic
    INNER JOIN tp_reg_mp_user_dynamic relation ON relation.dynamic_id = dynamic.id
    LEFT JOIN tp_reg_mp_dis_or_like stat ON stat.target_id = dynamic.id
    AND stat.dis_or_like = 1
    LEFT JOIN tp_reg_mp_comment comm ON comm.target_id = dynamic.id AND comm.target_type=1 AND comm.flag = 0
    left join tp_nbv_userinfo u on u.uid = relation.user_id
    WHERE
      dynamic.flag = 0 GROUP BY dynamic.id ORDER BY praiseCnt desc,dynamic.id desc`,
  //scroll list sql statement
  scrollList:`SELECT
    dynamic.id AS dynamicId,
    dynamic.activity_id AS activityId,
    dynamic.images AS dynamicImages,
    dynamic.content AS dynamicContent,
    dynamic.create_time AS createTime,
    dynamic.update_time AS updateTime,
    relation.user_id as userId,
    u.nickname as userName,
    u.faceimg as userIcon,
    COUNT(distinct stat.id) AS praiseCnt,
    COUNT(distinct comm.id) AS commentCnt
  FROM
    tp_reg_mp_dynamic dynamic
  INNER JOIN tp_reg_mp_user_dynamic relation ON relation.dynamic_id = dynamic.id
  LEFT JOIN tp_reg_mp_dis_or_like stat ON stat.target_id = dynamic.id
  LEFT JOIN tp_reg_mp_comment comm ON comm.target_id = dynamic.id AND comm.target_type=1 AND comm.flag = 0
  AND stat.dis_or_like = 1
  left join tp_nbv_userinfo u on u.uid = relation.user_id  `,

  //add dynamic statement
  insertIntoDynamic:`insert into tp_reg_mp_dynamic(activity_id,images,content) values(?,?,?)`,
  deleteFromDynamic:`delete from tp_reg_mp_dynamic where id=?`,
  insertIntoRelation:`insert into tp_reg_mp_user_dynamic(dynamic_id,user_id) values(?,?)`,
  singleById:`SELECT
      dynamic.id AS dynamicId,
      dynamic.activity_id AS activityId,
      dynamic.images AS dynamicImages,
      dynamic.content AS dynamicContent,
      dynamic.create_time AS createTime,
      dynamic.update_time AS updateTime,
      relation.user_id as userId,
      u.nickname as userName,
      u.faceimg as userIcon,
      COUNT(distinct stat.id) AS praiseCnt
    FROM
      tp_reg_mp_dynamic dynamic
    INNER JOIN tp_reg_mp_user_dynamic relation ON relation.dynamic_id = dynamic.id
    LEFT JOIN tp_reg_mp_dis_or_like stat ON stat.target_id = dynamic.id
    AND stat.dis_or_like = 1
    left join tp_nbv_userinfo u on u.uid = relation.user_id
    WHERE
      dynamic.flag = 0 AND dynamic.id = ?`,
  deleteByDynamicId:`update tp_reg_mp_dynamic set flag = 1 where id = ? ;`

}

const ConditionEnum ={
  scrollBefore:` WHERE
  dynamic.flag = 0 AND dynamic.id >=? AND  dynamic.activity_id =? GROUP BY dynamic.id ORDER BY dynamic.id desc `,
  scrollAfter:` WHERE
  dynamic.flag = 0 AND dynamic.id < ? AND  dynamic.activity_id =? GROUP BY dynamic.id ORDER BY dynamic.id desc `,
  getByActivityId:`WHERE
  dynamic.flag = 0 AND dynamic.activity_id =? GROUP BY dynamic.id ORDER BY dynamic.id desc`
}

const Methods = {
  /**
   * search index dynamics
   * @param {number} pageIndex page index
   * @param {number} pageSize size per page
  */
  indexList:async function(pageIndex,pageSize) {
    let sql = ModuleSql.indexList;
    sql += ' limit ?,?';
    let values = [(pageIndex-1)*pageSize,pageSize];
    let result = await HELPER.query(sql,values);
    if(result.done){
      return result.result;
    }
    throw new Error('[ERROE STATEMENT]::access data failed! please check your SQL statement')
  },

  scrollList:async function(pageIndex,pageSize,dynamicId,activityId,type='before'){
    let sql = await HELPER.maker({
      model:ModuleSql,
      type:'scrollList'
    },{
      model:ConditionEnum,
      type:type==='before'?'scrollBefore':'scrollAfter'
    });
    sql +=' limit ?,?';
    let values = [dynamicId,activityId,(pageIndex-1)*pageSize,pageSize];
    let result = await HELPER.query(sql,values);
    if(result.done){
      return result.result;
    }
    throw new Error('[ERROE STATEMENT]::access data failed! please check your SQL statement')

  },
  /**
   * add dynamic to activity
   * @param {object} options received params
   */
  addDynamic:async function(options){
    let transaction = {
      extra:'insertId',
      0:{
        sql:ModuleSql.insertIntoDynamic,
        values:[options.activityId,options.dynamicImages,options.content]
      },
      1:{
        sql:ModuleSql.insertIntoRelation,
        values:[options.userId]
      }
    }
    let reply = await HELPER.transaction(transaction);
    return {operation:reply.done};
  },
  accessSingleByID:async function(typeId){
    let sql = ModuleSql.singleById;
    let {result:[reply={}]}= await HELPER.query(sql,[typeId]);
    return reply;
  },
  deleteByDynamicId:async function(dynamicId){
    let sql = ModuleSql.deleteByDynamicId;
    let reply = await HELPER.query(sql,[dynamicId]);
    if(reply.done){
      if(reply.result.affectedRows>0){
        return {operation:true};
      }
    }
    return {operation:false};
  },
  getListByActivityId:async function(activityId,pageIndex,pageSize){
    let sql = await HELPER.maker({
      model:ModuleSql,
      type:'scrollList'
    },{
      model:ConditionEnum,
      type:'getByActivityId'
    });
    if(pageIndex&&pageSize){
      sql += ' limit ?,?';
    }else{
      sql += ' limit 1';
    }
    let reply = await HELPER.query(sql,[activityId,(pageIndex-1)*pageSize,pageSize]);
    if(reply.done){
      if(pageIndex&&pageSize){
        return reply.result;
      }
      return reply.result.length>0?reply.result[0]:{}
    }
    return [];
  },
}

module.exports = Methods;
