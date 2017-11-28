/**
 * Created by gengliangxiang on 2017/11/11.
 */
var choicePopUpRoute = {
    listUrl:function (obj) {
        var url, data = {};
        if(Object.prototype.toString.call(obj).indexOf('String') !== -1){
            data.modules = obj
        }else {
            data = obj;
        }
        if(data.mData === 0){
            switch (data.modules){
                case 'myPicture':
                case 'picture':
                    (data.mData === 0) ? url = '/picture/webbuilder-api/shopPicture/queryByPage': url = 'http://local.zuma.com/picture/webbuilder-api/shopPicture/queryByPage';
                    break;
                case 'pictureFree':
                case 'zmPicture':
                    (data.mData === 0) ? url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryByPage': url = 'http://local.zuma.com/manage-api/picture/webbuilder-api/imageFreeExternal/queryByPage';
                    break;
            }
        }else {
            switch (data.modules){
                case 'myPicture':
                case 'picture':
                    url = '/picture/webbuilder-api/shopPicture/queryByPage';
                    break;
                case 'pictureFree':
                case 'zmPicture':
                    url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryByPage';
                    break;
                case 'video':
                case 'myVideo':
                    url = '/video/webbuilder-api/videoInfo/queryByPage';
                    break;
                case 'videoFree':
                case 'zmVideo':
                    url = '/manage-api/video/webbuilder-api/videoFreeExternal/queryByPage';
                    break;
                case 'radio':
                    url = '/music/webbuilder-api/audio/queryAudioAll';
                    break;
                case 'goods':
                    url = '/product/webbuilder-api/product/getProductList';
                    break;
                case 'blogger':
                    url = '/blog/webbuilder-api/shopBlog/queryByPage';
                    break;
                case 'album':
                    url = '/album/webbuilder-api/album/popQueryAlbumAll';
                    break;
                case 'service':
                    url = '/service/webbuilder-api/serviceNote/getServiceList';
                    break;
                case 'file':
                    url = '/file/webbuilder-api/shopFile/queryByPage';
                    break;
                case 'news':
                    url = '/news/webbuilder-api/news/queryListByPage';
                    break;
                case 'composer':
                    url = '/music/webbuilder-api/author/queryAuthorByPage';
                    break;
            }
        }
        return url;
    },
    categoryUrl:function (obj) {
        var url, data = {};
        if(Object.prototype.toString.call(obj).indexOf('String') !== -1){
            data.modules = obj
        }else {
            data = obj;
        }
        if(data.mData === 0){

        }else {
            switch (data.modules){
                case 'picture':
                    url = '/picture/webbuilder-api/shopPictureCategory/queryFristCategory';
                    break;
                case 'pictureFree':
                    url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryCategory';
                    break;
                case 'video':
                    url = '/video/webbuilder-api/videoCategory/queryAll';
                    break;
                case 'videoFree':
                    url = '/manage-api/video/webbuilder-api/videoFreeExternal/queryByCategoryList';
                    break;
                case 'radio':
                    url = '/album/webbuilder-api/album/popQueryAlbumAll';
                    break;
                case 'goods':
                    url = '/product/webbuilder-api/productCategory/getProductCategoryList';
                    break;
                case 'service':
                    url = '/service/webbuilder-api/shopserviceCategory/getServiceCategoryList';
                    break;
                case 'news':
                    url = '/news/webbuilder-api/shopNewsCategory/shopNewsCategorList';
                    break;
            }
        }
        return url;
    },
    //ajax请求获取类目---图片、视频、音频、产品、服务、新闻
    choiceFileGetClassify:function (modules, callback) {
        var url = choicePopUpRoute.categoryUrl(modules);
        return choicePopUpAJAX.choiceFileAJAXFunction({}, url, callback);
    },
    //ajax请求添加类目---图片、商品、服务
    choicePictureAddCategory:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPictureCategory/insertCategory';
                break;
            case 'goods':
                url = '/product/webbuilder-api/productCategory/addProductCategory';
                break;
            case 'service':
                url = '/service/webbuilder-api/shopserviceCategory/addServiceCategory';
                break;
            case 'news':
                url = '/news/webbuilder-api/shopNewsCategory/saveCategprSort';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求删除类目---图片、视频、商品、音频、新闻
    choicePictureDelCategory:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPictureCategory/deleteCategoryById';
                break;
            case 'video':
                url = '/video/webbuilder-api/videoCategory/delete';
                break;
            case 'radio':
            case 'album':
                url = '/album/webbuilder-api/album/popBatchUpfDeleteState';
                break;
            case 'goods':
                url = '/product/webbuilder-api/productCategory/removeProductCategroy';
                break;
            case 'service':
                url = '/service/webbuilder-api/shopserviceCategory/removeServiceCategory';
                break;
            case 'news':
                url = '/news/webbuilder-api/shopNewsCategory/delete';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求修改类目名---图片、产品、服务、新闻
    choicePictureUpDataCategory:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPictureCategory/updateCategory';
                console.log(url);
                break;
            case 'goods':
                url = '/product/webbuilder-api/productCategory/updateProductCategory';
                break;
            case 'service':
                url = '/service/webbuilder-api/shopserviceCategory/updateServiceCategoryNameById';
                break;
            case 'news':
                url = '/news/webbuilder-api/shopNewsCategory/updateCategprSortName';
                break;

        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求排序类目--图片、服务
    choicePictureSortCategory:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPictureCategory/SortCategoryByfId';
                break;
            case 'service':
                url = '/service/webbuilder-api/shopserviceCategory/updateCategorySort';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求列表---图片、视频、音频、专辑、商品、博客、服务、文件、新闻、创作人
    choicePictureLists:function (data ,modules, callback) {
        var url = choicePopUpRoute.listUrl(modules);
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求重命名图片、音频、专辑、文件
    choicePictureListsRename:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPicture/save';
                break;
            case 'radio':
                url = '/music/webbuilder-api/audio/renameForSelector';
                break;
            case 'album':
                url = '/album/webbuilder-api/album/updateAlbum';
                break;
            case 'file':
                url = '/file/webbuilder-api/shopFile/EditItem';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求批量删除图片、音频、视频、产品、博客、文件、服务
    choicePictureDeletePicture:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'picture':
                url = '/picture/webbuilder-api/shopPicture/batchDelete';
                break;
            /*case 'video':
             url = '/video/webbuilder-api/videoInfo/pushtrash';
             break;*/
            case 'radio':
                url = '/music/webbuilder-api/audio/apiBatchUpdateDeleteStateById';
                break;
            case 'goods':
                url = '/product/webbuilder-api/product/removeProduct';
                break;
            case 'service':
                url = '/service/webbuilder-api/serviceNote/delteServiceId';
                break;
            case 'blogger':
                url = '/blog/webbuilder-api/shopBlog/batchDelete';
                break;
            case 'file':
                url = '/file/webbuilder-api/shopFile/batchDelete';
                break;
            case 'news':
                url = '/news/webbuilder-api/news/newsBatchDelete';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求批量会还原图片、视频、服务
    choicePictureBatchRestorePicture:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'movePicture':
                url = '/picture/webbuilder-api/shopPicture/batchRestore';
                break;
            /*case 'video':
             url = '/video/webbuilder-api/videoInfo/restoreTrash';
             break;*/
            case 'service':
                url = '/service/webbuilder-api/serviceNote/restoreServiceIdInRecyle';
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求移动、复制到分类图片、音频、视频、新闻
    choicePictureMoveToSelectedCategory:function (data, modules, callback) {
        var url;
        switch (modules){
            case 'movePicture':
            case 'copyPicture':
                url = '/picture/webbuilder-api/shopPicture/moveToSelectedCategory';
                break;
            /*case 'moveVideo':
             url = 'http://zuma.com/video/webbuilder-api/videoInfo/updateCategory';
             break;*/
            case 'copyRadio':
                url = '/music/webbuilder-api/audio/apiBatchCopyAudioToAlbum';
                break;
            case 'moveRadio':
                url = '/music/webbuilder-api/audio/moveToAlbumForSelector';
                break;
            case 'moveService':
                url = '/service/webbuilder-api/serviceNote/updateServiceShopCAT';
                break;
            case 'copyService':
                url = '/service/webbuilder-api/serviceNote/copyServiceShopCAT';
                break;
            case 'moveNews':
                url = '/news/webbuilder-api/news/newsMoveCategory';
                break;
            case 'copyGoods':
                url = '/product/webbuilder-api/product/copyOrMoveProduct';
                data.type = 0;
                break;
            case 'moveGoods':
                url = '/product/webbuilder-api/product/copyOrMoveProduct';
                data.type = 1;
                break;
        }
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求视频--新增类目、类目拖拽排序、类目重命名
    choiceVideoSave:function (data, callback) {
        var url = '/video/webbuilder-api/videoCategory/save';
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    },
    //ajax请求音频---修改专辑名称、类目（专辑）排序
    choiceRadioUpdateAlbum:function (data, callback) {
        var url = '/album/webbuilder-api/album/updateAlbum';
        return choicePopUpAJAX.choiceFileAJAXFunction(data, url, callback);
    }
};