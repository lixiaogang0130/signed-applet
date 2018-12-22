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
  appletId: '',
  appletSecret: '',
  //mysql database config
  databaseMysql: {
    host: '',
    user: '',
    password: '',
    database: '',
    charset: "",
    port: 3306

  },
  //redis config
  redisConfig: {
    host: '',
    port: 6379,
    password: ''
  },

  //public api we required
  weChatGetAppletOpenIdUri: ``,
  platformAccountInfoUri: ``,
  //we chat uri we required
  binToken: `https://api.weixin.qq.com/cgi-bin/token`,
  appletCodeUri: `https://api.weixin.qq.com/wxa/getwxacodeunlimit`,
  //the key of web token
  credentialKey: `we12need43verify`,

}
