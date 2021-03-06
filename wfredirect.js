var express = require('express');
var router = express.Router();
var config=require('lib/config.js');
/* GET home page. */
router.get('/', function(req, res, next) {

   var target=req.headers['user-agent'];
    var host=config.host||req.headers['host'];
    var protocol=config.protocol;
    protocol=protocol||'http://';
    var wxflag=config.isAllowUnfocuseToProcess;
    var appid=config.appid;
    var localpath=config.localpath;
    var patt1= new RegExp(".+MicroMessenger.+");
    if(patt1.test(target)){
        console.log("wechat");
        var wxredirect_url=get_wxredirect_url(appid,host,wxflag,localpath);
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
            localpath+'&response_type=code&scope=snsapi_'+access_type+'&state='+access_type+'&from=singlemessage&isappinstalled=0#wechat_redirect' ;

    }
});
//跳转到wechat
router.get('/wechat',function(req,res,next) {
    console.log(url.parse(req.url));

    var code = req.query.code;
    var scope = req.query.state;
    console.log("code:" + code);
    console.log("scope:" + scope);
    if (code && scope === 'userinfo') {
        res.render('wechat', {
            'focus': true
        });

    } else {
        res.render('wechat', {
            'focus': false
        });
    }
});
module.exports = router;
