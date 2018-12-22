/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  //applet we chat information
  appletId: 'wx1cdac7cac9f849fe',
  appletSecret: 'f12449ed177c1263ee88b4f65ee89618',
  //mysql database config
  databaseMysql: {
    host: 'rm-8vb3y0h87696l6gp3.mysql.zhangbei.rds.aliyuncs.com',
    user: 'dev',
    password: 'yoursclass_dev_2018',
    database: 'yourbay_test',
    charset: "utf8mb4_general_ci",
    port: 3306

  },
  //redis config
  redisConfig: {
    host: 'r-8vb9dbce37b2d484.redis.zhangbei.rds.aliyuncs.com',
    port: 6379,
    password: 'WNAI9cjts20JCjiU'
  },

  //public api we required
  weChatGetAppletOpenIdUri: `http://public-api.yoursclass.com/YBPublicApi-test/public/index.php/ybwx/openid/getLiteAppOpenIdFromCode`,
  platformAccountInfoUri: `http://public-api.yoursclass.com/YBPublicApi-test/public/index.php/ybaccount/account/getUserInfoByLoginToken`,
  //we chat uri we required
  binToken: `https://api.weixin.qq.com/cgi-bin/token`,
  appletCodeUri: `https://api.weixin.qq.com/wxa/getwxacodeunlimit`,
  //the key of web token
  credentialKey: `we12need43verify`,

}
