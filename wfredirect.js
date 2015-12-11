var express = require('express');
var router = express.Router();
var config=require('lib/config.js');
/* GET home page. */
router.get('/', function(req, res, next) {

   var target=req.headers['user-agent'];
    var host=req.headers['host'];
    var protocol=config.protocol;
    protocol=protocol['http://']?'http://':'https://';
    var wxflag=config.isAllowUnfocuseToProcess;
    var appid=config.appid;
    var localpath=config.localpath;
    var patt1= new RegExp(".+MicroMessenger.+");
 console.log('target:'+target);
    if(patt1.test(target)){
        console.log("wechat");
        var wxredirect_url=get_wxredirect_url(appid,'xiuquan.5ftech.com',wxflag,localpath);
            console.log(wxredirect_url);
        res.redirect(wxredirect_url);

    }else if(alipay){
        console.log("alipay")
    }else{
        console.log('local');
        res.redirect(protocol+host+localpath);

    }


    function get_wxredirect_url(appid,host,wxflag,localpath){
        var access_type='';
        switch (wxflag){
            case false:
                access_type='base';
                break;
            case true:
                access_type='userinfo';
                break;

        }

        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=http%3a%2f%2f'+host+'%2f'+
            localpath+'&response_type=code&scope=snsapi_'+access_type+'&state=state&from=singlemessage&isappinstalled=0#wechat_redirect' ;

    }
});
//跳转到wechat
 router.get('/wecaht',function(req,res,next){

    var code = req.query.code;
    var scope=req.query.scope;
    console.log("code:" + code);
     if(code!=null){
         if(scope=='snsapi_userinfo'){
             //http.httpget(wechat.host, wechat.userinfoApi + access_token + "&openid=" + openid + "&lang=zh_CN", null, function (result, status) {
             //    var temp = JSON.parse(result.toString());
             //    var nickname = temp.nickname;
             //    console.log('nickname:' + nickname);
             //    console.log("openid2:" + openid);
             //    var user="&openid=" +openid;
             //    res.send(user);
             //});

             //res.send("true");
             res.render('test',{focus:true});
         }else{
             //res.send("false");
             res.render('test',{focus:false});
         }

     }else{
         res.render('test',{focus:false});
     }



    //获取授权token,以及openid

});

module.exports = wfredirect;
