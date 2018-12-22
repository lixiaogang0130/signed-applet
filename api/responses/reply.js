'use strict';
const Mapping = {

  //所有以10开始的均为成功访问(STATUS)
  10000: 'success',
  10001: 'The params you send to the service maybe error,can not find the methods to execute~',
  10002: 'unable to access the scroll images of activity~~',
  10003: 'unable to access the activity list~~',
  10004: 'unable to access single activity~~',
  10005: 'unable to sign the activity cause service error~~',
  10006: 'unable to access recently signed activity~~',
  10007: 'unable to access the rank of signed~~',
  10008: 'upload file to third platform occur error~~',
  10009: 'unable to access applet openId~~',
  10010: 'unable to access platform account information~~',
  10011:'credential is illegal,failed to refresh~~',
  10012:'access comment list failed cause service statement error~~',
  //11000 Server error
  //所有以11开始的均为服务器端错误(FATAL)
  11000: '服务器错误',
  11001: 'database statement occur error~~',


  //12000 Database error
  //所有以12开始的均为数据库错误(FATAL)
  12000: '数据库错误',
  12001: 'database statement occur error~~',
  12002: '数据库更新失败',
  12003: '数据库插入失败',
  12004: '信息绑定失败,请稍后重试',

  //13000 Developer operation error
  //所有以13开始的均为开发者编写错误(WARNING)
  13000: '未知的方法名',
  13001: 'The method to upload file occur error~~',
  13002: 'The method to generate applet code occur error~~',
  13003: 'JSON格式错误',
  13004: '某个或某几个请求参数不能为空',
  13005: 'app_id已存在',
  13006: 'app_id不存在',
  13007: '请求数据不存在',
  13008: '时间格式错误',
  13009: 'unique_id不存在',
  13010: '分页值应为自然数且page_index>=1 && 1<=page_size<=50',
  13011: 'page_size或page_index应为数值型',
  13012: 'book_id或user_id填写错误',
  13013: '音频参数id不能为空',
  13014: 'device_id不能为空',
  13015: '播放记录应为数组且不能为空',
  13016: '音频参数id不能为空',
  13017: '图书查询条件为下列中的一个:ISBN/name/recommend_by/author_name/organization_id/series_id',
  13018: '机构参数id不能为空',
  13019: 'user_id不能为空',
  13020: 'app_id不能为空',
  13021: 'secret_string不能为空',
  13022: 'unique_id不能为空',
  13023: '非法的加密字符串',
  13024: '非法的JSON序列化',
  13025: 'secret_code不存在或已过期',
  13026: 'access_token不存在或已过期',
  13027: '不存在的专辑ID',
  13028: '音频历史记录各键及值必须存在且不能为空',
  13029: '签名验证失败',
  13030: '文件上传失败,请确认文件是否上传正确',
  13031: '无参数值或长度超过32位',
  13032: '缺少必要请求参数',
  13033: '用户手机或设备信息与当前信息不一致,请先换绑',
  13034: '该app_id未激活',
  13035: '该app_id已过期',
  13036: 'secret_string的app_id与明文参数app_id不一致',
  13037: 'MAC不合法',
  13038: '双方服务器时间差超过一分钟',
  13039: '无法根据手机号查询到用户',
  13040: '请输入手机号',
  13041: '无法通过app_id找到产品的购买/订单记录',
  13042: 'open_id为空,请重新打开小程序获取',

  //14000 User operation error
  //所有以14开始的均为用户操作错误(INFORMATIONAL)
  14000: '无访问权限',
  14001: '帐号密码不匹配',
  14002: '非法访问',
  14003: '重复提交',
  14004: '用户不存在',
  14005: '用户已存在',
  14006: '操作太频繁',
  14007: '手机号格式错误',
  14008: '邮箱格式错误',
  14009: '邮箱已存在',
  14010: '手机号已存在',
  14011: '密码错误',
  14012: '音频不存在',
  14013: '没有这个出版社',
  14014: '找不到这本书',
  14015: '暂无任何活动',
  14016: '找不到这个合辑',
  14017: '收费资源,请先购买',
  14018: '请先绑定用户信息',
  14019: '指定图书中不存在指定讲师的音频',
  //500
  99999:'Bad response ! server occur error'
}

module.exports = function reply(inputs={status:10000}) {
  let req = this.req;
  let res = this.res;
  // All done.
  let reply = {
    status: inputs.status === 10000 ? 1 : 2,
    message:inputs.status?(Mapping[inputs.status]?`${Mapping[inputs.status]}${inputs.status ===10000?'':('::server code is ' + inputs.status) }`:'UNKNOWN ERROR!'):''
  }
  if(inputs.data) {
    reply.data = inputs.data;
  }
  let endTime = new Date().getTime();
  let elapsedTime = endTime - req.startTime;
  if(inputs.status ===99999){
    reply.status = 0;
    console.log('[HANDLED ROUTER LOG::]'+Moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '->Requested :: ', req.method, req.url, 500, elapsedTime + ' ms');
    return res.status(500).json(reply);
  }
  console.log('[HANDLED ROUTER LOG::]'+Moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '->Requested :: ', req.method, req.url, 200, elapsedTime + ' ms');
  return res.status(200).json(reply);
}
