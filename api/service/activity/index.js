'use strict';

const ModuleSql = {
  indexBanner: `SELECT
  activity.id as activityId,
  activity.poster as coverUrl,
  activity.title as activityName,
  activity.act_starttime as activityStart,
  activity.act_endtime as activityEnd
  FROM tp_nbv_yc_hd_publish activity
  WHERE activity.state = 2 AND activity.act_endtime > NOW()
  ORDER BY activity.act_starttime DESC limit 3`,
  select:`SELECT
  activity.id as activityId,
  activity.poster as coverUrl,
  activity.title as activityName,
  activity.act_starttime as activityStart,
  activity.act_endtime as activityEnd,
  activity.act_addr as activityAddress,
  activity.director as activityOfficer,
  activity.director_tel as activityOfficerContact,
  activity.description as activityDesc,
  activity.act_total as limitCnt,
  activity.cost as needPay,
  activity.tel as activityContact,
  activity.share_desc as activityShareDesc`
}
const ConditionEnum = {
  list:` FROM tp_nbv_yc_hd_publish activity
  WHERE activity.state = 2 AND activity.act_endtime > NOW()
  ORDER BY activity.act_starttime DESC limit ?,?`,
  singleById:` FROM tp_nbv_yc_hd_publish activity
  WHERE activity.id = ? `,
  recently:` FROM tp_nbv_yc_hd_publish activity INNER JOIN tp_reg_mp_sign_statics statics
  ON statics.activity_id = activity.id AND statics.user_id = ?
  ORDER BY statics.last_sign_time DESC limit 1`,
  default: ''
}





const Methods = {
  //single activity by code
  getActivityById: async function (options) {
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'select'
    }, {
      model: ConditionEnum,
      type: 'singleById'
    });
    let reply = await HELPER.query(select,options.values);
    if(reply.done){
      return {done:true,data:reply.result[0]||{}}
    }
    return {done:false,data:reply.result,code:10004}
  },
  //access scroll images of activity
  getIndexBanner: async function () {
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'indexBanner'
    }, {
      model: ConditionEnum,
      type: 'default'
    });
    let reply = await HELPER.query(select);
    if(reply.done){
      return {done:true,data:reply.result}
    }
    return {done:false,data:reply.result,code:10002}
  },
  //activity list
  getActivityList:async function(options){
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'select'
    }, {
      model: ConditionEnum,
      type: 'list'
    });
    let reply = await HELPER.query(select,options.values);
    if(reply.done){
      return {done:true,data:reply.result}
    }
    return {done:false,data:reply.result,code:10003}
  },
  //access signed recently activity
  getRecentlySignedActivity:async function(options){
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'select'
    }, {
      model: ConditionEnum,
      type: 'recently'
    });
    let reply = await HELPER.query(select,options.values);
    if(reply.done){
      return {done:true,data:reply.result[0]}
    }
    return {done:false,data:reply.result,code:10006}

  }
}


module.exports = {
  execute: async function (name, params) {
    let reply = await HELPER.apply(Methods, name, params);
    return reply;
  }
}
