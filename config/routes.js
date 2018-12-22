/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //-----------applet code-------------//
  'get /api/v1.0/applet/code':{action:'wechat/create-applet-code'},

  //------------TESTING----------------//

  //Test
  'GET    /api/v1.0/test/connection': { action: 'test/connect' },



  //------------authorisation----------//
  //Login
  'POST   /api/v1.0/authorisation/login': { action: 'authorisation/login' },
  'GET    /api/v1.0/authorisation/signin': { action: 'authorisation/signin' },
  'GET    /api/v1.0/authorisation/refresh': { action: 'authorisation/refresh-access-token' },
  'get   /api/v1.0/authorisation/account/info':{action:'authorisation/get-account-info'},



  //------------USER-------------------//
  //Get user login history
  'GET    /api/v1.0/users/me': { action: 'user/get-user-by-id' },
  'GET    /api/v1.0/users/logined': { action: 'user/get-logined-users' },
  'GET    /api/v1.0/users/:id': { action: 'user/get-user-by-id' },
  'PUT    /api/v1.0/users/icon': { action: 'user/upload-user-icon' },
  'GET    /api/v1.0/signed/users': { action: 'user/get-user-list' },


  //------------USER ACTION ----------------------------//
  'put   /api/v1.0/user/behavior':{action:'behavior/update-user-behavior'},
  'POST  /api/v1.0/user/sign/activity':{action:'behavior/sign-activity-behavior'},


  //-------------ACTIVITY---------------//
  //access index scroll images of activity
  'GET    /api/v1.0/scroll/activity':{action:'activity/get-activity-list'},
  //Get activity by id
  'GET    /api/v1.0/activities/:activityId': { action: 'activity/get-activity-by-id' },
  //recently activity which single user signed
  'GET    /api/v1.0/recently/activity': { action: 'activity/get-recently-activity' },


  //--------------SLIDESHOW-------------//
  //Get slideshows content.
  'GET    /api/v1.0/slideshows': { action: 'slideshow/get-slideshows' },


  //--------------MOMMENT---------------//
  //Get waterfalls content.
  'GET    /api/v1.0/moments': { action: 'moment/get-moments' }, //-- modify by leo
  'GET    /api/v1.0/scroll/moments': { action: 'moment/get-scroll-moments' }, //-- modify by leo
  'GET    /api/v1.0/moment/:dynamicId': { action: 'moment/get-moment' }, //-- modify by leo
  'POST   /api/v1.0/moments': { action: 'moment/post-moment' }, // -- modify by leo
  'delete /api/v1.0/moments/:dynamicId': { action: 'moment/delete-moment-by-id' },//--modify by leo
  'GET    /api/v1.0/activity/moments': { action: 'moment/get-moments-by-activity' }, //-- modify by leo



  //--------------COMMENT---------------//
  //Post a comment.
  'POST   /api/v1.0/comment': { action: 'comment/post-comment' },
  //Get comments by moment id
  'GET    /api/v1.0/comments': { action: 'comment/get-comments' },


  //--------------FOOTPRINT-------------//
  //Get footprints by user id
  'GET    /api/v1.0/footprints/users/me': { action: 'footprint/get-footprints-by-user-id' },
  'GET    /api/v1.0/footprints/users/:id': { action: 'footprint/get-footprints-by-user-id' },


  //--------------REPORT----------------//
  //Report
  'POST   /api/v1.0/reports': { action: 'report/report' },


  //--------------DISLIKE&LIKE------------------//
  //Like
  'PUT    /api/v1.0/dis_or_like': { action: 'dis-or-like/dis-or-like' },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
