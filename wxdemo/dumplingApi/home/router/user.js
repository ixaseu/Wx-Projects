const express=require('express');
const request=require('request');
const router=express.Router();
const  {AppId,AppSecret}=require('../../config/config').applet
const userModel=require('../../db/model/userModel.js');

/**
 * @api {get} getHome 获取首页信息
 * @apiName getHome
 * @apiGroup api
 *
 * 
 *
 * @apiSuccess {Array} banners banners of the goods.
 * @apiSuccess {Array} themes  themes of the goods.
 * @apiSuccess {Array} products  products of the goods.
 */
router.post('/appletlogin',(req,res)=>{
   console.log(req.body)
   let {code,nickName,avatarUrl}=req.body
   let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
   request(url,(err,response,body)=>{
      let {session_key,openid}=JSON.parse(body) 
      userModel.findOneAndUpdate({openid},{session_key,openid,nickName,avatarUrl},{upsert:true})
      .then((data)=>{
         console.log(data)
         res.send({err:0,msg:'登录成功',token:data._id})
      })
   })
   
})

module.exports=router		