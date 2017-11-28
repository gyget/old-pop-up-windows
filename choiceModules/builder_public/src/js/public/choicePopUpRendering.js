/**
 * Created by gengliangxiang on 2017/11/11.
 */
var choicePopUpRendering = {
    //我的图库列表
    picListRendering:function (data, append) {
        var myPicListsHtml = template('zm-choiceMyPic-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(myPicListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(myPicListsHtml);
        }
    },
    //族蚂图库列表
    zmPicListRendering:function (data, append) {
        if(!data.data){return}
        data.data.forEach(function (value) {
            value.fPath = value.fUrl;
            value.fRegularName = value.fRegularFileName;
        });
        var zmPicListsHtml = template('zm-choiceZmPic-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList2').find('.zm-choiceRadio-spli').append(zmPicListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList2').find('.zm-choiceRadio-spli').html(zmPicListsHtml);
        }
    },
    // 文件列表
    fileListRendering:function (data, append) {
        var MyFileListsHtml = template('zm-choiceFile-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(MyFileListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(MyFileListsHtml);
        }
    },
    // 专辑列表
    albumListRendering:function (data, append) {
        var albumListsHtml = template('zm-choiceAlbum-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(albumListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(albumListsHtml);
        }
    },
    // 产品列表
    goodsListRendering:function (data) {
        if(!data.data){return}
        data.data.forEach(function (value) {
            if(value.childItem){
                value.childLen = '('+ value.childItem.length +')';
                value.variant = '变体'
            }else {
                value.childLen = null;
                value.variant = '有效'
            }
        });
        var goodsListsHtml = template('zm-choiceGoods-Lists',data);
        $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(goodsListsHtml);
        var list = $('.zm-choiceRadio-spli').find('li');
        list.each(function (i,ele) {
            var childrenLength = $(ele).find('li').length;
            if(childrenLength > 0){
                $(ele).children('.zm-choiceR-goodsLists').removeClass('zm-choiceR-goodsLists').addClass('zm-choiceR-newsListsGray');
                $(ele).find('ul').find('.zm-choiceGoods-goodsStateIcon1').remove();
                $(ele).find('ul').find('.zm-choiceGoods-goodsState').css('padding-left','40px');
            }else {
                $(ele).find('.zm-choiceGoods-goodsStateIcon1').remove();
                $(ele).find('.zm-choiceGoods-goodsStateIcon2').remove();
                $(ele).find('.zm-choiceGoods-goodsState').css('padding-left','40px');
                $(ele).find('.zm-choiceFile-bgD7').removeClass('zm-choiceFile-bgD7');
            }
        });
    },
    // 服务列表
    serverListRendering:function (data) {
        if(!data.data){return}
        data.data.serviceData.forEach(function (value) {
            if(value.childList.length){
                value.childLen = '('+ value.childList.length +')';
                value.variant = '变体'
            }else {
                value.childLen = null;
                value.variant = '有效'
            }
        });
        var serverListsHtml = template('zm-choiceService-Lists',data);
        $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(serverListsHtml);
        var list = $('.zm-choiceRadio-spli').find('li');
        list.each(function (i,ele) {
            var childrenLength = $(ele).find('li').length;
            if(childrenLength > 0){
                $(ele).children('.zm-choiceR-goodsLists').removeClass('zm-choiceR-goodsLists').addClass('zm-choiceR-newsListsGray');
                $(ele).find('ul').find('.zm-choiceGoods-goodsStateIcon1').remove();
                $(ele).find('ul').find('.zm-choiceGoods-goodsState').css('padding-left','40px');
            }else {
                $(ele).find('.zm-choiceGoods-goodsStateIcon1').remove();
                $(ele).find('.zm-choiceGoods-goodsStateIcon2').remove();
                $(ele).find('.zm-choiceGoods-goodsState').css('padding-left','40px');
                $(ele).find('.zm-choiceFile-bgD7').removeClass('zm-choiceFile-bgD7');
            }
        });
    },
    // 新闻列表
    newsListRendering:function (data, append) {
        if(!data.data){return}
        data.data.forEach(function (value) {
            value.newsTime = new Date(value.newsTime).toLocaleDateString().replace(/\//g, "-");
        });
        var newsListsHtml = template('zm-choiceNews-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(newsListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(newsListsHtml);
        }
    },
    // 博客列表
    bloggerListRendering:function (data, append) {
        if(!data.data){return}
        data.data.forEach(function (value) {
            value.fCreateTime = new Date(value.fCreateTime).toLocaleDateString().replace(/\//g, "-");
        });
        var bloggerListsHtml = template('zm-choiceBlogger-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(bloggerListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(bloggerListsHtml);
        }
    },
    // 音频列表
    radioListRendering:function (data, append) {
        var radioListsHtml = template('zm-choiceRadio-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(radioListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(radioListsHtml);
        }

    },
    // 我的视频列表
    videoListRendering:function (data, append) {
        var myVideoListsHtml = template('zm-choiceMyVideo-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').append(myVideoListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList1').find('.zm-choiceRadio-spli').html(myVideoListsHtml);
        }
    },
    // 族蚂视频库列表
    zmVideoListRendering:function (data, append) {
        if(!data.data){return}
        data.data.forEach(function (value) {
            value.fName = value.fRegularFileName;
            value.fScaleUrl = value.fImgUrl;
            value.fTime = value.fVideoTime;
        });
        var zmVideoListsHtml = template('zm-choiceZmVideo-Lists',data);
        if(append){
            $('.zm-choiceFile-middleBoxList2').find('.zm-choiceRadio-spli').append(zmVideoListsHtml);
        }else {
            $('.zm-choiceFile-middleBoxList2').find('.zm-choiceRadio-spli').html(zmVideoListsHtml);
        }
    },
    //音频类目
    zmRadioCatalogRendering:function (data) {
        var zmRadioCatalogHtml = template('zm-choiceRadio-catalogLists',data);
        $('.zm-choiceRadio-middle').find('.zm-choicePicture-middleLTop').html(zmRadioCatalogHtml);
    },
    //我的图片库类目
    picCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-picCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choicePicture-myCName').html(catalogHtml);
        $(".zm-choicePicture-middleLTop").addClass("mCustomScrollbar").attr("data-msc-theme","minimal");
        choicePopUpCommon.clsListsIcon();
    },
    //族蚂免费图片类目
    zmPicCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-zmPicCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choiceFile-zmCName .zm-chioceFile-cataLogCls').html(catalogHtml);
        $(".zm-choicePicture-middleLTop").addClass("mCustomScrollbar").attr("data-msc-theme","minimal")
    },
    //产品类目
    goodsCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-goodsCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choiceFile-goodsCName').html(catalogHtml);
        choicePopUpCommon.clsListsIcon();
    },
    //我的视频库类目
    videoCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-myVideoCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choiceVideo-myCName').html(catalogHtml);
        $(".zm-choicePicture-middleLTop").addClass("mCustomScrollbar").attr("data-msc-theme","minimal");
        choicePopUpCommon.clsListsIcon();
    },
    // 族蚂视频库类目
    zmVideoCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-zmVideoCata',data);
        $('.zm-choiceRadio-middleFree').find('.zm-choiceFile-zmCName .zm-chioceFile-cataLogCls').html(catalogHtml);
        $(".zm-choicePicture-middleLTop").addClass("mCustomScrollbar").attr("data-msc-theme","minimal");
    },
    // 新闻类目
    newsCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-newsCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choiceFile-newsCName').html(catalogHtml);
        choicePopUpCommon.clsListsIcon();
    },
    // 服务类目
    serviceCatalogRendering:function (data) {
        var catalogHtml = template('zm-choiceFile-serviceCata',data);
        $('.zm-choiceRadio-middle').find('.zm-choiceFile-serviceCName').html(catalogHtml);
        choicePopUpCommon.clsListsIcon();
    },
    //上传文件进度条页面
    zmUpdateProgressBar:function (data) {
        var progressHtml = template('zm-choiceFile-updateProgressBar',data);
        $('.zm-choiceFile-progressBarPageUl').html(progressHtml);
    }
};