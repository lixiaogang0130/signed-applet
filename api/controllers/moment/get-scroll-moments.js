module.exports = {


  friendlyName: 'Get moments',


  description: '',


  inputs: {
    page_index: {
      type: 'number'
    },
    page_size: {
      type: 'number'
    },
    dynamicId: {
      type: 'string',
      required:true
    },
    activityId:{
      type:'string',
      required:true
    },
    actionType:{
      type:'string',
      enum:['before','after']
    }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },



  fn: async function (inputs, exits) {
    let {page_index:pageIndex = 1,page_size:pageSize=10,dynamicId,activityId,actionType} = inputs;
    let reply = await SERVICE.moments.scrollList(pageIndex,pageSize,dynamicId,activityId,actionType);

    for(let v of reply){
      v.isPraise = await SERVICE.common.execute('praise',1,v.dynamicId,1)
      if(v.isPraise){
        v.isDis = false;
      }else{
        v.isDis = await SERVICE.common.execute('isDis',1,v.dynamicId,1)
      }
      v.isReport = await SERVICE.common.execute('isReport',1,v.dynamicId,1);
      v.dynamicImages = JSON.parse(v.dynamicImages);
      v.dynamicImages = _.values(v.dynamicImages);
    }
    return exits.reply({status:10000,data:reply});

    // let open_id = sails.session.open_id;
    // if (!open_id) { return exits.success(await sails.helpers.reply(null, 13042)) }
    // let open_id = 'asddfe';

    // let pre_query = `SELECT COUNT(id) amount FROM tb_reg_mp_moment WHERE delete_flag=0`;
    // let amount = await sails.helpers.query(pre_query);
    // console.log(amount);
    // console.log(amount.done);
    // console.log(amount.result[0].amount);

    // pre_query = `SELECT
    //               moment.id,
    //               moment.images,
    //               moment.content,
    //               moment.activity_id,
    //               moment.create_time,
    //               mapping.user_name,
    //               mapping.open_id,
    //               mapping.user_id,
    //               mapping.user_icon,
    //               (
    //               SELECT
    //                 COUNT( com.id )
    //               FROM
    //                 tb_reg_mp_comment com
    //               WHERE
    //                 com.target_type = 1
    //                 AND com.target_id = moment.id
    //               ) comment_cnt,
    //               dol.dis_or_like
    //             FROM
    //               tb_reg_mp_moment moment
    //               LEFT JOIN tb_reg_mp_open_id_mapping mapping ON moment.open_id = mapping.open_id
    //               LEFT JOIN tb_reg_mp_dis_or_like dol ON dol.target_type = 1
    //               AND dol.open_id = '${open_id}'
    //               AND dol.target_id = moment.id
    //             ORDER BY
    //               moment.create_time DESC
    //               LIMIT 0,
    //               10`;
    // let result = await sails.helpers.query(pre_query);

    // result = JSON.parse(JSON.stringify(result.result));
    // console.log(result);
    // console.log('===========');
    // console.log(result[0]);


    let a = {
      0:'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg',
      1:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065864051&di=ccf37a548dd333e8941bbe4df9417300&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F3812b31bb051f8199f8ed321d7b44aed2e73e736.jpg'
    }

    result = {
      page_index: 1,
      page_size: 10,
      total_page: 1,
      total_record: 2,
      last_moment_id: "1",



      moments: [{
        id: '1',
        images: ['http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065864051&di=ccf37a548dd333e8941bbe4df9417300&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F3812b31bb051f8199f8ed321d7b44aed2e73e736.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name1',
        like_cnt: 99,
        create_time: new Date(1542164211222),

        activity_id: '1',
        activity_title: '1!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 0,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      },
      {
        id: '2',
        images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
          'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name2',
        like_cnt: 88,
        create_time: new Date(1542164212222),
        activity_id: '2',
        activity_title: '2!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 1,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      },
      {
        id: '3',
        images: ['http://f.hiphotos.baidu.com/image/pic/item/9c16fdfaaf51f3de39827b3e99eef01f3a2979bc.jpg',
          'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name2',
        like_cnt: 88,
        create_time: new Date(1542164212222),
        activity_id: '2',
        activity_title: '2!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 1,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      },
      {
        id: '4',
        images: ['http://b.hiphotos.baidu.com/image/pic/item/03087bf40ad162d91b5d784b1cdfa9ec8a13cd32.jpg',
          'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name2',
        like_cnt: 88,
        create_time: new Date(1542164212222),
        activity_id: '2',
        activity_title: '2!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 1,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      },
      {
        id: '5',
        images: ['http://e.hiphotos.baidu.com/image/pic/item/d833c895d143ad4bb53c08828f025aafa40f0665.jpg',
          'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name2',
        like_cnt: 88,
        create_time: new Date(1542164212222),
        activity_id: '2',
        activity_title: '2!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 1,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      }, {
        id: '6',
        images: ['http://h.hiphotos.baidu.com/image/pic/item/08f790529822720ebb75acb876cb0a46f21fab3d.jpg',
          'http://e.hiphotos.baidu.com/image/pic/item/83025aafa40f4bfb0786420f0e4f78f0f7361813.jpg'],
        content: 'description',
        user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg',
        user_name: 'name2',
        like_cnt: 88,
        create_time: new Date(1542164212222),
        activity_id: '2',
        activity_title: '2!',

        comment_cnt: 88,
        share_cnt: 33,

        dis_or_like: 1,

        //TODO:下列两个字段应写在C端,将删除
        heart_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg",
        height: 0,
      }]
    };


    return exits.reply({ status: 10000, data: result });

  }


};
