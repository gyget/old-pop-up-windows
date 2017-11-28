/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpAJAX = {
    //ajax请求代码，同步处理，返回数据
    choiceFileAJAXFunction:function (data, url, callback) {
        var result,sendData;
        sendData = JSON.parse(JSON.stringify(data));//去除传参中的值为undefined的属性
        $.ajax({
            url: url,
            type:'post',
            dataType : 'json',
            async: false,//设置同步，确保返回数据不为空
            data : sendData,
            success : function(info) {
                if(callback) {
                    callback(info)
                }
                result = info;
            },
            error : function(err) {
                console.log(err);
                console.log('error----未能获取数据')
            }
        });
        return result;//返回请求的数据
    },
    //ajax请求代码，异步处理，回调函数
    choiceModulesAJAXAsync:function (data, url, callback) {
        $.ajax({
            url: url,
            type:'post',
            dataType : 'json',
            async: false,//设置同步，确保返回数据不为空
            data : data,
            success : function(info) {
                if(callback) {
                    callback(info)
                }
            },
            error : function(err) {
                console.log(err);
                console.log('error----未能获取数据')
            }
        });
    }
};