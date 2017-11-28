/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpCommon = {
    // 各个模块共同调用方法
    commonFunction:function (obj){
        document.stopClick = true;
        document.modulesPageNumber = 2;
        var data = {
            modules: obj.modules,
            mData: obj.mData,
            flag: obj.multiple,
            callback: obj.callback
        };
        if(data.modules == 'goods' || data.modules == 'service' || data.modules == 'news' || data.modules == 'blogger'){
            choicePopUpCommon.choiceNewsCheckedAll(data);//全选--新闻列表类型
            choicePopUpCommon.choiceNewsCheckedNone(data);//全不选--新闻列表类型
            choicePopUpCommon.choiceNewsCheckedInvert(data);//反选--新闻列表类型
            choicePopUpCommon.choiceNewsChecked(data);//选中样式--新闻列表类型
        }else {
            choicePopUpCommon.choicePicCheckedAll();//全选--图片类的系列
            choicePopUpCommon.choicePicCheckedNone();//全不选--图片类系列
            choicePopUpCommon.choicePicCheckedInvert();//反选--图片类系列
            choicePopUpCommon.choicePicChecked(data);//选中样式--图片类型
        }
        choicePopUpCommon.choiceSelBtn1Hover();//全选、不选、反选hover样式
        choicePopUpCommon.choiceFileSetCatalogBox();//类目设置框显示隐藏
        choicePopUpCommon.choicePicListHover();//图片hover显示下方小图标
        choicePopUpCommon.choiceFileInputIsFocus();//input框获取焦点、失去焦点
        choicePopUpCommon.batchDelPic(data);//批量删除
        choicePopUpCommon.choicePicDelete(data);//点击图片上icon单个删除图片
        choicePopUpCommon.choiceFileIconHint();//图片上icon的hover文字提示
        choicePopUpCommon.choiceModuleClose();//关闭弹窗
        choicePopUpCommon.zmChoiceFileScroll();//滚动条---包含下拉加载触发事件
        choicePopUpCommon.deleteBigCatalog();//删除大类目
        choicePopUpCommon.deleteCatalog();//删除小类目
        choicePopUpCommon.choiceFileDownload(data);//点击图片下载小图标下载功能
        choicePopUpCommon.choiceCatalogEvent();//目录click/hover样式
        choicePopUpCommon.choiceCatalogRename(data);//类目重命名
        choicePopUpCommon.choicePicRename(data);//重命名图片
        choicePopUpCommon.choiceFileRecycleBin();//回收站点击样式
        choicePopUpCommon.choiceFileVideoRecycleBin();//顶部功能区恢复文件
        choicePopUpCommon.choiceFileRestorePicture(data);//还原单个图片
        choicePopUpCommon.picAddChoice(data);//点击选择添加
        choicePopUpCommon.choiceFileMoveData(data);//点击移动、复制到分类获取文件列表里的数据
        choicePopUpCommon.choiceFileSearch();//搜索
    },
    // 关闭按钮的svg图标
    closeBtnSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="zm-dialog-choiceFileCloseBtn" viewBox="0 0 284 284"><circle class="iconColor5" cx="142" cy="142" r="142"/><path class="iconColor0" d="M100,71.95c3.51-.39,6,1.44,8.28,3.79,10,10,20.11,19.93,29.95,30.11,2.83,2.93,4.53,3.19,7.49.11,9.82-10.19,19.93-20.11,30-30.09,5.65-5.62,10.21-5.6,15.85,0s11.57,11.51,17.3,17.32c4.61,4.67,4.67,9.73,0,14.42-10.3,10.42-20.62,20.84-31.13,31-2.74,2.67-2.55,4.21.08,6.77,10.14,9.87,20.09,20,30.08,30,5.92,5.94,6,10.38.17,16.21q-8.28,8.33-16.6,16.6c-5.59,5.55-10.16,5.52-15.85-.14-10-10-20.11-19.93-30-30.08-2.67-2.74-4.3-3-7.13-.11-10,10.29-20.16,20.34-30.32,30.44-5.4,5.37-10.11,5.34-15.49,0Q84,199.69,75.35,191c-4.88-4.94-4.94-9.83,0-14.78,10.19-10.3,20.37-20.61,30.78-30.69,2.89-2.8,2.69-4.44-.08-7.13-10.15-9.86-20.09-19.95-30.08-30-5.67-5.69-5.7-10.27-.17-15.85,5.87-5.91,11.79-11.76,17.65-17.68C95.26,73.05,97.2,71.61,100,71.95Z"/></svg>',
    // 关闭弹窗
    choiceModuleClose:function () {
        $(document).on('click', '.zm-dialog-choiceFileCloseBtn:eq(0)', function () {
            window.parent.document.getElementById("choiceModules").remove();
        })
    },
    // 关闭按钮样式修正
    closeBtnStyleSetting: function (removeNode) {
        removeNode.closest('.zm-dialog').find('.zm-dialog-header-btn.zm-dialog-close').html(choicePopUpCommon.closeBtnSvg);
        removeNode.parent().css({'padding-left':'10px', 'padding-right':'10px', 'height':'35px'});
        removeNode.siblings('.zm-dialog-title').css({'font-size':'14px', 'font-weight':'400', 'height':'35px', 'line-height':'35px'});
        removeNode.siblings('.zm-dialog-close').css({'padding-top':'0px', 'margin-top':'4px'});
        removeNode.remove();
    },
    // 数据初始渲染，异步处理，避免界面卡死
    choiceFileAJAXFunctionAsync:function (obj) {
        var sendData = JSON.parse(JSON.stringify(obj.data));//去除传参中的值为undefined的属性
        var url = (obj.type) ? choicePopUpRoute.listUrl(obj) : choicePopUpRoute.categoryUrl(obj);
        choicePopUpAJAX.choiceModulesAJAXAsync(sendData, url, function (info) {
            switch (obj.modules){
                case 'picture':
                    (obj.type) ? choicePopUpRendering.picListRendering(info) : choicePopUpRendering.picCatalogRendering(info);
                    break;
                case 'pictureFree':
                    (obj.type) ? choicePopUpRendering.zmPicListRendering(info) : choicePopUpRendering.zmPicCatalogRendering(info);
                    break;
                case 'video':
                    (obj.type) ? choicePopUpRendering.videoListRendering(info) : choicePopUpRendering.videoCatalogRendering(info);
                    break;
                case 'videoFree':
                    (obj.type) ? choicePopUpRendering.zmVideoListRendering(info) : choicePopUpRendering.zmVideoCatalogRendering(info);
                    break;
                case 'album':
                    choicePopUpRendering.albumListRendering(info);
                    break;
                case 'blogger':
                    choicePopUpRendering.bloggerListRendering(info);
                    break;
                case 'file':
                case 'composer':
                    choicePopUpRendering.fileListRendering(info);
                    break;
                case 'goods':
                    (obj.type) ? choicePopUpRendering.goodsListRendering(info) : choicePopUpRendering.goodsCatalogRendering(info);
                    break;
                case 'news':
                    (obj.type) ? choicePopUpRendering.newsListRendering(info) : choicePopUpRendering.newsCatalogRendering(info);
                    break;
                case 'radio':
                    (obj.type) ? choicePopUpRendering.radioListRendering(info) : choicePopUpRendering.zmRadioCatalogRendering(info);
                    break;
                case 'service':
                    (obj.type) ? choicePopUpRendering.serverListRendering(info) : choicePopUpRendering.serviceCatalogRendering(info);
                    break;
            }
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    // 顶部tab栏切换
    choiceFileTopTab:function () {
        $('.zm-choiceFile-topL').on('click',myLib);
        $('.zm-choiceFile-topL.zm-choiceFile-library').on('click',zmLib);
        function myLib() {
            $(this).addClass('zm-choiceFile-topL-nowClick').siblings().removeClass('zm-choiceFile-topL-nowClick');
            $('.zm-choiceFile-middleBoxList.zm-choiceFile-middleBoxList1').show();
            $('.zm-choiceFile-middleBoxList.zm-choiceFile-middleBoxList2').hide();
            $('.zm-choiceFile-topTextTitle').show();
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        }
        function zmLib() {
            $(this).addClass('zm-choiceFile-topL-nowClick').siblings().removeClass('zm-choiceFile-topL-nowClick');
            $('.zm-choiceFile-middleBoxList.zm-choiceFile-middleBoxList1').hide();
            $('.zm-choiceFile-middleBoxList.zm-choiceFile-middleBoxList2').show();
            $('.zm-choiceFile-topTextTitle').hide();
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        }
        myLib();
    },
    // 我知道了小弹窗
    choiceIKnow:function (msg) {
        zmEditor.dialog.open(
            {
                title: '提示',
                content: '<p class="zm-choiceFile-hintMessage">'+ msg +'</p><span class="zm-choiceFile-Know">我知道了</span> ',
                width: 280,
                height: 160,
                movable: true,
                target: $('.zm-choiceFile-wrap')
            },function () {
                var removeNode = $('.zm-choiceFile-hintMessage').closest('.zm-dialog-box.zm-movableBox').find('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help');
                choicePopUpCommon.closeBtnStyleSetting(removeNode);
                $('.zm-choiceFile-Know').on('click',function () {
                    $(this).closest('.zm-dialog-box.zm-movableBox').remove();
                });
            })
    },
    // 确认删除小弹窗
    affirmDelete:function (msg) {
        zmEditor.dialog.open(
            {
                title:'提示',
                content: '<p class="zm-choiceFile-hintMessage">'+ msg +'</p><span class="zm-choiceFile-cancel">取消</span><span class="zm-choiceFile-confirm">确认删除</span>',
                width: 280,
                height: 170,
                movable:true,
                // animate:'slide',
                target: $('.zm-choiceFile-wrap')
            },function () {
                var removeNode = $('.zm-choiceFile-hintMessage').closest('.zm-dialog-box.zm-movableBox').find('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help');
                choicePopUpCommon.closeBtnStyleSetting(removeNode);
                $(document).on('click', 'zm-choiceFile-cancel', function () {
                    $(this).closest('.zm-dialog-box.zm-movableBox').remove();
                })
            });
        return false;
    },
    // 显示选中文件个数
    choicePicCheckedNumber:function () {
        var btm1 = $('.zm-choiceFile-bottom1');//我的 底部合计
        var btm2 = $('.zm-choiceFile-bottom2');//族蚂 底部合计
        var lisBox1 = btm1.siblings('.zm-choiceRadio-middle');//主体
        var lisBox2 = btm2.siblings('.zm-choiceRadio-middle');//主体
        var choiceLength1 = lisBox1.find('.zm-chioceFile-checkSign').length;
        var choiceLengthAll1 = lisBox1.find('.zm-choiceFile-fileLi').length - lisBox1.find('.zm-choiceR-newsListsGray').length;
        var choiceLength2 = lisBox2.find('.zm-chioceFile-checkSign').length;
        var choiceLengthAll2 = lisBox2.find('.zm-choiceFile-fileLi').length;
        btm1.find('.zm-choiceFile-allListNumber').html(choiceLengthAll1);
        btm1.find('.zm-choiceFile-allListCheckNumber').html(choiceLength1);
        btm2.find('.zm-choiceFile-allListNumber').html(choiceLengthAll2);
        btm2.find('.zm-choiceFile-allListCheckNumber').html(choiceLength2);
        (!!choiceLength1) ? btm1.find('.zm-choiceFile-btn3').addClass('zm-choiceFile-btn3Add') : btm1.find('.zm-choiceFile-btn3').removeClass('zm-choiceFile-btn3Add');
        (!!choiceLength2) ? btm2.find('.zm-choiceFile-btn3').addClass('zm-choiceFile-btn3Add') : btm2.find('.zm-choiceFile-btn3').removeClass('zm-choiceFile-btn3Add');
    },
    // 类目设置功能框显示和隐藏
    choiceFileSetCatalogBox:function () {
        var setIconParent = $('.zm-choicePicture-middleLTop');
        setIconParent.on('click','.zm-choicePicture-setIcon',clickShow);
        setIconParent.on('mouseleave','.zm-choicePicture-setIcon',leaveHide);
        // 点击显示功能框
        function clickShow(){
            var $this = $(this);
            var liSiblingsLen = $this.closest('li').siblings('.zm-choiceFile-catalog1').length;
            $this.css('z-index','22').find('.zm-chioceFile-addCatalog').stop(true,false).show(400).css('z-index','99');
            var topDistance = $(this).offset().top - setIconParent.offset().top;
            //操作框的高度
            var zmChioceFileAddCatalogHeight = ($this.find('.zm-chioceFile-addCatalog:first').children("span").length) * $this.find('.zm-chioceFile-addCatalog:first').children("span:first").height();
            //操作按钮距离底部长度
            var bottomDistance = setIconParent.height() - topDistance;
            if(zmChioceFileAddCatalogHeight > bottomDistance){
                var topOffset = zmChioceFileAddCatalogHeight - bottomDistance;
                $this.find('.zm-chioceFile-addCatalog').css("top", - topOffset);
            }else {
                $this.find('.zm-chioceFile-addCatalog').css("top", '4px');
            }
            if($this.closest('li').hasClass('zm-choiceFile-catalog1')){
                (liSiblingsLen === 0) ? $this.find('.zm-chioceFile-bigCataDle').addClass('zm-choiceFile-prohibit'): $this.find('.zm-chioceFile-bigCataDle').removeClass('zm-choiceFile-prohibit');
            }
        }
        // 离开消失功能框
        function leaveHide(){
            $(this).find('.zm-chioceFile-addCatalog').hide();
        }
    },
    // 拖拽图片排序
    PicDragSort:function () {
        $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli').eleDragSort({
            dragEle:'.zm-choiceR-lists',
            callback :function () {
                // 排序后的所有元素
                var eleList = $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli').find('.zm-choiceR-lists');
                eleList.each(function (i,ele) {
                    $(ele).find('.zm-chioceFile-fileEdit').hide()
                })
            }
        });
    },
    //拖拽产品排序
    goodsListsSort:function () {
        $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli .zm-choiceFile-goodsChildUl').eleDragSort({
            dragEle:'.zm-choiceFile-goodsChildLi',
            callback :function () {
                // 排序后的所有元素
                var eles = $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli').find('.zm-choiceFile-goodsChildLi');
            }
        });
        $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli').eleDragSort({
            dragEle:'.zm-choiceFile-parentLi',
            callback :function () {
                // 排序后的所有元素
                var eles = $('.zm-choiceFile-middleBoxList1 .zm-choiceRadio-spli').find('.zm-choiceFile-parentLi');
            }
        });
    },
    //类目设置框功能--添加类目
    addCatalogEvent:function(obj){
        var modules = obj.modules;
        var setIconParent = $('.zm-choicePicture-middleLTop');
        setIconParent.on('click','.zm-chioceFile-bigCatalog',addBigCatalog);
        setIconParent.on('click','.zm-chioceFile-smallCatalog',addSmallCatalog);
        $(document).on('click','.zm-choiceFile-addBtn4',addBtn4);
        function addBtn4() {
            var cLi = $(this).closest('.zm-choiceFile-middleBox').find('.zm-choicePicture-middleL').find('li.zm-choiceFile-catalog1');
            console.log(cLi);
            var inputs = cLi.parent().find('.zm-choiceFile-catalog1').children('p').find('.zm-chioceFile-catalogName');
            var newClsName = '新建大类';
        }
        //下方添加大类
        function addBigCatalog(event){
            event.stopPropagation();
            var cLi = $(this).closest('li');
            var inputs = cLi.parent().find('.zm-choiceFile-catalog1').children('p').find('.zm-chioceFile-catalogName');
            var sendData;
            var newClsName = '新建大类';
            var newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
            switch (modules){
                case 'picture':
                    picture();
                    break;
                case 'video':
                    video();
                    break;
                case 'service':
                    service();
                    break;
                case 'news':
                    news();
                    break;
            }
            function news() {
                sendData = {fName:newName,fId: Number(cLi.attr('data-id')),fSort:Number(cLi.attr('data-sort'))};
                var result = choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    var categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.newsCatalogRendering(categoryData);
                    $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                        dragEle:'li.zm-chioceFile-clsLists'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }
            function service() {
                sendData = {fName:newName,fSort:Number(cLi.attr('data-sort'))};
                var result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    var categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.serviceCatalogRendering(categoryData);
                    $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                        dragEle:'li.zm-chioceFile-clsLists'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }
            function picture() {
                sendData = {fName:newName,fLevel:"1",fSort:Number(cLi.attr('data-sort'))};
                var result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    var categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.picCatalogRendering(categoryData);
                    $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                        dragEle:'li.zm-chioceFile-clsLists'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }
            function video() {
                sendData = {cName:newName,cIndex:Number(Number(cLi.attr('data-sort')) + 1 )};
                var result =  choicePopUpRoute.choiceVideoSave(sendData);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    var categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.videoCatalogRendering(categoryData);
                    $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                        dragEle:'li.zm-chioceFile-clsLists'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }
            choicePopUpCommon.clsListsIcon();
            $(this).parent().hide();
        }
        //下方添加小类
        function addSmallCatalog(event){
            event.stopPropagation();
            var $this = $(this);
            var isT = $this.parents('li.zm-chioceFile-clsLists').parent().children('li.zm-chioceFile-clsLists').length;
            var thisLi = $this.closest('li');
            var sendData, result, categoryData, newName, inputs;
            var newClsName = '新建小类';
            switch (modules){
                case 'picture':
                    picture();
                    break;
                case 'video':
                    video();
                    break;
                case 'service':
                    service();
                    break;
                case 'news':
                    news();
                    break;
            }
            function news() {
                var isT = $this.closest('li').find('ul').length;
                if(isT){
                    inputs = $this.closest('li').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fId: 2,fSort: 0,fParentId:thisLi.attr('data-id')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.newsCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }else{
                    inputs = $this.parents('li.zm-choiceFile-catalog1').find('li.zm-chioceFile-clsLists').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fId: 2,fSort:thisLi.attr('data-sort'),fParentId:thisLi.attr('data-fParentId')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.newsCatalogRendering(categoryData);
                        choicePopUpCommon.clsListsIcon();
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
            }
            function service() {
                var isT = $this.closest('li').find('ul').length;
                if(isT){
                    inputs = $this.closest('li').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fCome: 1,fSort:thisLi.find('li:last-child').attr('data-sort') || 0,fParentId:thisLi.attr('data-id')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.serviceCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }else{
                    inputs = $this.parents('li.zm-choiceFile-catalog1').find('li.zm-chioceFile-clsLists').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fCome: 2,fSort:thisLi.attr('data-sort'),fParentId:thisLi.attr('data-fParentId')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.serviceCatalogRendering(categoryData);
                        choicePopUpCommon.clsListsIcon();
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
            }
            function picture() {
                if(isT){
                    inputs = $this.closest('li.zm-chioceFile-clsLists').parent().find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fLevel:"2",fSort:thisLi.attr('data-sort'),fParentId:thisLi.attr('data-fParentId')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.picCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }else{
                    inputs = $this.parents('li.zm-choiceFile-catalog1').find('li.zm-chioceFile-clsLists').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {fName:newName,fLevel:"2",fSort:thisLi.attr('data-sort'), fParentId:thisLi.attr('data-id')};
                    result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.picCatalogRendering(categoryData);
                        choicePopUpCommon.clsListsIcon();
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
            }
            function video() {
                if(isT){
                    inputs = $this.closest('li.zm-chioceFile-clsLists').parent().find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    console.log($this);
                    sendData = {cName:newName,cIndex:thisLi.attr('data-sort') + 1,cPId:thisLi.attr('data-fParentId')};
                    result =  choicePopUpRoute.choiceVideoSave(sendData);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.videoCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }else{
                    inputs = $this.parents('li.zm-choiceFile-catalog1').find('li.zm-chioceFile-clsLists').find('.zm-chioceFile-catalogName');
                    newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
                    sendData = {cName:newName,cIndex: 1, cPId:thisLi.attr('data-id')};
                    result =  choicePopUpRoute.choiceVideoSave(sendData);
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.videoCatalogRendering(categoryData);
                        choicePopUpCommon.clsListsIcon();
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists'});
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
            }
            choicePopUpCommon.clsListsIcon();
            $(this).parent().hide();
        }
    },
    // 全选/全不选/反选按钮小图标hover
    choiceSelBtn1Hover:function () {
        $('.zm-choiceFile-btn1').hover(function () {
            $(this).find('span').css('textDecoration','underline');
            $(this).removeClass('iconColor8').addClass('iconColor1');
        },function () {
            $(this).find('span').css('textDecoration','none');
            $(this).removeClass('iconColor1').addClass('iconColor8');
        })
    },
    //图片列表hover样式/删除-下载-编辑-还原-查看hover
    choicePicListHover:function () {
        var listBox = $('.zm-chioceFile-zmpicLists');
        listBox.on('mouseenter mouseleave','.zm-choiceFile-fileLi',function (event) {
            var $this = $(this);
            var ifRename = $this.find('input[type=text]').hasClass('zm-chioceFile-inputBaseColor');
            if(event.type == 'mouseenter'){
                if(ifRename){
                    $this.find('input[type=text]').on('mouseenter',function () {
                        event.stopPropagation();
                    });
                }else {
                    $this.find('.zm-chioceFile-fileEdit').stop(true,false).fadeIn(200);
                    $this.find('.zm-choiceFile-videoPreview').stop(true,false).fadeIn(200);
                }
            }else {
                $this.find('.zm-chioceFile-fileEdit').stop(true,false).fadeOut();
                $this.find('.zm-choiceFile-videoPreview').stop(true,false).fadeOut();
            }
        });
    },
    //input搜索框获取焦点/失去焦点
    choiceFileInputIsFocus:function () {
        var seachInput = $('.zm-choiceRadio-topR').find('.zm-choiceFile-searchalbum');
        var fileInput = $('.zm-choiceFile-fileLi').find('.zm-chioceFile-fileName').find('input[type=text]');
        $(document.body).off('click').on('click',fn);
        function fn(){
            var seachName = seachInput.is(':focus');
            var fileName = fileInput.is(':focus');
            if(false == seachName){
                // seach输入框失去焦点
                seachInput.removeAttr('id','zm-chioceFile-inputBorderBaseColor');
                seachInput.siblings('.zm-choiceFile-sceahIcon').removeClass('iconColor1').addClass('iconColor4');
            }else{
                seachInput.attr('id','zm-chioceFile-inputBorderBaseColor');
                seachInput.siblings('.zm-choiceFile-sceahIcon').removeClass('iconColor4').addClass('iconColor1');
                // seach输入框获得焦点
            }
            if(false != fileName){
                // 文件名获得焦点
                fileInput.on('click',function () {
                    // event.stopPropagation();
                });
            }
        }
    },
    //批量删除---顶部功能区
    batchDelPic:function (obj) {
        $('.zm-choiceFile-middleBoxList1').on('click','.zm-choiceFile-batchDel',function () {
            var logSign=$(this).closest(".zm-choiceFile-middleBoxList").find(".zm-chioceFile-checkSign");
            if(logSign.length === 0 || $(this).hasClass('zm-choiceFile-prohibit')){
                return
            }
            var category = obj.modules;
            var thisCategory = $('.zm-classListC-check');
            var fFirstCategory = thisCategory.attr('data-fParentId') || thisCategory.closest('li').attr('data-fParentId');
            var fSecondCategory = thisCategory.attr('data-id') || thisCategory.closest('li').attr('data-id');
            var tempData = [];
            var msg, list;
            switch (category) {
                case 'radio':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'album':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'picture':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });

                    break;
                case 'video':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fInfoId');
                        tempData.push(list);
                    });
                    break;
                case 'news':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'blogger':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'goods':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'service':
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
                case 'file':
                    msg = '确定要删除文件么。';
                    logSign.each(function (i,ele) {
                        list = $(ele).attr('data-fid');
                        tempData.push(list);
                    });
                    break;
            }
            if(logSign.length){
                if($(this).parents('.zm-choiceFile-middleBoxList').find('.zm-chioceFile-recycle').hasClass('zm-classListC-check')){
                    switch (category) {
                        case 'radio':
                            msg = '从回收站中删除音频将导致文件永久被删除!';
                            break;
                        case 'album':
                            msg = '从回收站中删除专辑将导致文件永久被删除！';
                            break;
                        case 'picture':
                            msg = '从回收站中删除图片将导致文件永久被删除！';
                            break;
                        case 'video':
                            msg = '从回收站中删除视频将导致文件永久被删除！';
                            break;
                        case 'goods':
                            msg = '从回收站中删除产品将导致文件永久被删除！';
                            break;
                        case 'service':
                            msg = '从回收站中删除服务将导致文件永久被删除！';
                            break;
                    }
                }
                if(!thisCategory.length || thisCategory.hasClass('zm-choicePicture-allPicture') || thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                    switch (category) {
                        case 'radio':
                            msg = '确认从专辑中移除音频么。';
                            break;
                        case 'album':
                            msg = '被删除的专辑中的音频将被转移至“未分配专辑”文件夹，确定要删除所选择专辑么？';
                            break;
                        case 'picture':
                            msg = '确认删除图片到回收站么！';
                            break;
                        case 'video':
                            msg = '确认删除视频到回收站么！';
                            break;
                        case 'goods':
                            msg = '确认删除产品到回收站么！';
                            break;
                        case 'service':
                            msg = '确认删除服务到回收站么！';
                            break;
                        case 'blogger':
                            msg = '确认删除博客么！';
                            break;
                        case 'file':
                            msg = '确定要删除文件么。';
                            break;
                        case 'news':
                            msg = '确认删除新闻么。';
                            break;
                    }
                }
                choicePopUpCommon.affirmDelete(msg);
                $('.zm-choiceFile-cancel').on('click',cancelDel);
                $('.zm-choiceFile-confirm').on('click',confirmDel);
                function cancelDel() {
                    $(this).closest('.zm-dialog-box.zm-movableBox').remove();
                }
                function confirmDel() {
                    var sendData, result;
                    var ids = tempData.join(',');
                    switch (category){
                        case 'picture':
                            picture();
                            break;
                        case 'video':
                            sendData = {fIds: ids};
                            break;
                        case 'radio':
                            radio();
                            break;
                        case 'goods':
                            sendData = {fId: ids};
                            break;
                        case 'album':
                            sendData = {albumIds: ids, relDelete: 'false'};
                            break;
                        case 'blogger':
                        case 'service':
                        case 'file':
                        case 'news':
                            sendData = {ids: ids};
                            break;
                    }
                    sendFn(sendData, category);
                    function sendFn(sendData, category) {
                        result = (category == 'album') ? choicePopUpRoute.choicePictureDelCategory(sendData, category) : choicePopUpRoute.choicePictureDeletePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            logSign.remove();
                            $('.zm-choiceFile-confirm').closest('.zm-dialog-box.zm-movableBox').remove();
                        }else {
                            choicePopUpCommon.choiceIKnow('接口返回错误--未执行成功');
                        }
                        choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
                    }
                    function radio() {
                        if(!thisCategory.length || thisCategory.hasClass('zm-choicePicture-allPicture') || thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                            sendData = {audioids:ids,action: 1};
                        }else if(thisCategory.hasClass('zm-chioceFile-recycle')){
                            sendData = {audioids:ids,action: 2};
                        }else {
                            sendData = {audioids:ids,action: 'null', fAlbumId: fSecondCategory};
                        }
                    }
                    function picture() {
                        if(!thisCategory.length || thisCategory.hasClass('zm-choicePicture-allPicture') || thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                            sendData = {ids:ids,deleteType: 'DELETEINTOTRASH'};
                        }else if(thisCategory.hasClass('zm-chioceFile-recycle')){
                            sendData = {ids:ids,deleteType: 'REALDELETE'};
                        }else {
                            if(!fFirstCategory){
                                fFirstCategory = fSecondCategory;
                                sendData = {ids:ids,deleteType: 'REMOVEFROMCATEGORY', firstCategory: fFirstCategory};
                            }else {
                                sendData = {ids:ids,deleteType: 'REMOVEFROMCATEGORY', firstCategory: fFirstCategory, secondCategory: fSecondCategory};
                            }
                        }
                    }
                }
            }
        });
    },
    //点击图片上删除小图标事件
    choicePicDelete:function (obj) {
        var listBox = $('.zm-chioceFile-zmpicLists');
        var msg = '';
        var modules = obj.modules;
        listBox.on('click','.zm-chioceFile-delIcon',function () {
            var $this = $(this);
            var category = $this.closest('.zm-choiceRadio-middle').attr('data-type');
            var thisCategory = $('.zm-classListC-check');
            var fFirstCategory = thisCategory.attr('data-fParentId') || thisCategory.closest('li').attr('data-fParentId');
            var fSecondCategory = thisCategory.attr('data-id') || thisCategory.closest('li').attr('data-id');
            if($this.parents('.zm-choiceFile-middleBoxList').find('.zm-chioceFile-recycle').hasClass('zm-classListC-check')){
                switch (category) {
                    case 'radio':
                        msg = '从回收站中删除音频将导致文件永久被删除!';
                        break;
                    case 'album':
                        msg = '从回收站中删除专辑将导致文件永久被删除！';
                        break;
                    case 'picture':
                        msg = '从回收站中删除图片将导致文件永久被删除！';
                        break;
                }
            }else {
                switch (category) {
                    case 'radio':
                        msg = '确定要删除音频到回收站么。';
                        break;
                    case 'album':
                        msg = '被删除的专辑中的音频将被转移至“未分配专辑”文件夹，确定要删除所选择专辑么？';
                        break;
                    case 'picture':
                        msg = '确认从分类中移除图片么。';
                        break;
                    case 'file':
                        msg = '确定要删除文件么?';
                        break;
                }
            }
            choicePopUpCommon.affirmDelete(msg);
            $('.zm-choiceFile-cancel').on('click',cancelDel);
            $('.zm-choiceFile-confirm').on('click',confirmDel);
            function cancelDel(event) {
                event.stopPropagation();
                $(this).closest('.zm-dialog-box.zm-movableBox').remove();
            }
            function confirmDel(event) {
                event.stopPropagation();
                var thisLi = $this.closest('li');
                var sendData, result;
                if (modules == 'picture'){
                    picture();
                }else if(modules == 'radio'){
                    radio();
                }else if(modules == 'album'){
                    album();
                }else if(modules == 'file'){
                    file();
                }
                function file() {
                    sendData = {ids:thisLi.attr('data-fid')};
                    result = choicePopUpRoute.choicePictureDeletePicture(sendData, modules);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        $this.closest('li').remove();
                        $('.zm-choiceFile-confirm').closest('.zm-dialog-box.zm-movableBox').remove();
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
                function album() {
                    sendData = {albumIds:thisLi.attr('data-fid'), relDelete: 'false'};
                    result = choicePopUpRoute.choicePictureDelCategory(sendData, modules);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        $this.closest('li').remove();
                        $('.zm-choiceFile-confirm').closest('.zm-dialog-box.zm-movableBox').remove();
                    }else {
                        choicePopUpCommon.choiceIKnow('接口返回错误--未执行成功');
                    }
                }
                function radio() {
                    if(!thisCategory.length || thisCategory.hasClass('zm-choicePicture-allPicture') || thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                        sendData = {audioids:thisLi.attr('data-fid'),action: 1};
                    }else if(thisCategory.hasClass('zm-chioceFile-recycle')){
                        sendData = {audioids:thisLi.attr('data-fid'),action: 2};
                    }else {
                        sendData = {audioids:thisLi.attr('data-fid'), fAlbumId: fSecondCategory};
                    }
                    result = choicePopUpRoute.choicePictureDeletePicture(sendData, modules);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        $this.closest('li').remove();
                        $('.zm-choiceFile-confirm').closest('.zm-dialog-box.zm-movableBox').remove();
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
                function picture() {
                    if(!thisCategory.length || thisCategory.hasClass('zm-choicePicture-allPicture') || thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                        sendData = {ids:thisLi.attr('data-fid'),deleteType: 'DELETEINTOTRASH'};
                    }else if(thisCategory.hasClass('zm-chioceFile-recycle')){
                        sendData = {ids:thisLi.attr('data-fid'),deleteType: 'REALDELETE'};
                    }else {
                        if(!fFirstCategory){
                            sendData = {ids:thisLi.attr('data-fid'),deleteType: 'REMOVEFROMCATEGORY', firstCategory: fSecondCategory};
                        }else {
                            sendData = {ids:thisLi.attr('data-fid'),deleteType: 'REMOVEFROMCATEGORY', firstCategory: fFirstCategory, secondCategory: fSecondCategory};
                        }
                    }
                    result = choicePopUpRoute.choicePictureDeletePicture(sendData, modules);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        $this.closest('li').remove();
                        $('.zm-choiceFile-confirm').closest('.zm-dialog-box.zm-movableBox').remove();
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
                choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
            }
            return false;
        });
    },
    //图片Icon提示
    choiceFileIconHint:function () {
        var box = $('.zm-choiceFile-middleBox');
        box.on('mouseenter mouseleave','.zm-chioceFile-fileEdit>span' ,function (event) {
            var $this = $(this);
            (event.type == 'mouseenter') ? ($this.find('.zm-choiceFile-txtTitleBox').stop(true,false).fadeIn(1000)) : ($this.find('.zm-choiceFile-txtTitleBox').stop(true,false).fadeOut());
        })
    },
    //滚动条---含下拉加载事件触发
    zmChoiceFileScroll:function () {
        $(".zm-choiceRadio-middleR.zm-chioceFile-zmpicLists").mCustomScrollbar({theme:"minimal", callbacks: {
            onTotalScroll: function () {
                var $this = $(this);
                var modules = $this.closest('.zm-choiceFile-middleBoxList').attr('data-type');
                switch (modules){//下拉加载
                    case 'myPicture':
                        choicePopUpCommon.choiceModulesUploadMore.picture(modules, $this);
                        break;
                    case 'zmPicture':
                        choicePopUpCommon.choiceModulesUploadMore.pictureFree(modules, $this);
                        break;
                    case 'myVideo':
                        choicePopUpCommon.choiceModulesUploadMore.video(modules, $this);
                        break;
                    case 'zmVideo':
                        choicePopUpCommon.choiceModulesUploadMore.videoFree(modules, $this);
                        break;
                    case 'file':
                        choicePopUpCommon.choiceModulesUploadMore.file(modules, $this);
                        break;
                    case 'composer':
                        choicePopUpCommon.choiceModulesUploadMore.composer(modules, $this);
                        break;
                    case 'blogger':
                        choicePopUpCommon.choiceModulesUploadMore.blogger(modules, $this);
                        break;
                    case 'service':
                        choicePopUpCommon.choiceModulesUploadMore.service(modules, $this);
                        break;
                    case 'radio':
                        choicePopUpCommon.choiceModulesUploadMore.radio(modules, $this);
                        break;
                    case 'album':
                        choicePopUpCommon.choiceModulesUploadMore.album(modules, $this);
                        break;
                    case 'news':
                        choicePopUpCommon.choiceModulesUploadMore.news(modules, $this);
                        break;
                }
            },
            whileScrolling: function () {

            }
        }});
        $('.zm-choiceFile-wrap').closest('.zm-dialog-box.zm-movableBox').addClass('zm-choiceFile-wrapShadow')
            .find('.zm-dialog-header-btn.zm-dialog-close').addClass('zm-dialog-choiceFileCloseBtn')
            .html(choicePopUpCommon.closeBtnSvg);
        $("#zm-choicePic-scroll").mCustomScrollbar({theme:"minimal"});
        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
        choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
    },
    //下拉加载事件处理uploadMore
    choiceModulesUploadMore: {
        news:function (modules, $this) {
            var aa, searchTxt, checkedCategory, fFirstCategory, fSecondCategory, pageSize, pageNumber;
            checkedCategory = $('.zm-classListC-check');
            fFirstCategory = checkedCategory.parent().attr('data-id');
            fSecondCategory = checkedCategory.attr('data-id');
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 10;
            switch (true){
                case checkedCategory.length == 0:
                case checkedCategory.hasClass('zm-choicePicture-allPicture'):
                    aa = {iDisplayLength: pageSize, currPage: pageNumber, fNewsType:  -1, fRegularFileName: searchTxt};
                    break;
                default:
                    aa = {iDisplayLength: pageSize, currPage: pageNumber, fNewsType: -1, fFristNewItemId: fFirstCategory, fSecondNewItemId: fSecondCategory, fRegularFileName: searchTxt};
                    break;
            }
            choicePopUpCommon.choiceUploadData.newsRendering(aa, modules, $this, pageSize, true);
        },
        radio:function (modules, $this) {
            var aa, searchTxt, pageSize, pageNumber;
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 28;
            aa = {fName: searchTxt, iDisplayLength: pageSize, iDisplayStart: (pageNumber - 1)*pageSize};
            var pictureListData = choicePopUpRoute.choicePictureLists(aa, modules);//ajax获取数据
            choicePopUpRendering.radioListRendering(pictureListData, true);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(pictureListData, $this, pageSize);
        },
        album:function (modules, $this) {
            var aa, searchTxt, pageSize, pageNumber;
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 36;
            aa = {fName: searchTxt, iDisplayLength: pageSize, iDisplayStart: (pageNumber - 1)*pageSize};
            var pictureListData = choicePopUpRoute.choicePictureLists(aa, modules);//ajax获取数据
            choicePopUpRendering.albumListRendering(pictureListData, true);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(pictureListData, $this, pageSize);
        },
        pictureFree:function (modules, $this) {
            var aa, searchTxt, checkedCategory, CategoryId, pageSize, pageNumber;
            checkedCategory = $('.zm-classListC-check');
            CategoryId = checkedCategory.attr('data-id');
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 28;
            switch (true){
                case checkedCategory.length == 0:
                case checkedCategory.hasClass('zm-choicePicture-allPicture'):
                    aa = {type: 'all', iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: true};
                    break;
                case checkedCategory.hasClass('zm-choicePicture-weiFenPei'):
                    aa = {type: 'unDistributed', iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: true};
                    break;
                default:
                    aa = {fid: CategoryId, iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: false};
                    break;
            }
            choicePopUpCommon.choiceUploadData.pictureRendering(aa, modules, $this, pageSize, true);
        },
        videoFree: function (modules, $this) {
            var aa, searchTxt, checkedCategory, CategoryId, pageSize, pageNumber;
            checkedCategory = $('.zm-classListC-check');
            CategoryId = checkedCategory.attr('data-id');
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 20;
            switch (true){
                case checkedCategory.length == 0:
                case checkedCategory.hasClass('zm-choicePicture-allPicture'):
                    aa = {type: 'all', iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: true};
                    break;
                case checkedCategory.hasClass('zm-choicePicture-weiFenPei'):
                    aa = {type: 'unDistributed', iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: true};
                    break;
                default:
                    aa = {fid: CategoryId, iDisplayStart: (pageNumber - 1)*pageSize, iDisplayLength: pageSize, fRegularFileName: searchTxt, typeFlag: false};
                    break;
            }
            choicePopUpCommon.choiceUploadData.videoRendering(aa, modules, $this, pageSize, true);
        },
        file:function (modules, $this) {
            var aa, searchTxt, pageSize, pageNumber;
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 2;
            aa = {fStageName: searchTxt, iDisplayLength: pageSize, iDisplayStart: (pageNumber - 1)*pageSize};
            var pictureListData = choicePopUpRoute.choicePictureLists(aa, modules);//ajax获取数据
            choicePopUpRendering.fileListRendering(pictureListData, true);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(pictureListData, $this, pageSize);
        },
        composer: function (modules, $this) {
            var aa, searchTxt,pageSize, pageNumber;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            pageSize = 36;
            aa = {fStageName: searchTxt, iDisplayLength: pageSize, iDisplayStart: (pageNumber - 1)*pageSize};
            var pictureListData = choicePopUpRoute.choicePictureLists(aa, modules);//ajax获取数据
            choicePopUpRendering.fileListRendering(pictureListData, true);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(pictureListData, $this, pageSize);
        },
        blogger:function (modules, $this) {
            var aa, searchTxt, pageSize, pageNumber;
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 5;
            aa = {selectInfo: searchTxt,descOrAsc: 'asc', iDisplayLength: pageSize, iDisplayStart: (pageNumber - 1)*pageSize + 1, sortBy: 'fBlogCode'};
            var pictureListData = choicePopUpRoute.choicePictureLists(aa, modules);//ajax获取数据
            choicePopUpRendering.bloggerListRendering(pictureListData, true);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(pictureListData, $this, pageSize);
        },
        video:function (modules, $this) {
            var aa, checkedCategory, searchTxt, fFirstCategory, fSecondCategory, pageSize, pageNumber;
            checkedCategory = $('.zm-classListC-check');
            fFirstCategory = checkedCategory.attr('data-fParentId');
            fSecondCategory = checkedCategory.attr('data-id');
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            pageSize = 20;
            aa = checkedCategory.length ? choicePopUpCommon.choiceUploadData.video(checkedCategory, pageSize, pageNumber, fFirstCategory, fSecondCategory, searchTxt) : {fIsTrash: 0,pLength: pageSize,pStart:  (pageNumber - 1)*pageSize};
            choicePopUpCommon.choiceUploadData.videoRendering(aa, modules, $this, pageSize, true);
        },
        picture:function (modules, $this) {
            var aa, checkedCategory, searchTxt, fFirstCategory, fSecondCategory, pageSize = 28, pageNumber;
            checkedCategory = $('.zm-classListC-check');
            fFirstCategory = checkedCategory.attr('data-fParentId');
            fSecondCategory = checkedCategory.attr('data-id');
            pageNumber = $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber') || 2;
            $this.closest('.zm-choiceFile-middleBoxList').attr('data-pageNumber', (Number(document.modulesPageNumber) + 1));
            document.modulesPageNumber ++;
            searchTxt = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchalbum').val().trim().toLowerCase();
            aa = checkedCategory.length ? choicePopUpCommon.choiceUploadData.picture(checkedCategory, pageSize, pageNumber, fFirstCategory, fSecondCategory, searchTxt) : {fIsTrash: 0,iDisplayLength: pageSize,iDisplayStart:  (pageNumber - 1)*pageSize, fRegularName: searchTxt};
            choicePopUpCommon.choiceUploadData.pictureRendering(aa, modules, $this, pageSize, true);
        }
    },
    //下拉加载数据处理uploadMore
    choiceUploadData:{
        uploadMoreHide:function (dataLists, $this, pageSize) {
            switch (true){
                case dataLists.data.length  === 0 :
                case dataLists.data.length % pageSize !== 0 :
                    $this.closest('.zm-choiceRadio-middle').find('.zm-choicePicture-uploadMore').show().text('没有更多了o(╥﹏╥)o');
                    break;
                case dataLists.data.length % pageSize === 0 :
                    $this.closest('.zm-choiceRadio-middle').find('.zm-choicePicture-uploadMore').show().text('下拉加载更多');
                    break;
            }
            if($this.closest('.zm-choiceRadio-middle').find('.zm-classListC-check').hasClass('zm-chioceFile-recycle')){
                choicePopUpCommon.choiceFileRecleChecked($this.closest('.zm-choiceRadio-middle').find('.zm-classListC-check'));
            }
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        },
        newsRendering:function (sendData, modules, $this, pageSize, flag) {
            var dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//ajax获取数据
            choicePopUpRendering.newsListRendering(dataLists, flag);
            choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
        },
        pictureRendering:function (sendData, modules, $this, pageSize, flag) {
            var dataLists, url;
            switch (true){
                case sendData.typeFlag:
                    delete sendData.typeFlag;
                    dataLists = choicePopUpRoute.choicePictureLists(sendData, 'pictureFree');//ajax获取图片数据
                    choicePopUpRendering.zmPicListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
                case sendData.typeFlag === false:
                    delete sendData.typeFlag;
                    url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryCategory ';
                    dataLists = choicePopUpAJAX.choiceFileAJAXFunction(sendData, url);
                    choicePopUpRendering.zmPicListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
                default :
                    dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//ajax获取图片数据
                    choicePopUpRendering.picListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
            }
        },
        videoRendering:function (sendData, modules, $this, pageSize, flag) {
            var dataLists, url;
            switch (true){
                case sendData.typeFlag:
                    delete sendData.typeFlag;
                    dataLists = choicePopUpRoute.choicePictureLists(sendData, 'videoFree');//ajax获取图片数据
                    choicePopUpRendering.zmVideoListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
                case sendData.typeFlag === false:
                    delete sendData.typeFlag;
                    url = '/manage-api/video/webbuilder-api/videoFreeExternal/queryByCategoryList';
                    dataLists = choicePopUpAJAX.choiceFileAJAXFunction(sendData, url);
                    choicePopUpRendering.zmVideoListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
                default :
                    dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//ajax获取图片数据
                    choicePopUpRendering.videoListRendering(dataLists, flag);
                    choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
                    break;
            }
        },
        blogger:function () {},
        video:function (thisCategory, pageSize, pageNumber, fFirstCategory, fSecondCategory, searchTxt) {

            var sendData;
            if( thisCategory.hasClass('zm-choicePicture-allPicture')){//获取全部图片
                sendData = {fName: searchTxt, pStart: (pageNumber - 1)*pageSize, pLength: pageSize};
            }else if(thisCategory.hasClass('zm-choicePicture-weiFenPei')){//获取未分配类目的图片
                sendData = {fName: searchTxt, pStart: (pageNumber - 1)*pageSize, pLength: pageSize};
            }else if(thisCategory.hasClass('zm-chioceFile-recycle')){//获取回收站图片
                sendData = {isTrash: 1,fName: searchTxt, pStart: (pageNumber - 1)*pageSize, pLength: pageSize};
            }else {
                if(!fSecondCategory){
                    sendData = {firstCId: fFirstCategory, fName: searchTxt, pStart: (pageNumber - 1)*pageSize, pLength: pageSize};
                }else {
                    sendData = {secondCId: fSecondCategory, fName: searchTxt, pStart: (pageNumber - 1)*pageSize, pLength: pageSize};
                }
            }
            return sendData;
        },
        picture:function (checkedCategory, pageSize, pageNumber, fFirstCategory, fSecondCategory, searchTxt) {

            var sendData;
            if(checkedCategory.hasClass('zm-choicePicture-allPicture')){
                sendData = {fIsTrash: 0,iDisplayLength: pageSize,iDisplayStart: (pageNumber - 1)*pageSize, fRegularName: searchTxt};
            }else if(checkedCategory.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {fIsTrash: 0, fFirstCategory : -8888888888888888,iDisplayLength: pageSize,iDisplayStart: (pageNumber - 1)*pageSize, fRegularName: searchTxt};
            }else if(checkedCategory.hasClass('zm-chioceFile-recycle')){
                sendData = {fIsTrash: 1,iDisplayLength: pageSize,iDisplayStart: (pageNumber - 1)*pageSize, fRegularName: searchTxt};
            }else {
                if(!fFirstCategory){
                    fFirstCategory = fSecondCategory;
                    sendData = {fIsTrash: 0, fFirstCategory : fFirstCategory,iDisplayLength:pageSize,iDisplayStart: (pageNumber - 1)*pageSize, fRegularName: searchTxt};
                }else {
                    sendData = {fIsTrash: 0, fFirstCategory : fFirstCategory, fSecondCategory:fSecondCategory,iDisplayLength:pageSize,iDisplayStart: (pageNumber - 1)*pageSize, fRegularName: searchTxt};
                }
            }
            return sendData;
        }
    },
    //删除大类目
    deleteBigCatalog:function () {
        var setIconParent = $('.zm-choicePicture-middleLTop');
        var msg = '该类目下有子分类，请先删除子分类';
        setIconParent.on('click','.zm-chioceFile-bigCataDle',delBigCatalog);
        function delBigCatalog() {
            var $this = $(this);
            var childrenCataLength = $this.closest('li').find('ul li').length;
            var fileLength = $this.closest('.zm-choiceRadio-middle').find('.zm-choiceRadio-middleR li').length;
            var category = $this.parents('.zm-choiceRadio-middle').attr('data-type');
            var thisLi = $this.closest('li');
            var result, sendData;
            if($this.hasClass('.zm-choiceFile-prohibit')){
                msg = '至少保留一个类目';
                choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
                return;
            }
            if (childrenCataLength !== 0){
                //目录下还有子分类的删除提示
                $this.parent().hide();
                choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
            }else {
                if(fileLength !== 0){
                    //目录下还有内容的删除提示
                    switch (category){
                        case 'picture':
                            msg = '该类目下有图片，请先删除或转移到其他文件夹';
                            break;
                        case 'news':
                            msg = '该类目下有新闻，请先删除新闻';
                            break;
                        case 'video':
                            msg = '该类目下有视频，请先删除视频';
                            break;
                        case 'goods':
                            msg = '该类目下有产品，请先删除产品！';
                            break;
                        case 'service':
                            msg = '该类目下有服务，请先删除服务！';
                            break;
                    }
                    $this.parent().hide();
                    choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
                }else {
                    switch (category){
                        case 'picture':
                            sendData = {fID:thisLi.attr('data-id')};
                            break;
                        case 'news':
                            sendData = {Id:thisLi.attr('data-id')};
                            break;
                        case 'video':
                            sendData = {cID:thisLi.attr('data-id')};
                            break;
                        case 'goods':
                            sendData = {categoryId:thisLi.attr('data-id')};
                            break;
                        case 'service':
                            sendData = {categoryId:thisLi.attr('data-id')};
                            break;
                    }
                    result = choicePopUpRoute.choicePictureDelCategory(sendData, category);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误----接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        $this.closest('li').remove();
                        choicePopUpCommon.clsListsIcon()
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                }
            }
        }
    },
    //删除小类目---含音频类目（专辑）
    deleteCatalog:function () {
        var setIconParent = $('.zm-choicePicture-middleLTop');
        var msg = '';
        setIconParent.on('click','.zm-chioceFile-cataDle',delCatalog);
        // 删除类目
        function delCatalog(){
            var $this = $(this);
            var thisLi = $this.closest('li');
            var category = $this.parents('.zm-choiceRadio-middle').attr('data-type');
            var fileLength = $this.closest('.zm-choiceRadio-middle').find('.zm-choiceRadio-middleR li').length;
            var sendData,len, result;
            if(fileLength !== 0){
                switch (category){
                    case 'picture':
                        msg = '该类目下有图片，请先删除或转移到其他文件夹';
                        break;
                    case 'news':
                        msg = '该类目下有新闻，请先删除新闻';
                        break;
                    case 'video':
                        msg = '该类目下有视频，请先删除视频';
                        break;
                    case 'radio':
                        msg = '该专辑有音频作品，请先移除音频到其他专辑！';
                        break;
                    case 'goods':
                        msg = '该类目下有产品，请先删除产品！';
                        break;
                    case 'service':
                        msg = '该类目下有服务，请先删除服务！';
                        break;
                }
                //目录下还有内容的删除提示
                $this.parent().hide();
                choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
            }else {
                switch (category){
                    case 'picture':
                        sendData = {fID:thisLi.attr('data-id')};
                        break;
                    case 'news':
                        sendData = {Id:thisLi.attr('data-id')};
                        break;
                    case 'video':
                        sendData = {cID:thisLi.attr('data-id')};
                        break;
                    case 'radio':
                        sendData = {albumIds:thisLi.attr('data-id'), relDelete: 'false'};
                        break;
                    case 'goods':
                        sendData = {categoryId:thisLi.attr('data-id')};
                        break;
                    case 'service':
                        sendData = {categoryId:thisLi.attr('data-id')};
                        break;
                }
                len = $this.closest('li').siblings().length;
                result = choicePopUpRoute.choicePictureDelCategory(sendData,category);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误----接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    $(this).parent().parent().parent().remove();
                    if(!len){
                        choicePopUpCommon.clsListsIcon();
                    }
                }else {
                    // choicePopUpCommon.choiceIKnow(result.message);
                }
            }
        }
    },
    //点击小图标下载download----图片
    choiceFileDownload:function (obj) {
        var url;
        if (obj.modules == 'picture'){
            url = '/picture/webbuilder-api/shopPicture/downloadImg?url=';
        }else if(obj.modules == 'file'){
            url = '/file/webbuilder-api/shopFile/downloadImg?url=';
        }else if(obj.modules == 'radio'){
            url = '/radio/webbuilder-api/shopRadio/downloadImg?url=';
        }
        $(document).on('click','.zm-chioceFile-download',function (event) {
            event.stopPropagation();
            var form = document.createElement("form");
            var obj = $(this).closest('li').attr('data-fsrc');
            var fileName = $(this).closest('li').attr('data-fname');
            form.id = "form";
            form.name = "form";
            document.body.appendChild(form);
            form.action = url + obj + "&fileName=" + fileName;
            form.method = "POST";
            form.submit();
            document.body.removeChild(form);
        });
    },
    //类目选中改变样式---点击选中以及hover
    choiceCatalogEvent:function () {
        var fileClsBox = $('.zm-choiceRadio-middle');
        $('.zm-chioceFile-minusIcon').hide();
        $('.zm-chioceFile-addIcon').show();
        $('.zm-chioceFile-isRename').hide();
        $('.zm-choiceFile-btn2None.zm-choiceFile-revFile').hide();
        fileClsBox.on('mouseenter mouseleave click','.zm-chioceFile-clsLists',lisFn);
        fileClsBox.on('mouseenter mouseleave','.zm-chioceFile-addIcon',iconFn);
        choicePopUpCommon.clsListsIcon();
        //目录改变样式---点击选中以及hover
        function lisFn(event){
            var $this = $(this);
            var ifRename = $this.find('input[type=text]');
            if (event.type == 'mouseenter') {
                //鼠标移上类目样式
                if(ifRename.hasClass('zm-choiceFile-catalogWarnBorder') || ifRename.hasClass('zm-choiceFile-catalogBorder')){
                    $this.find('input[type=text]').on('mouseenter',function () {
                        event.stopPropagation();
                    });
                }else{
                    if(!($this.hasClass('zm-classListC-check'))){
                        $this.addClass('zm-chioceFile-hoverList')
                            .find('.zm-choicePicture-setIcon').removeClass('zm-choicePicture-hide iconColor0').addClass('iconColor1');
                        $this.closest('li').children('.zm-choicePicture-setIcon').show();
                        $this.children('.zm-choicePicture-setIcon').show();
                        $this.siblings().removeClass('zm-chioceFile-hoverList').find('.zm-choicePicture-setIcon').hide();
                    }else{
                        $this.closest('li').children('.zm-choicePicture-setIcon').show();
                        $this.children('.zm-choicePicture-setIcon').show();
                    }
                    return false
                }
            }else if(event.type == 'mouseleave') {
                //鼠标离开类目样式
                $this.removeClass('zm-chioceFile-hoverList').find('.zm-choicePicture-setIcon').hide();
            }else {// 点击类目添加样式
                if(document.stopClick == true){
                    if(ifRename.hasClass('zm-choiceFile-catalogWarnBorder') || ifRename.hasClass('zm-choiceFile-catalogBorder')){
                        $this.find('input[type=text]').on('click',function () {
                            event.stopPropagation();
                            $(this).focus();
                        });
                    }else{
                        var addIcon = $this.find('.zm-chioceFile-addIcon').is(':hidden');
                        var thisFind = $this.parent().find('.zm-choiceFile-catalog2');
                        if (addIcon) {
                            // console.log('现在收起子类目');
                            $this.find('.zm-chioceFile-minIcon').hide();
                            $this.find('.zm-chioceFile-addIcon').show().removeClass('iconColor4').addClass('iconColor2');
                            $this.parent().find('ul').stop().slideUp(500);
                        }else{
                            // console.log('现在展示子类目');
                            $this.find('.zm-chioceFile-addIcon').hide();
                            $this.find('.zm-chioceFile-minIcon').show().removeClass('iconColor4').addClass('iconColor2');
                            $this.parent().find('.zm-choiceFile-clsUl').stop().slideDown(500);
                            $this.parent().find('.zm-choiceFile-clsUl').find('.zm-chioceFile-addIcon').show().removeClass('iconColor2').addClass('iconColor4');
                            $this.parent().find('.zm-choiceFile-clsUl').find('.zm-chioceFile-minIcon').hide();
                            if($this.parent().hasClass('zm-choiceFile-catalog2')){
                                $this.parent().find('.zm-choiceFile-clsUl2').stop().slideDown(500);
                                $this.parent().find('.zm-choiceFile-clsUl2').find('.zm-chioceFile-addIcon').show().removeClass('iconColor2').addClass('iconColor4');
                                $this.parent().find('.zm-choiceFile-clsUl2').find('.zm-chioceFile-minIcon').hide();
                            }
                        }
                        if(!($this.parent().find('ul').find('li').length)){
                            $this.parent().find('.zm-chioceFile-minusIcon').hide().end()
                                .find('.zm-choiceFile-IconOpa0').show();
                        }else {
                            $this.parent().find('.zm-choiceFile-IconOpa0').hide();
                        }
                        thisFind.each(function (i, ele) {
                            $(ele).find('.zm-choiceFile-IconOpa0').show();
                            if($(ele).find('li').length === 0){
                                $(ele).find('.zm-chioceFile-addIcon').hide().end()
                                    .find('.zm-chioceFile-minIcon').hide();
                            }else {
                                $(ele).find('.zm-choiceFile-IconOpa0').hide();
                            }
                        });
                        if($this.hasClass('zm-classListC-check')){
                            return;
                        }
                        $('.zm-choiceFile-searchNone').hide();
                        //zm-classListC-check 用来标记被点击的元素
                        $this.siblings().find('.zm-choicePicture-setIcon').hide();
                        $this.find('.zm-choicePicture-setIcon').show();
                        //点击一级目录去除其他一级目录样式
                        $this.parent().siblings().find('.zm-chioceFile-clsLists').removeClass('zm-chioceFile-checkedList zm-classListC-check');
                        // 点击一级目录去除子集目录样式
                        $this.parent().find('.zm-classListC-check').removeClass('zm-chioceFile-checkedList zm-classListC-check');
                        //点击二级目录去除其他一级目录、二级目录样式
                        $this.parents('.zm-choicePicture-middleLTop').find('.zm-chioceFile-clsLists').removeClass('zm-chioceFile-checkedList zm-classListC-check');
                        //点击给自身添加样式
                        $this.addClass('zm-chioceFile-checkedList zm-classListC-check')
                            .siblings().removeClass('zm-chioceFile-checkedList zm-classListC-check')
                            .find('.zm-choicePicture-setIcon').removeClass('iconColor1 iconColor0').addClass('zm-choicePicture-hide');
                        $this.parent().find('.zm-choicePicture-setIcon').removeClass('iconColor1 zm-choicePicture-hide').addClass('iconColor0');
                        $this.parents('.zm-chioceFile-cataLogCls').find('.zm-chioceFile-addIcon').removeClass('iconColor2').addClass('iconColor4');
                        $this.find('.zm-chioceFile-addIcon').removeClass('iconColor4').addClass('iconColor2');
                        $this.parent().siblings().find('.zm-choiceFile-delPicLib').removeClass('iconColor2').addClass('iconColor4');

                        choicePopUpCommon.choiceFileCategoryCheckedRequest($this);
                        choicePopUpCommon.choiceFileRecleChecked($this);

                    }
                }
            }
            document.stopClick = true;
        }
        // 加减符号hover样式
        function iconFn(event) {
            var $this = $(this);
            var a = $this.parent().hasClass('zm-classListC-check');
            if (event.type == 'mouseenter') {
                $this.removeClass('iconColor4').addClass('iconColor2');
            }else {
                if(!a){
                    $this.removeClass('iconColor2').addClass('iconColor4');
                }
            }
        }
    },
    //回收站选中样式
    choiceFileRecleChecked:function (_this) {
        //回收站相关
        var classCategory = _this.parents('.zm-choiceRadio-middle').attr('data-type');
        var picWhiteShade;
        var recycleLis = _this.parents('.zm-choiceRadio-middle').find('li.zm-choiceFile-fileLi');
        var revIcon = '<span class="zm-chioceFile-restore"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 555.4 554.4"><g><path d="M6.5,222.2C2.2,217,0,210.9,0,204L0.4,68.5c0-6.1,2.2-11.7,5.6-16c2.6-3,5.6-6.1,9.5-7.8   c9.1-4.3,20.4-3,28.6,3.4L65.8,65l18.2,14.3C135.7,28.7,207.2-2.1,286,0.1C430.3,4,548.6,120,555.1,264.3   c7.4,158.9-119.5,290.1-276.9,290.1c-92.7,0-174.6-45.4-225-115.2c-13.8-19.5-7-46.8,14.7-56.7c17.8-8.2,39-3,50.3,13   c37.3,50.2,98.4,82.2,166.4,79.7c102.2-3.9,185.5-87,189.4-189.2c4.3-112.6-85.8-204.8-197.2-204.8c-49.4,0-94.9,18.2-129.6,48.5   l0.5,0.5l5.6,4.3l22.1,16.9c8.2,6.5,12.6,16.9,10.4,26.9c-0.9,4.3-2.6,8.2-5.2,11.3c-3.4,4.3-8.6,7.8-14.3,9.1L34.6,231.4   c-8.2,2.2-17.4,0-24.2-5.2c-0.9-0.9-2.2-1.8-3-2.6c-0.5,0-1.3,0-1.8,0.5C6.1,223.5,6.5,222.7,6.5,222.2L6.5,222.2z"/></g></svg><span class="zm-choiceFile-txtTitleBox" style="display: none"><span class="zm-choiceFile-txtTitle">还原</span></span></span>';
        if($('.zm-chioceFile-recycle').hasClass('zm-classListC-check')){
            if(classCategory == 'goods' || classCategory == 'service') {
                _this.parents('.zm-choiceFile-middleBoxList')
                    .find('.zm-choiceFile-btn2None').hide().end()
                    .find('.zm-choiceFile-btn2None.zm-choiceFile-revFile').show();
                picWhiteShade = '<div class="zm-choiceFile-whiteShade1 zm-choiceFile-whiteShade"></div>';
                if(recycleLis.find('.zm-choiceR-goodsLists').find('.zm-choiceFile-whiteShade').length === 0) {
                    _this.parents('.zm-choiceRadio-middle').find('.zm-choiceR-goodsLists').append(picWhiteShade).end()
                        .find('.zm-choiceFile-parentP').append(picWhiteShade).end()
                        .find('.zm-choiceR-goodsLists').find('.zm-choiceFile-whiteShade:eq(1)').remove();
                }
            }else if (classCategory == 'picture' || classCategory == 'radio') {
                picWhiteShade = '<div class="zm-choiceFile-whiteShade2 zm-choiceFile-whiteShade"></div>';
                if(recycleLis.find('.zm-chioceFile-restore').length === 0){
                    $('.zm-chioceFile-renameIcon').parent().append(revIcon);
                }
                recycleLis.each(function (i,ele) {
                    if($(ele).find('.zm-choiceFile-whiteShade').length === 0) {
                        $(ele).append(picWhiteShade);
                    }
                });
            }else if(classCategory == 'video') {
                _this.closest('.zm-choiceFile-middleBoxList1').find('.zm-choiceFile-batchDel').addClass('zm-choiceFile-prohibit').end()
                    .find('.zm-choiceFile-moveToCatalog').addClass('zm-choiceFile-prohibit');
                picWhiteShade = '<div class="zm-choiceFile-whiteShade3 zm-choiceFile-whiteShade"></div>';
                if(recycleLis.find('.zm-choiceFile-whiteShade').length === 0) {
                    recycleLis.append(picWhiteShade);
                }
            }
            _this.parents('.zm-choiceFile-middleBoxList')
                .find('.zm-choiceFile-btn2.zm-choiceFile-revFile').removeClass('zm-choiceFile-prohibit')

        }else {
            if(classCategory == 'goods' || classCategory == 'service') {
                _this.parents('.zm-choiceFile-middleBoxList')
                    .find('.zm-choiceFile-btn2None').show();
                _this.parents('.zm-choiceFile-middleBoxList')
                    .find('.zm-choiceFile-btn2None.zm-choiceFile-revFile').hide();
            }
            $('.zm-chioceFile-restore').remove();
            _this.parents('.zm-choiceRadio-middle').find('li.zm-choiceFile-fileLi').find('.zm-choiceFile-whiteShade').remove();
            $('.zm-choiceFile-delPicLib').removeClass('iconColor4').addClass('iconColor4');
            _this.parents('.zm-choiceFile-middleBoxList')
                .find('.zm-choiceFile-btn2.zm-choiceFile-revFile').addClass('zm-choiceFile-prohibit');
            _this.closest('.zm-choiceFile-middleBoxList1').find('.zm-choiceFile-batchDel').removeClass('zm-choiceFile-prohibit').end()
                .find('.zm-choiceFile-moveToCatalog').removeClass('zm-choiceFile-prohibit');
        }
    },
    //类目选中请求数据处理
    choiceFileCategoryCheckedRequest:function ($this) {
        var sendData, dataLists;
        var modules = $this.closest('.zm-choicePicture-middleL').attr('data-modules');
        document.modulesPageNumber = 1;
        $this.closest('.zm-choiceRadio-middle').find('.zm-choicePicture-uploadMore').show().text('下拉加载更多');
        switch (modules){
            case 'picture':
                picture();
                break;
            case 'video':
                video();
                break;
            case 'radio':
                radio();
                break;
            case 'goods':
                goods();
                break;
            case 'service':
                service();
                break;
            case 'news':
                news();
                break;
            case 'pictureFree':
                pictureFree();
                break;
            case 'videoFree':
                videoFree();
                break;
        }
        choicePopUpCommon.choicePicCheckedNumber();//选中个数计算

        // zmChoiceRadio.choicePictureUploadMore(modules);
        function pictureFree() {

            var CategoryId =  $this.attr('data-id'),
                pageSize = 28;
            if($this.hasClass('zm-choicePicture-allPicture')) {
                sendData = {type: 'all', iDisplayStart: 0, iDisplayLength: pageSize};
                dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//ajax获取免费资源库图片数据
            }else if($this.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {type: 'unDistributed', iDisplayStart: 0, iDisplayLength: pageSize};
                dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取列表信息
            }else {
                sendData = {categoryId: CategoryId, iDisplayStart: 0, iDisplayLength: pageSize};
                var url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryCategory';
                var dataResult = choicePopUpAJAX.choiceFileAJAXFunction(sendData, url);//获取列表信息

                dataLists = dataResult.data.imagelist;
            }
            choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
            choicePopUpRendering.zmPicListRendering(dataLists);//渲染
        }
        function videoFree() {
            var CategoryId =  $this.attr('data-id'),
                pageSize = 20;
            if($this.hasClass('zm-choicePicture-allPicture')) {
                sendData = {type: 'all', iDisplayStart: 0, iDisplayLength: pageSize};
                dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取列表信息
            }else if($this.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {type: 'unDistributed', iDisplayStart: 0, iDisplayLength: pageSize};
                dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取列表信息
            }else {
                sendData = {fid: CategoryId,iDisplayStart: 0, iDisplayLength: pageSize};
                var url = '/manage-api/video/webbuilder-api/videoFreeExternal/queryByCategory';
                dataLists = choicePopUpAJAX.choiceFileAJAXFunction(sendData, url);//获取列表信息
            }
            choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
            choicePopUpRendering.zmVideoListRendering(dataLists);//渲染
        }
        function news() {
            var pageSize = 10;
            var firstCId = $this.parent().attr('data-id');
            var secondCId = $this.attr('data-id');
            var parentId = $this.attr('data-fParentId');
            if($this.hasClass('zm-choicePicture-allPicture')) {
                sendData = {iDisplayLength: pageSize, currPage: 1, iDisplayStart: 1, fNewsType:  -1};
            }else {
                if(!firstCId){
                    sendData = {iDisplayLength:pageSize, currPage: 1, iDisplayStart:1, fNewsType: -1, fFristNewItemId: parentId, fSecondNewItemId: secondCId};
                }else {
                    sendData = {iDisplayLength:pageSize, currPage: 1, iDisplayStart:1, fNewsType: -1, fFristNewItemId: firstCId};
                }
            }
            dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取列表信息
            choicePopUpRendering.newsListRendering(dataLists);//渲染
        }
        function service() {
            var firstCId = $this.attr('data-id') || $this.closest('li').attr('data-id');
            if($this.hasClass('zm-choicePicture-allPicture')){
                sendData = {pageSize: 15, fCateId: 0, pageIndex: 0}
            }else if($this.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {pageSize: 15, fCateId: -2, pageIndex: 0}
            }else if($this.hasClass('zm-chioceFile-recycle')){
                sendData = {pageSize: 15, fCateId: -1, pageIndex: 0}
            }else {
                sendData = {pageSize: 15, fCateId: firstCId, pageIndex: 0}
            }
            dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取列表信息
            choicePopUpRendering.serverListRendering(dataLists);//渲染
        }
        function goods() {
            var firstCId = $this.attr('data-id') || $this.closest('li').attr('data-id');
            if($this.hasClass('zm-choicePicture-allPicture')){
                sendData = {};
            }else if($this.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {categoryId: 'UNCLASSIFIED'};
            }else if($this.hasClass('zm-chioceFile-recycle')){
                sendData = {productStatus: -1};
            }else {
                sendData = {categoryId: firstCId};
            }
            dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取产品列表信息
            choicePopUpRendering.goodsListRendering(dataLists);//渲染产品
        }
        function radio() {
            var pageSize = 28;
            var firstCId = $this.closest('li').attr('data-id');
            if($this.hasClass('zm-choicePicture-allPicture')){
                sendData = {iDisplayStart: 0, iDisplayLength: pageSize};
            }else if($this.hasClass('zm-choicePicture-weiFenPei')){
                sendData = {noAlbumMusic: 'true', iDisplayStart: 0, iDisplayLength: pageSize};
            }else if($this.hasClass('zm-chioceFile-recycle')){
                sendData = {fDeleteState: 1, iDisplayStart: 0, iDisplayLength: pageSize};
            }else {
                sendData = {albumFid: firstCId, iDisplayStart: 0, iDisplayLength: pageSize};
            }
            dataLists = choicePopUpRoute.choicePictureLists(sendData, modules);//获取音频列表信息
            choicePopUpCommon.choiceUploadData.uploadMoreHide(dataLists, $this, pageSize);
            choicePopUpRendering.radioListRendering(dataLists);//渲染音频
        }
        function video() {
            var firstCId = $this.closest('li').attr('data-id') || $this.closest('li').closest('li').attr('data-id');
            var secondCId = $this.attr('data-id');
            sendData = choicePopUpCommon.choiceUploadData.video($this, 20, 1, firstCId, secondCId);
            choicePopUpCommon.choiceUploadData.videoRendering(sendData, modules, $this, 20, false);
        }
        function picture() {
            var fFirstCategory = $this.closest('li').attr('data-fParentId');
            var fSecondCategory = $this.closest('li').attr('data-id');
            sendData = choicePopUpCommon.choiceUploadData.picture($this, 28, 1, fFirstCategory, fSecondCategory);
            choicePopUpCommon.choiceUploadData.pictureRendering(sendData, modules, $this, 28, false);
        }
    },
    // 判断类目是否有子类目---设置类目前的图标
    clsListsIcon:function () {
        var fileClsBox = $('.zm-choiceRadio-middle');
        var cLists = fileClsBox.find('.zm-chioceFile-clsLists');
        cLists.each(function (i, ele) {
            if(!($(ele).parent().find('ul').find('li').length)){
                $(ele).parent().find('.zm-chioceFile-minusIcon').hide().end()
                    .find('.zm-choiceFile-IconOpa0').show();
            }else {
                $(ele).parent().find('.zm-choiceFile-IconOpa0').hide();
                if($(ele).find('.zm-chioceFile-minIcon').is(':hidden')){
                    $(ele).find('.zm-chioceFile-addIcon').show();
                }
            }
        })
    },
    // 重命名类目
    choiceCatalogRename:function (obj) {
        var setIconParent = $('.zm-choicePicture-middleLTop'); //侧边栏
        var oldCatalog = '';
        var modules = obj.modules;//datatype
        setIconParent.on('click','.zm-chioceFile-cataRename',renameCatalog);   //重命名
        setIconParent.on('click','.zm-chioceFile-scrollFalse',renameCatalogF); //×
        setIconParent.on('click','.zm-chioceFile-scrollTrue',renameCatalogT);  //√
        setIconParent.on('keyup','li.zm-chioceFile-clsLists .zm-chioceFile-catalogName',checkout);//重命名按下事件
        $('.zm-choiceFile-middleBoxList1').on('keyup','.zm-chioceFile-bigCatalogName',checkout2); //input按下事件
        // 点击重命名添加相应样式
        function renameCatalog(event){
            event.stopPropagation();  //阻止默认事件
            var $this = $(this);     //重命名按钮span
            //当点击重命名的时候，触发上一次重命名完成修改
            /*if(window.zmChoiceFileScrollTrue){
                window.zmChoiceFileScrollTrue.trigger("click");
            }
            var zmChoiceFileScrollTrue = $this.parent().parent().next().find('.zm-chioceFile-scrollTrue');
            window.zmChoiceFileScrollTrue = zmChoiceFileScrollTrue;*/

            var categoryLi = $this.closest('.zm-chioceFile-cataLogCls').find('li');
            categoryLi.each(function (i,ele) {
               $(ele).removeClass('zm-choiceFile-classListNameEdit').find('.zm-choiceFile-classListNameEdit').removeClass('zm-choiceFile-classListNameEdit').end()
                   .find('input').removeClass('zm-choiceFile-catalogBorder zm-choiceFile-catalogWarnBorder').attr('readonly',true).val('').end()
                   .find('.zm-chioceFile-catalogFileName').hide().end()
                   .find('.zm-chioceFile-isRename').hide()
            });
            $this.closest('.zm-choicePicture-setIcon').siblings('.zm-chioceFile-catalogName').parent().addClass('zm-choiceFile-classListNameEdit'); //字体添加颜色
            $this.parent().parent().siblings('.zm-chioceFile-isRename').show();//zm-chioceFile-isRename css样式为none此处设置为 show    让input显示
            oldCatalog = $this.parent().parent().siblings('input[type=text]').attr('placeholder');//获取input内的值（更改之前的值）
            $this.parent().parent().siblings('input[type=text]').addClass('zm-choiceFile-catalogBorder').removeAttr('readonly').focus();//添加css样式（蓝色边框） 移除只读  并获取焦点
            $this.parents('.zm-choiceFile-catalog1').find('.zm-chioceFile-addIcon').removeClass('iconColor2').addClass('iconColor4');//zm-chioceFile-addIcon  类名前的加号移除添加颜色
            $this.closest('.zm-classListC-check').removeClass('zm-chioceFile-checkedList zm-classListC-check');
            $this.parent().hide(); // 右边弹出款隐藏
        }
        //取消重命名  ×
        function renameCatalogF(event) {
            event.stopPropagation();
            var $this = $(this); // ×
            var isT = $this.parent().parent().siblings('input[type=text]');  //input框
            $this.parent().parent().hide();  //点击按钮取消
            isT.removeClass('zm-choiceFile-catalogBorder zm-choiceFile-catalogWarnBorder').attr({
                'readonly':true,
                'placeholder':oldCatalog,
                'title' :oldCatalog
            }).val('').blur();//失去焦点
            isT.parent().removeClass('zm-choiceFile-classListNameEdit');
            isT.closest('li').children('.zm-chioceFile-catalogFileName').hide(); //禁止重名影藏
        }
        //完成重命名  √
        function renameCatalogT(event) {
            event.stopPropagation();
            var $this = $(this);  //√
            var thisLi = $this.closest('li');
            var isT = $this.parent().parent().siblings('input[type=text]');
            var sendData, result;
            if(isT.hasClass('zm-choiceFile-catalogWarnBorder')){   //如果出现警告弹窗 return
                return false;
            }else {
                $this.parent().parent().hide();  //隐藏勾选
                if (isT.val() == ''){
                    modulesSaveNull();  //如果为空就用placeholder的值，并去掉相应的样式
                }else{
                    switch (modules) {
                        case 'picture':
                            sendData = {fName:isT.val(),fLevel:thisLi.attr('data-fLevel'),fId:thisLi.attr('data-id')};//data-fLevel 第几层
                            result = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                            break;
                        case 'video':
                            sendData = {cName:isT.val(),cId:thisLi.attr('data-id')};
                            result = choicePopUpRoute.choiceVideoSave(sendData);
                            break;
                        case 'radio':
                            sendData = {fName:isT.val(),fId:thisLi.attr('data-id')};
                            result = choicePopUpRoute.choiceRadioUpdateAlbum(sendData);
                            break;
                        case 'goods':
                            sendData = {fName:isT.val(),fId:thisLi.attr('data-id')};
                            result = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                            break;
                        case 'service':
                            sendData = {name:isT.val(),categoryId:thisLi.attr('data-id')};
                            result = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                            break;
                        case 'news':
                            sendData = {fName:isT.val(),fId:thisLi.attr('data-id')};
                            result = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                            break;
                    }
                    if(!result){
                        modulesSaveNull();
                        choicePopUpCommon.choiceIKnow('接口返回错误');
                        return
                    }
                    if(result.status === 0){
                        modulesSave();
                    }else {
                        modulesSaveNull();
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                    isT.parent().removeClass('zm-choiceFile-classListNameEdit');
                }
            }
            function modulesSave() {
                isT.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':isT.val(),
                    'title':isT.val()
                }).val('').blur();
            }
            function modulesSaveNull() {
                isT.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':isT.attr('placeholder'),
                    'title':isT.attr('placeholder')
                }).val('').blur();
                isT.parent().removeClass('zm-choiceFile-classListNameEdit');
            }
        }
        //命名重复校验
        function checkout2(event) {
            var $this = $(this);
            var inputBigList = $this.parents().siblings().children().children('.zm-chioceFile-catalogName');
            var thisName = $this.val().trim();
            var arr = [];
            inputBigList.each(function (i,v) {
                arr.push($(v).attr('placeholder'));
            });
            var result = $.inArray(thisName, arr);
            var nameLen = choicePopUpCommon.choiceFileGetLength(thisName);
            var thisLi, sendData, resultData;
            thisLi = $this.closest('li');
            if(nameLen > 50 ){
                $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').hide();
                $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').show();
            }else {
                if (result === -1){
                    if(thisName == '回收站'){
                        $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                        $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').hide();
                        $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').show();
                    }else{
                        $this.closest('li').children('.zm-chioceFile-catalogFileName').hide();
                        $this.removeClass('zm-choiceFile-catalogWarnBorder').addClass('zm-choiceFile-catalogBorder');
                        if (event.keyCode === 13) {

                            $this.siblings('.zm-chioceFile-isRename').hide();
                            if ($this.val() == ''){
                                modulesNull();
                            }else {
                                switch (modules) {
                                    case 'picture':
                                        sendData = {fName:$this.val(),fLevel:thisLi.attr('data-fLevel'),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'video':
                                        sendData = {fName:$this.val(),fLevel:thisLi.attr('data-fLevel'),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choiceVideoSave(sendData);
                                        break;
                                    case 'radio':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choiceRadioUpdateAlbum(sendData);
                                        break;
                                    case 'goods':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'service':

                                        sendData = {name:$this.val(),categoryId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'news':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                }
                                if(!resultData){

                                    modulesNull();
                                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                                    return
                                }
                                if(resultData.status === 0){
                                    modulesSave();
                                }else {
                                    modulesNull();
                                    choicePopUpCommon.choiceIKnow(result.message);
                                }
                            }
                            $this.parent().removeClass('zm-choiceFile-classListNameEdit');
                        }
                    }
                }else {
                    $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                    $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').show();
                    $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').hide();
                }
            }
            function modulesSave() {
                $this.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':$this.val(),
                    'title':$this.val()
                }).val('').blur();
            }
            function modulesNull() {

                $this.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':$this.attr('placeholder'),
                    'title':$this.attr('placeholder')
                }).val('').blur();
                $this.parent().removeClass('zm-choiceFile-classListNameEdit');
                $this.closest('li').children('.zm-chioceFile-catalogFileName').hide()
            }
        }
        function checkout(event) {
            var $this = $(this);
            var inputList = $this.parents().siblings().children('.zm-chioceFile-catalogName');
            var thisName = $this.val().trim();
            var arr = [];
            inputList.each(function (i,v) {
                arr.push($(v).attr('placeholder'));
            });
            var result = $.inArray(thisName, arr);
            var nameLen = choicePopUpCommon.choiceFileGetLength(thisName);
            var thisLi, sendData, resultData;
            thisLi = $this.closest('li');
            if(nameLen > 50 ){
                $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').hide();
                $this.closest('li').children('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').show();
            }else {
                if (result === -1){
                    if(thisName == '回收站'){
                        $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                        $this.siblings('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').hide();
                        $this.siblings('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').show();
                    }else{
                        $this.siblings('.zm-chioceFile-catalogFileName').hide();
                        $this.removeClass('zm-choiceFile-catalogWarnBorder').addClass('zm-choiceFile-catalogBorder');
                        if (event.keyCode === 13) {

                            $this.siblings('.zm-chioceFile-isRename').hide();
                            if($this.val() == ''){
                                modulesSaveNull();
                            }else {
                                switch (modules) {
                                    case 'picture':
                                        sendData = {fName:$this.val(),fLevel:thisLi.attr('data-fLevel'),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'video':
                                        sendData = {fName:$this.val(),fLevel:thisLi.attr('data-fLevel'),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choiceVideoSave(sendData);
                                        break;
                                    case 'radio':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choiceRadioUpdateAlbum(sendData);
                                        break;
                                    case 'goods':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'service':
                                        sendData = {name:$this.val(),categoryId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                    case 'news':
                                        sendData = {fName:$this.val(),fId:thisLi.attr('data-id')};
                                        resultData = choicePopUpRoute.choicePictureUpDataCategory(sendData, modules);
                                        break;
                                }
                                if(!resultData){
                                    modulesSaveNull();
                                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                                    return
                                }
                                if(resultData.status === 0){
                                    modulesSave()
                                }else {
                                    modulesSaveNull();
                                    choicePopUpCommon.choiceIKnow(result.message);
                                }
                            }
                            $this.parent().removeClass('zm-choiceFile-classListNameEdit');
                        }
                    }
                }else {
                    $this.addClass('zm-choiceFile-catalogWarnBorder').removeClass('zm-choiceFile-catalogBorder');
                    $this.siblings('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarningHint').hide();
                    $this.siblings('.zm-chioceFile-catalogFileName').show().find('.zm-choiceFile-nameWarning').show();
                }
            }
            function modulesSave() {
                $this.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':$this.val(),
                    'title':$this.val()
                }).val('').blur();
            }
            function modulesSaveNull() {
                $this.removeClass('zm-choiceFile-catalogBorder').attr({
                    'readonly':true,
                    'placeholder':$this.attr('placeholder'),
                    'title':$this.attr('placeholder')
                }).val('').blur();
                $this.parent().removeClass('zm-choiceFile-classListNameEdit');
                $this.closest('li').children('.zm-chioceFile-catalogFileName').hide();
            }
        }
    },
    //拖拽类目
    catalogDragSort:function (modules) {
        //大类目
        $('.zm-choiceFile-middleBoxList1').find('.zm-choicePicture-middleLTop').eleDragSort({
            dragEle:'.zm-choiceFile-catalog1',
            callback :function (objData) {
                // 排序后的所有元素
                var eleList = $('.zm-choiceFile-middleBoxList1 .zm-choicePicture-middleLTop').find('.zm-choiceFile-catalog1');
                var result, sendData, categoryData, newSort, tempArray;
                if(($(objData.sortThis).next().attr('data-sort'))){
                    newSort = $(objData.sortThis).next().attr('data-sort');
                }else {
                    newSort = $(objData.sortThis).prev().attr('data-sort');
                }
                if(objData.oldIndex == objData.sortThis.index()){
                    return
                }
                switch (modules){
                    case 'picture':
                        tempArray = [];
                        eleList.each(function (i,ele) {
                            tempArray.push({
                                fSort: i + 1,
                                fId: $(ele).attr('data-id')
                            });
                        });
                        sendData = {list: JSON.stringify(tempArray)};

                        result =  choicePopUpRoute.choicePictureSortCategory(sendData, modules);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            eleList.each(function (i,ele) {
                                $(ele).attr('data-sort',(i+1))
                            });
                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                    case 'video':
                        sendData = {cId: objData.sortId, cIndex: newSort };
                        result =  choicePopUpRoute.choiceVideoSave(sendData);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                            choicePopUpRendering.videoCatalogRendering(categoryData);
                            $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                                dragEle:'li.zm-chioceFile-clsLists',
                                callback: function (obj) {
                                    recursion(obj)
                                }
                            });
                            $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                    case 'radio':
                        sendData = {fId: objData.sortId, fSort: newSort };
                        result =  choicePopUpRoute.choiceRadioUpdateAlbum(sendData);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                            choicePopUpRendering.zmRadioCatalogRendering(categoryData);
                            $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                                dragEle:'li.zm-chioceFile-clsLists',
                                callback: function (obj) {
                                    recursion(obj)
                                }
                            });
                            $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                    case 'service':
                        tempArray = [];
                        eleList.each(function (i,ele) {
                            tempArray.push($(ele).attr('data-id'));
                        });
                        sendData = {"idArr": tempArray.join()}
                        result =  choicePopUpRoute.choicePictureSortCategory(sendData, modules);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                            choicePopUpRendering.serviceCatalogRendering(categoryData);
                            $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                                dragEle:'li.zm-chioceFile-clsLists',
                                callback: function (obj) {
                                    recursion(obj)
                                }
                            });
                            $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                }
                choicePopUpCommon.clsListsIcon();
            }
        });
        // 小类目
        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
            dragEle:'li.zm-chioceFile-clsLists',
            callback :function (objData) {
                // 排序后的所有元素
                recursion(objData);
            }
        });
        function recursion(objData) {
            var eleList = $('.zm-choiceFile-catalog1 ul').find('li.zm-chioceFile-clsLists');
            var result, sendData, categoryData, newSort;
            if(($(objData.sortThis).next().attr('data-sort'))){
                newSort = $(objData.sortThis).next().attr('data-sort');
            }else {
                newSort = $(objData.sortThis).prev().attr('data-sort');
            }
            if(objData.oldIndex == objData.sortThis.index()){
                return
            }
            switch (modules){
                case 'picture':
                    var tempArray = [];
                    eleList.each(function (i,ele) {
                        tempArray.push({
                            fSort: i + 1,
                            fId: $(ele).attr('data-id')
                        });
                    });
                    sendData = {list: JSON.stringify(tempArray)};
                    result =  choicePopUpRoute.choicePictureSortCategory(sendData, modules);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        eleList.each(function (i,ele) {
                            $(ele).attr('data-sort',(i+1))
                        });
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                    break;
                case 'video':
                    sendData = {cId: objData.sortId, cIndex: newSort};
                    result =  choicePopUpRoute.choiceVideoSave(sendData);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.videoCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists',
                            callback: function (obj) {
                                recursion(obj)
                            }
                        });
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                    break;
                case 'service':
                    sendData = {cId: objData.sortId, cIndex: newSort};
                    result =  choicePopUpRoute.choiceVideoSave(sendData);
                    if(!result){
                        choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                        return
                    }
                    if(result.status === 0){
                        categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                        choicePopUpRendering.serviceCatalogRendering(categoryData);
                        $('.zm-choiceFile-catalog1').find(' ul').eleDragSort({
                            dragEle:'li.zm-chioceFile-clsLists',
                            callback: function (obj) {
                                recursion(obj)
                            }
                        });
                        $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                    }else {
                        choicePopUpCommon.choiceIKnow(result.message);
                    }
                    break;
            }
            choicePopUpCommon.clsListsIcon();
        }
    },
    //产品模块类目拖拽
    catalogDragSortGoods:function () {
        //大类目
        $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls').eleDragSort({
            dragEle:'.zm-choiceFile-catalog1',
            callback :function () {
                // 排序后的所有元素
                var eles = $('.zm-choiceFile-middleBoxList1 .zm-chioceFile-cataLogCls1').find('.zm-choiceFile-catalog1');
                eles.each(function (i,ele) {
                })
            }
        });
        //中类目
        $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls2').eleDragSort({
            dragEle:'.zm-choiceFile-catalog2',
            callback :function () {
                // 排序后的所有元素
                var eles = $('.zm-choiceFile-middleBoxList1 .zm-chioceFile-cataLogCls2').find('.zm-choiceFile-catalog2');
                eles.each(function (i,ele) {
                })
            }
        });
        //小类目
        $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls3').eleDragSort({
            dragEle:'.zm-choiceFile-catalog3',
            callback :function () {
                // 排序后的所有元素
                var eles = $('.zm-choiceFile-middleBoxList1 .zm-chioceFile-cataLogCls3').find('.zm-choiceFile-catalog3');
                eles.each(function (i,ele) {
                })
            }
        });
    },
    //重命名图片
    choicePicRename:function (obj) {
        var listBox = $('.zm-chioceFile-zmpicLists');  //右面的大盒子
        var thisPicOldName = '';
        var modules = obj.modules;
        listBox.on('click','.zm-chioceFile-renameIcon',clickFileRename); //编辑
        $('.zm-choiceFile-wrap').on('click',clickWrap);
        listBox.on('keyup','.zm-chioceFile-fileNameBaseColor',enterKeyUp);
        listBox.on('keydown','.zm-chioceFile-fileNameBaseColor',enterKeyDown);
        // 点击重命名按钮给input添加样式
        function clickFileRename() {
            var $this = $(this);
            $this.closest('li').find('.zm-chioceFile-fileName').addClass('zm-choiceFile-fileNameEdit');
            thisPicOldName = $this.parent().siblings('.zm-chioceFile-fileName').find('input[type=text]').attr('placeholder').trim();
            // console.log(thisPicOldName)   图片的名字
            $this.parent().hide();  //input外面的div
            $this.parents().removeClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign');
            $this.parent().parent().parent().find('.zm-chioceFile-file i').hide().end().find('.zm-chioceFile-file b').hide();
            $this.parent().siblings('.zm-chioceFile-fileName').addClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').removeAttr('readonly').focus();
            var siblingsFileName = $this.closest('li').siblings().find('.zm-chioceFile-fileName');
            siblingsFileName.each(function (i,ele) {
                $(ele).removeClass('zm-chioceFile-fileNameBaseColor zm-chioceFile-fileNameWarnColor zm-choiceFile-fileNameEdit').attr('readonly', true)
                    .find('input').val('').blur().siblings('.zm-choiceFile-repetition').hide();
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
            return false;
        }
        // 点击弹窗空白处完成图片命名
        function clickWrap() {
            var $this = $(this); //大的盒子
            var blurFile = $this.find('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-fileName');
            blurFile.each(function (i, ele) {
                var fId, fRegularName, sendData, result;
                if(!($(ele).hasClass('zm-chioceFile-fileNameWarnColor'))){
                    if($(ele).find('input').val() == ''){
                        $(ele).removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr({
                            'readonly':true,
                            'placeholder':$(ele).find('input').attr('placeholder'),
                            'title':$(ele).find('input').attr('placeholder')
                        }).val('').blur().siblings('.zm-chioceFile-fileEdit').show();
                    }else {
                        fId = $(ele).closest('li').attr('data-fid');
                        fRegularName = $(ele).find('input').val();
                        if(modules == 'picture' || modules == 'file'){
                            sendData = {fId: fId, fRegularName: fRegularName};
                        }else if(modules == 'radio' || modules == 'album'){
                            sendData = {fId: fId, fName: fRegularName};
                        }
                        result = choicePopUpRoute.choicePictureListsRename(sendData,modules);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){
                            $(ele).removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr({
                                'readonly':true,
                                'placeholder':$(ele).find('input').val(),
                                'title':$(ele).find('input').val()
                            }).val('').blur().siblings('.zm-chioceFile-fileEdit').show();
                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                    }
                    $(ele).closest('li').find('.zm-chioceFile-fileName').removeClass('zm-choiceFile-fileNameEdit');
                }else {
                    $(ele).find('input').focus();
                }
            });
        }
        function enterKeyDown(event) {
            var $this = $(this);
            if (event.keyCode === 27) {
                if(!($this.hasClass('zm-chioceFile-fileNameWarnColor'))) {
                    $this.removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr({
                        'readonly':true,
                        'placeholder':thisPicOldName,
                        'title':thisPicOldName
                    }).val('').blur();
                    $this.closest('li').find('.zm-chioceFile-fileName').removeClass('zm-choiceFile-fileNameEdit');
                    return false;
                }else {
                    return false;
                }
            }
        }
        function enterKeyUp(event) {
            var $this = $(this);
            var inputList = $this.parents('li.zm-choiceR-lists').siblings().find('.zm-chioceFile-fileName').find('input[type=text]');
            var thisName = $this.find('input[type=text]').val().trim();
            var arr1 = [];
            var fId, fRegularName, sendData, resultData;
            inputList.each(function (i,v) {
                arr1.push($(v).attr('placeholder'));
            });
            var result = $.inArray(thisName, arr1);
            var nameLen = choicePopUpCommon.choiceFileGetLength(thisName);
            if(nameLen > 50 ){
                $this.addClass('zm-chioceFile-fileNameWarnColor');
                $this.find('.zm-choiceFile-repetition').show().find('.zm-choiceFile-nameWarning').hide().end()
                    .find('.zm-choiceFile-nameWarningHint').show();
            }else {
                if (result === -1){
                    if (thisName == ''){
                        if (event.keyCode === 13) {
                            $this.removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr({
                                'readonly':true,
                                'placeholder':$this.find('input').attr('placeholder'),
                                'title':$this.find('input').attr('placeholder')
                            }).val('').blur();
                            $this.closest('li').find('.zm-chioceFile-fileName').removeClass('zm-choiceFile-fileNameEdit');
                        }
                    }else {
                        $this.parents('li.zm-choiceR-lists').siblings().find('.zm-chioceFile-fileName').removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr('readonly',true).blur();
                        $this.removeClass('zm-chioceFile-fileNameWarnColor');
                        $this.find('.zm-choiceFile-repetition').hide();
                        if (event.keyCode === 13) {
                            fId = $this.closest('li').attr('data-fid');
                            fRegularName = $this.find('input').val();
                            if(modules == 'picture' || modules == 'file'){
                                sendData = {fId: fId, fRegularName: fRegularName};
                            }else if(modules == 'radio' || modules == 'album'){
                                sendData = {fId: fId, fName: fRegularName};
                            }
                            resultData = choicePopUpRoute.choicePictureListsRename(sendData,modules);
                            if(!resultData){
                                choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                                return
                            }
                            if(resultData.status === 0){
                                $this.removeClass('zm-chioceFile-fileNameBaseColor').find('input[type=text]').attr({
                                    'readonly':true,
                                    'placeholder':$this.find('input').val(),
                                    'title':$this.find('input').val()
                                }).val('').blur();
                            }else {
                                choicePopUpCommon.choiceIKnow(result.message);
                            }
                            $this.closest('li').find('.zm-chioceFile-fileName').removeClass('zm-choiceFile-fileNameEdit');
                        }
                    }
                }else {
                    $this.addClass('zm-chioceFile-fileNameWarnColor');
                    $this.find('.zm-choiceFile-repetition').show()
                        .find('.zm-choiceFile-nameWarning').show().end()
                        .find('.zm-choiceFile-nameWarningHint').hide();
                    $(inputList[result]).parent().addClass('zm-chioceFile-fileNameBaseColor');
                }
            }

        }
    },
    //回收站相关设置项
    choiceFileRecycleBin:function () {
        var fileClsBox = $('.zm-choiceRadio-middle');
        <!--还原-->
        fileClsBox.on('click','.zm-chioceFile-recycle',delIconFn);//点击回收站
        fileClsBox.on('mouseenter mouseleave','.zm-choiceFile-delPicLib',delIconHover);
        // 回收站小图标点击样式
        function delIconFn() {
            var $this = $(this);
            $this.addClass('zm-recycle').find('.zm-choiceFile-delPicLib').removeClass('iconColor4').addClass('iconColor2');
        }
        // 回收站小图标hover样式
        function  delIconHover(event) {
            var $this = $(this);
            var a = $this.parent().hasClass('zm-classListC-check');
            if (event.type == 'mouseenter') {
                $this.removeClass('iconColor4').addClass('iconColor2');
            }else {
                if(!a){
                    $this.removeClass('iconColor2').addClass('iconColor4');
                }
            }
        }
    },
    //批量恢复文件
    choiceFileVideoRecycleBin:function () {
        $('.zm-choiceFile-middleBoxList1').on('click','.zm-choiceFile-revFile',function () {
            var $this = $(this);
            var category = $this.attr('data-type');
            var logSign=$this.closest(".zm-choiceFile-middleBoxList").find(".zm-chioceFile-checkSign");
            if(logSign.length === 0 || $this.hasClass('zm-choiceFile-prohibit')){
                return
            }
            var tempData = [];
            var msg, list, sendData, ids, result;
            if(category == 'video'){
                logSign.each(function (i,ele) {
                    list = $(ele).attr('data-fInfoId');
                    tempData.push(list);
                });
            }else {
                logSign.each(function (i,ele) {
                    list = $(ele).attr('data-fid');
                    tempData.push(list);
                });
            }
            if(logSign.length){
                ids = tempData.join(',');
                switch (category) {
                    case 'radio':
                        msg = '音频恢复至未分配类目的专辑';
                        sendData = {audioids:ids, action: 0};
                        result = choicePopUpRoute.choicePictureDeletePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        (result.status === 0) ? logSign.remove() : choicePopUpCommon.choiceIKnow(result.message);
                        break;
                    case 'picture':
                        msg = '图片恢复至未分配类目图片';
                        sendData = {list:ids};
                        result = choicePopUpRoute.choicePictureBatchRestorePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        (result.status === 0) ? logSign.remove() : choicePopUpCommon.choiceIKnow(result.message);
                        break;
                    case 'video':
                        msg = '视频恢复至未分配类目视频';
                        sendData = {fIds:ids};
                        result = choicePopUpRoute.choicePictureBatchRestorePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        (result.status === 0) ? logSign.remove() : choicePopUpCommon.choiceIKnow(result.message);
                        break;
                    case 'goods':
                        msg = '产品恢复至未分配类目产品';
                        sendData = {fId:ids};
                        result = choicePopUpRoute.choicePictureDeletePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){

                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                    case 'service':
                        msg = '服务恢复至未分配类目服务';
                        sendData = {ids:ids};
                        result = choicePopUpRoute.choicePictureBatchRestorePicture(sendData, category);
                        if(!result){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(result.status === 0){

                        }else {
                            choicePopUpCommon.choiceIKnow(result.message);
                        }
                        break;
                }
                // choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
                choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
            }
        });
    },
    //还原图片---单个
    choiceFileRestorePicture:function (obj) {
        var listBox = $('.zm-chioceFile-zmpicLists');
        var modules = obj.modules;
        listBox.on('click','.zm-chioceFile-restore',function () {
            event.stopPropagation();
            var thisLi = $(this).closest('li');
            var result, sendData;
            if(modules == 'picture'){
                sendData = {list:thisLi.attr('data-fid')};
                result = choicePopUpRoute.choicePictureBatchRestorePicture(sendData, modules);
            }else if(modules == 'radio') {
                sendData = {audioids:thisLi.attr('data-fid'), action: 0};
                result = choicePopUpRoute.choicePictureDeletePicture(sendData, modules);
            }
            if(!result){
                choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                return
            }
            (result.status === 0) ? thisLi.remove() : choicePopUpCommon.choiceIKnow(result.message);
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    //图片页面点击选择添加按钮
    picAddChoice:function (obj) {
        $('.zm-choiceFile-choiceAddPicture').off("click").on("click",function () {
            var _this=$(this);
            var msg;
            var category = _this.attr('data-type');
            var callback = obj.callback;
            switch (category) {
                case 'radio':
                    msg = '请选择音频';
                    break;
                case 'album':
                    msg = '请选择专辑';
                    break;
                case 'picture':
                    msg = '请选择图片';
                    break;
                case 'video':
                    msg = '请选择视频';
                    break;
                case 'news':
                    msg = '请选择新闻';
                    break;
                case 'blogger':
                    msg = '请选择博客';
                    break;
                case 'goods':
                    msg = '请选择产品';
                    break;
                case 'service':
                    msg = '请选择服务';
                    break;
                case 'file':
                    msg = '请选择文件';
                    break;
                case 'composer':
                    msg = '请选择创作人';
                    break;
            }
            var tempData = choicePopUpCommon.choiceAndAddPicture( _this);
            if (!tempData.length) {
                choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
                return false;
            }else {
                window.parent.document.getElementById("choiceModules").remove();
                if(callback){
                    callback(tempData)
                }
            }
        })
    },
    //选择并添加按钮获取的数据----返回数据
    choiceAndAddPicture:function (myThis) {
        var _this=$(myThis);
        var tempArr=[];
        var logSign=_this.closest(".zm-choiceFile-middleBoxList").find(".zm-chioceFile-checkSign");
        if(logSign.length === 0){
            return 0;
        }
        logSign.each(function (i,ele) {
            var list = JSON.parse($(ele).attr('data-message'));
            tempArr.push(list);
        });
        return tempArr;
    },
    //点击移动到分类获取文件列表里的数据
    choiceFileMoveData:function (obj) {
        $('.zm-choiceFile-middleBoxList1').on('click','.zm-choiceFile-toCatalog',function () {
            var $this = $(this);
            if($this.hasClass('zm-choiceFile-prohibit')){
                return;
            }
            var category = $this.attr('data-choiceAdd');
            var logSign = $(this).closest(".zm-choiceFile-middleBoxList").find(".zm-chioceFile-checkSign");
            var msg ,classData, list;
            var tempData = [];
            var modules = obj.modules;
            switch (category) {
                case 'movePicture':
                case 'copyPicture':
                    msg = '请选择图片';
                    break;
                case 'moveRadio':
                case 'copyRadio':
                    msg = '请选择音频';
                    break;
                case 'moveVideo':
                    msg = '请选择视频';
                    break;
                case 'moveNews':
                    msg = '请选择新闻';
                    break;
                case 'moveService':
                case 'copyService':
                    msg = '请选择服务';
                    break;
                case 'moveGoods':
                case 'copyGoods':
                    msg = '请选择产品';
                    break;
            }
            if (logSign.length === 0) {
                choicePopUpCommon.choiceIKnow(msg);//我知道了提示框
                return false;
            }else {
                logSign.each(function (i,ele) {
                    list = $(ele).attr('data-fid');
                    tempData.push(list);
                });
                classData = choicePopUpRoute.choiceFileGetClassify(modules);
                choicePopUpCommon.choiceAddClassify(category, modules, classData);
                choicePopUpCommon.choiceFileMoveClassAffirm(category, tempData, modules, logSign);
            }
        });
    },
    //复制/移动到分类的弹窗
    choiceAddClassify:function (category, modules, data) {
        var msg,moveClassify, moveClassifyHtml;
        msg = (category.indexOf('move') != -1) ? '移动到分类' : '复制到分类';
        moveClassify = data;
        zmEditor.dialog.open({
            title: msg,
            content: '<div class="zm-choiceFileCopyToClassify"><div class="zm-choiceFileCopyToClassify1">' +
            '</div><div class="zm-radioAlbumbtn">'
            +'<span class="zm-choiceFileCopyBtn-cancel">取消</span><span class="zm-choiceFileCopyBtn-keep zm-choiceFileCopyBtn-keepGray">确认</span>'
            + '<span class="zm-choiceFileCopyBtn-upload"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" ><path d="M279.272727 512C279.272727 486.306909 258.432 465.454545 232.727273 465.454545L46.545455 465.454545C20.829091 465.454545 0 486.306909 0 512 0 537.704727 20.840727 558.545455 46.545455 558.545455L232.727273 558.545455C258.432 558.545455 279.272727 537.704727 279.272727 512L279.272727 512ZM977.454549 465.454545 791.272727 465.454545C765.568 465.454545 744.727273 486.306909 744.727273 512 744.727273 537.704727 765.568 558.545455 791.272727 558.545455L977.454549 558.545455C1003.15927 558.545455 1024 537.704727 1024 512 1024 486.306909 1003.15927 465.454545 977.454549 465.454545L977.454549 465.454545ZM512 0C486.306909 0 465.454545 20.840727 465.454545 46.545455L465.454545 232.727273C465.454545 258.420364 486.306909 279.272727 512 279.272727 537.704727 279.272727 558.545455 258.420364 558.545455 232.727273L558.545455 46.545455C558.545455 20.840727 537.704727 0 512 0L512 0ZM512 744.727273C486.306909 744.727273 465.454545 765.568 465.454545 791.272727L465.454545 977.454549C465.454545 1003.15927 486.306909 1024 512 1024 537.704727 1024 558.545455 1003.15927 558.545455 977.454549L558.545455 791.272727C558.545455 765.568 537.704727 744.727273 512 744.727273L512 744.727273ZM281.6 676.573091 149.981091 808.203636C131.805091 826.379636 131.805091 855.86618 149.981091 874.04218 168.145455 892.21818 197.620364 892.21818 215.796364 874.04218L347.438545 742.388364C365.614545 724.224 365.614545 694.749091 347.438545 676.573091 329.262545 658.397091 299.787636 658.385455 281.6 676.573091L281.6 676.573091ZM742.4 347.438545 874.030549 215.808C892.206549 197.632 892.206549 168.157091 874.030549 149.981091 855.86618 131.805091 826.391273 131.805091 808.238545 149.981091L676.573091 281.611636C658.397091 299.787636 658.397091 329.262545 676.573091 347.438545 694.749091 365.614545 724.200727 365.614545 742.4 347.438545L742.4 347.438545ZM215.784727 149.957818C197.620364 131.781818 168.145455 131.781818 149.969455 149.957818 131.793455 168.133818 131.793455 197.608727 149.969455 215.784727L281.6 347.438545C299.776 365.614545 329.262545 365.614545 347.438545 347.438545 365.614545 329.262545 365.614545 299.787636 347.438545 281.611636L215.784727 149.957818 215.784727 149.957818ZM742.4 676.573091C724.224 658.397091 694.737455 658.397091 676.573091 676.573091 658.397091 694.749091 658.397091 724.212364 676.573091 742.388364L808.215273 874.04218C826.391273 892.21818 855.854549 892.21818 874.01891 874.04218 892.18327 855.86618 892.18327 826.379636 874.01891 808.203636L742.4 676.573091 742.4 676.573091Z" /></svg></span>'
            + '</div></div>',
            width: 540,
            height: 450,
            movable:true,
            target: $('.zm-choiceFile-wrap')
        },function () {
            var wrap = $('.zm-choiceFile-wrap');
            moveClassifyHtml = template('zm-choiceFile-moveToClassify',moveClassify);
            wrap.find('.zm-choiceFileCopyToClassify1').html(moveClassifyHtml);
            $(".zm-choiceFileCopyToClassify1").mCustomScrollbar({theme:"minimal"});
            var removeNode = $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help');
            removeNode.closest('.zm-dialog').find('.zm-dialog-header-btn.zm-dialog-close').html(choicePopUpCommon.closeBtnSvg);
            var moveCatalogBox = $('.zm-choiceFileCopyToClassify');
            $('.zm-choiceFileCopyBtn-cancel').on('click',function () {
                $(this).closest('.zm-dialog').parent().remove();
            });
            // 一级目录
            moveCatalogBox.on('mouseenter mouseleave click','.zm-choiceFile-folder',function (event) {
                var $this = $(this);
                var childrenClassify = $('.zm-fileMove-childrenClassify');
                var ChildrenCatalogLength = $this.parent().find('.zm-fileMove-childrenClassify').find('li').length;
                ClassifyFunction(event, $this, ChildrenCatalogLength, childrenClassify);
            });
            // 二级目录
            moveCatalogBox.on('mouseenter mouseleave click', '.zm-choiceFile-folder2', function (event) {
                var $this = $(this);
                var childrenClassify = $('.zm-fileMove-childrenClassify3');
                var ChildrenCatalogLength = $this.parent().find('.zm-fileMove-childrenClassify3').find('li').length;
                ClassifyFunction(event, $this, ChildrenCatalogLength, childrenClassify);
            });
            moveCatalogBox.on('mouseenter mouseleave click','li.zm-choiceFile-leastLis',fn);
            function ClassifyFunction(event, $this, ChildrenCatalogLength, childrenClassify) {
                if(event.type == 'mouseenter') {
                    $this.find('.zm-fileMove-icon2').removeClass('iconColor8').addClass('iconColor1').end()
                        .find('.zm-fileMove-bigName').addClass('zm-choiceFile-baseColr');
                }else if(event.type == 'mouseleave'){
                    if (!($this.hasClass('unfold'))){
                        $this.find('.zm-fileMove-icon2').removeClass('iconColor1').addClass('iconColor8').end()
                            .find('.zm-fileMove-bigName').removeClass('zm-choiceFile-baseColr');
                    }
                }else if(event.type == 'click'){
                    if(!ChildrenCatalogLength){
                        if($this.hasClass('unfold')){
                            // 关闭文件夹
                            $this.parent().removeClass('zm-choiceFile-classifyChecked').end()
                                .removeClass('unfold').find('.zm-fileMove-icon2').show().end()
                                .find('.zm-fileMove-icon3').hide().end()
                                .find('.zm-fileMove-icon2').show();
                        }else{
                            //打开文件夹
                            if(modules == 'news'){
                                $this.closest('.zm-moveFile-classifyBox')
                                    .find('.zm-choiceFile-classifyChecked')
                                    .find('.zm-fileMove-icon3').hide().end()
                                    .find('.zm-fileMove-icon2').show().end()
                                    .find('.unfold').removeClass('unfold').find('.zm-fileMove-icon2').show().end().end()
                                    .find('.zm-fileMove-bigName').removeClass('zm-choiceFile-baseColr').end()
                                    .find('.iconColor1').removeClass('iconColor1').addClass('iconColor8').end()
                                    .removeClass('zm-choiceFile-classifyChecked').end()
                            }
                            $this.parent().addClass('zm-choiceFile-classifyChecked').end()
                                .addClass('unfold').find('.zm-fileMove-icon2').hide().end()
                                .find('.zm-fileMove-icon3').show().end()
                                .find('.zm-fileMove-icon2').hide();
                        }
                    }else {
                        if($this.hasClass('unfold')){
                            // 关闭文件夹内子类
                            $this.removeClass('unfold').find('.zm-fileMove-icon2').show().end()
                                .parent().find('.zm-fileMove-icon3').hide().end()
                                .find('.zm-fileMove-icon2').show().removeClass('iconColor1').addClass('iconColor8').end()
                                .find('.zm-fileMove-icon1').hide().end()
                                .find('.zm-fileMove-bigName').removeClass('zm-choiceFile-baseColr').end()
                                .find('ul').stop().slideUp(500).find('p').removeClass('unfold');
                            $this.parent().find('ul').find('li').removeClass('unfold zm-choiceFile-classifyChecked');
                        }else{
                            //打开文件夹内子类
                            $this.addClass('unfold').find('.zm-fileMove-icon2').hide().end()
                                .children('.zm-fileMove-bigName').addClass('zm-choiceFile-baseColr').end()
                                .find('.zm-fileMove-icon3').hide().end()
                                .find('.zm-fileMove-icon1').show().end()
                                .parent().find(childrenClassify).stop().slideDown(600).find().removeClass('unfold');
                            $this.find(childrenClassify).find('.zm-fileMove-icon2').show();
                        }
                    }
                    if($this.closest('.zm-dialog').find('.zm-choiceFile-classifyChecked').length > 0){
                        $this.closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').removeClass('zm-choiceFileCopyBtn-keepGray');
                    }else {
                        $this.closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').addClass('zm-choiceFileCopyBtn-keepGray');
                    }
                }
            }
            function fn(event) {
                var $this = $(this);
                if(event.type == 'mouseenter') {
                    $this.find('.zm-fileMove-icon2').removeClass('iconColor8').addClass('iconColor1').end()
                        .find('.zm-fileMove-bigName').addClass('zm-choiceFile-baseColr');
                }else if(event.type == 'mouseleave'){
                    if (!($this.hasClass('unfold'))){
                        $this.find('.zm-fileMove-icon2').removeClass('iconColor1').addClass('iconColor8').end()
                            .find('.zm-fileMove-bigName').removeClass('zm-choiceFile-baseColr');
                    }
                }else if(event.type == 'click'){
                    if($this.hasClass('unfold')){
                        // 关闭文件夹
                        $this.removeClass('unfold zm-choiceFile-classifyChecked').find('.zm-fileMove-icon2').show().end()
                            .find('.zm-fileMove-icon3').hide().end()
                            .find('.zm-fileMove-icon2').show().end()
                            .closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').addClass('zm-choiceFileCopyBtn-keepGray');
                    }else{
                        //打开文件夹
                        $this.addClass('unfold zm-choiceFile-classifyChecked').find('.zm-fileMove-icon2').hide().end()
                            .find('.zm-fileMove-icon3').show().end()
                            .find('.zm-fileMove-icon2').hide().end()
                            .closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').removeClass('zm-choiceFileCopyBtn-keepGray');
                    }
                    if($this.closest('.zm-dialog').find('.zm-choiceFile-classifyChecked').length > 0){
                        $this.closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').removeClass('zm-choiceFileCopyBtn-keepGray');
                    }else {
                        $this.closest('.zm-dialog').find('.zm-choiceFileCopyBtn-keep').addClass('zm-choiceFileCopyBtn-keepGray');
                    }
                }
            }
            // 三级目录
            removeNode.siblings('.zm-dialog-title').css({
                'font-size':'16px',
                'font-weight':'400'
            });
            removeNode.remove();
        });
    },
    //复制、移动到分类点击确认
    choiceFileMoveClassAffirm:function (category,tempData, modules, logSign) {
        var moveCatalogBox = $('.zm-choiceFileCopyToClassify');
        moveCatalogBox.on('click','.zm-choiceFileCopyBtn-keep',function () {
            var $this = $(this);
            var tempClassArr = [];
            var sendData, firstCId, secondCId, result;
            var ids = [];
            var classifyChecked = moveCatalogBox.find('.zm-choiceFile-classifyChecked');
            var ck = $(logSign[0]).closest('.zm-choiceRadio-middle').find('.zm-classListC-check');
            if(!$this.siblings('.zm-choiceFileCopyBtn-upload').is(':hidden')){
                return;
            }
            classifyChecked.each(function (i,ele) {
                if(!($(ele).attr('data-fParentId'))){
                    tempClassArr.push({
                        fFirstCategory:$(ele).attr('data-clsId')
                    });
                }else {
                    tempClassArr.push({
                        fFirstCategory:$(ele).attr('data-fParentId'),
                        fSecondCategory:$(ele).attr('data-clsId')
                    });
                }
                ids.push($(ele).attr('data-clsId'));
            });
            firstCId = classifyChecked.attr('data-fParentId');
            secondCId = classifyChecked.attr('data-clsId');
            switch (modules){
                case 'picture':
                    sendData = {imageIds: tempData.join(),categoryIds: JSON.stringify(tempClassArr)};
                    break;
                case 'video':
                    if(!(classifyChecked.attr('data-fInfoId'))){
                        sendData = {fIds: tempData.join(), firstCId: classifyChecked.attr('data-clsId')};
                    }else {
                        sendData = {fIds: tempData.join(), secondCId: classifyChecked.attr('data-clsId')};
                    }
                    break;
                case 'radio':
                    sendData = {audioids: tempData.join(), albumids: ids.join()};
                    break;
                case 'news':
                    if(!firstCId){
                        sendData = {fOperateStatus: tempData.join(), fFristNewItemId: secondCId};
                    }else {
                        sendData = {fOperateStatus: tempData.join(), fFristNewItemId: firstCId, fSecondNewItemId: secondCId};
                    }
                    break;
                case 'service':
                    if(ck.hasClass('zm-choicePicture-allPicture') || ck.length === 0){
                        sendData = {serviceId:tempData.join(), newCATId: ids.join(), oldCATId: 0};
                    }else if(ck.hasClass('zm-choicePicture-weiFenPei')){
                        sendData = {serviceId: tempData.join(), newCATId: ids.join(), oldCATId: -2};
                    }else {
                        sendData = {serviceId: tempData.join(), newCATId: ids.join(), oldCATId: ck.attr('data-id') || ck.closest('li').attr('data-id')};
                    }
                    break;
                case 'goods':
                    if(ck.hasClass('zm-choicePicture-allPicture') || ck.length === 0){
                        sendData = {ids: tempData.join(), newCategoryId: ids.join(), oldCategoryId: 0};
                    }else if(ck.hasClass('zm-choicePicture-weiFenPei')){
                        sendData = {ids: tempData.join(), newCategoryId: ids.join(), oldCategoryId: -2};
                    }else {
                        sendData = {ids: tempData.join(), newCategoryId: ids.join(), oldCategoryId: ck.attr('data-id') || ck.closest('li').attr('data-id')};
                    }
                    break;
            }
            $this.siblings('.zm-choiceFileCopyBtn-upload').show();
            result = choicePopUpRoute.choicePictureMoveToSelectedCategory(sendData, category);
            if(result.status === 0){
                setTimeout(function () {
                    $this.closest('.zm-dialog-box.zm-movableBox').remove();
                    /*if(category.indexOf('move') != -1){
                     logSign.remove();
                     }*/
                    choicePopUpCommon.choiceIKnow('成功！');
                }, 2000);
            }else {
                choicePopUpCommon.choiceIKnow(result.message);
            }
        });
    },
    //搜索框的搜索功能----图片类型模式
    choiceFileSearch:function () {
        var searchBox = $('.zm-choiceFile-wrap');
        searchBox.on('input','.zm-choiceFile-searchalbum',function () {
            var $this = $(this);
            var searchNone = $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choiceFile-searchNone');
            var searchTxt = $this.val().trim().toLowerCase();
            var choiceFileType = $this.attr('data-type');
            var thisCategory = $('.zm-classListC-check');
            var fFirstCategory = thisCategory.attr('data-fParentId') || thisCategory.closest('li').attr('data-fParentId');
            var fSecondCategory = thisCategory.attr('data-id') || thisCategory.closest('li').attr('data-id');
            var aa, pictureListData, pageSize;
            searchNone.hide();
            categoryFileSearch(choiceFileType);
            function categoryFileSearch(choiceFileType) {
                switch (choiceFileType){
                    case 'file':
                        aa = {iDisplayLength:21, fRegularName: searchTxt,iDisplayStart:0};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                        choicePopUpRendering.fileListRendering(pictureListData);
                        functionData(pictureListData.data.length, 21);
                        break;
                    case 'myPicture':
                        pageSize = 28;
                        if(thisCategory.length){
                            aa = choicePopUpCommon.choiceUploadData.picture(thisCategory, pageSize, 1, fFirstCategory, fSecondCategory, searchTxt);
                        }else {
                            aa = {fIsTrash: 0,iDisplayLength: pageSize, fRegularName: searchTxt,iDisplayStart:0};
                        }
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                        choicePopUpRendering.picListRendering(pictureListData);
                        functionData(pictureListData.data.length, pageSize);
                        break;
                    case 'zmPicture':

                        zmPicture(thisCategory);
                        break;
                    case 'album':
                        pageSize = 36;
                        aa = {fName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取数据
                        choicePopUpRendering.albumListRendering(pictureListData);//渲染
                        functionData(pictureListData.data.length, pageSize);
                        break;
                    case 'radio':
                        radio();
                        break;
                    case 'myVideo':
                        pageSize = 20;
                        if(thisCategory.length){
                            aa = choicePopUpCommon.choiceUploadData.video(thisCategory, pageSize, 1, fFirstCategory, fSecondCategory, searchTxt);
                        }else {
                            aa = {fName: searchTxt, pStart: 1, pLength: pageSize};
                        }
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                        choicePopUpRendering.videoListRendering(pictureListData);
                        functionData(pictureListData.data.length, pageSize);
                        break;
                    case 'zmVideo':
                        zmVideo(thisCategory);
                        break;
                    case 'blogger':
                        aa = {selectInfo: searchTxt,descOrAsc: 'asc', iDisplayLength: 20, iDisplayStart :0, sortBy: 'fBlogCode'};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取数据
                        choicePopUpRendering.bloggerListRendering(pictureListData);
                        functionData(pictureListData.data.length, 20);
                        break;
                    case 'goods':
                        break;
                    case 'service':
                        if(thisCategory.length){
                            if(thisCategory.hasClass('zm-choicePicture-allPicture')){
                                aa = {pageSize: 15, fCateId: 0, pageIndex: 0, servicetName: searchTxt}
                            }else if(thisCategory.hasClass('zm-choicePicture-weiFenPei')){
                                aa = {pageSize: 15, fCateId: -2, pageIndex: 0, servicetName: searchTxt}
                            }else if(thisCategory.hasClass('zm-chioceFile-recycle')){
                                aa = {pageSize: 15, fCateId: -1, pageIndex: 0, servicetName: searchTxt}
                            }else {
                                aa = {pageSize: 15, fCateId: fSecondCategory, pageIndex: 0, servicetName: searchTxt}
                            }
                        }else {
                            aa = {pageSize: 15, fCateId: 0, pageIndex: 0, servicetName: searchTxt}
                        }
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//获取列表信息
                        choicePopUpRendering.serverListRendering(pictureListData);//渲染
                        functionData(pictureListData.data.length, 15);
                        break;
                    case 'news':
                        if(thisCategory.length){
                            if(!thisCategory.hasClass('zm-choicePicture-allPicture')){
                                aa = {iDisplayLength:15, currPage: 1, iDisplayStart:1, fNewsType: -1,fNameTitle: searchTxt};
                            }else {
                                aa = {iDisplayLength:15, currPage: 1, iDisplayStart:1, fNewsType: -1, fNameTitle: searchTxt, fFristNewItemId: fFirstCategory, fSecondNewItemId: fSecondCategory};
                            }
                        }else {
                            aa = {iDisplayLength:15, currPage: 1, iDisplayStart:1, fNewsType: -1, fNameTitle: searchTxt};
                        }
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//获取列表信息
                        choicePopUpRendering.newsListRendering(pictureListData);//渲染
                        functionData(pictureListData.data.length, 15);
                        break;
                    case 'composer':
                        aa = {iDisplayLength:36, fStageName: searchTxt,iDisplayStart:0};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                        choicePopUpRendering.fileListRendering(pictureListData);
                        functionData(pictureListData.data.length, 36);
                        break;
                }
                document.modulesPageNumber = 1;
                choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
                // zmChoiceRadio.choicePictureUploadMore(choiceFileType);
            }
            function radio(thisCategory) {
                var pageSize = 28;
                if(thisCategory.length){
                    if( thisCategory.hasClass('zm-choicePicture-allPicture')){//获取全部图片
                        aa = {fName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                    }else if(thisCategory.hasClass('zm-choicePicture-weiFenPei')){//获取未分配类目的图片
                        aa = {fName: searchTxt, noAlbumMusic: 'true', iDisplayStart: 0, iDisplayLength: pageSize};
                    }else if(thisCategory.hasClass('zm-chioceFile-recycle')){//获取回收站图片
                        aa = {fName: searchTxt, fDeleteState: 1, iDisplayStart: 0, iDisplayLength: pageSize};
                    }else {
                        aa = {secondCId: fSecondCategory, fName: searchTxt};
                    }
                }else {
                    aa = {fName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                }
                pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取音频数据
                choicePopUpRendering.radioListRendering(pictureListData);//渲染
                functionData(pictureListData.data.length);
            }
            function zmVideo() {
                var pageSize = 20;
                if(thisCategory.length){
                    if( thisCategory.hasClass('zm-choicePicture-allPicture')){//获取全部图片
                        aa = {type: 'all', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//获取列表信息
                    }else if(thisCategory.hasClass('zm-choicePicture-weiFenPei')){//获取未分配类目的图片
                        aa = {type: 'unDistributed', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//获取列表信息
                    }else {
                        aa = {fid: thisCategory.attr('data-id'), fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        var url = '/manage-api/video/webbuilder-api/videoFreeExternal/queryByCategory';
                        pictureListData = choicePopUpAJAX.choiceFileAJAXFunction(aa, url);//获取列表信息
                    }
                }else {
                    aa = {type: 'all', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                    pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//获取列表信息
                }
                choicePopUpRendering.zmVideoListRendering(pictureListData);//渲染
                functionData(pictureListData.data.length, pageSize);
            }
            function zmPicture() {
                var pageSize = 28;
                if(thisCategory.length){
                    if( thisCategory.hasClass('zm-choicePicture-allPicture')){//获取全部图片
                        aa = {type: 'all', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                    }else if(thisCategory.hasClass('zm-choicePicture-weiFenPei')){//获取未分配类目的图片
                        aa = {type: 'unDistributed', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                    }else {
                        aa = {categoryId: thisCategory.attr('data-id'), fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                        var url = '/manage-api/picture/webbuilder-api/imageFreeExternal/queryCategory';
                        var dataResult = choicePopUpAJAX.choiceFileAJAXFunction(aa, url);//获取列表信息
                        pictureListData = {data: dataResult.data.imagelist};
                    }
                }else {
                    aa = {type: 'all', fRegularFileName: searchTxt, iDisplayStart: 0, iDisplayLength: pageSize};
                    pictureListData = choicePopUpRoute.choicePictureLists(aa, choiceFileType);//ajax获取图片数据
                }
                choicePopUpRendering.zmPicListRendering(pictureListData);
                functionData(pictureListData.data.length, pageSize);
            }
            function functionData(arg, pageSize) {
                if(arg === 0){
                    searchNone.show();
                    $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choicePicture-uploadMore').text('没有更多了o(╥﹏╥)o');
                }else if(arg === pageSize){
                    $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choicePicture-uploadMore').text('下拉加载更多');
                    searchNone.hide();
                }else {
                    searchNone.hide();
                    $this.closest('.zm-choiceFile-middleBoxList').find('.zm-choicePicture-uploadMore').text('没有更多了o(╥﹏╥)o');
                }
            }
        });
    },
    //图片列表全选/全不选/反选功能
    choicePicCheckedAll:function () {//全选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-allCheck',function () {
            var allList = $(this).parent().parent().siblings('.zm-choiceRadio-middle').find('.zm-choiceFile-fileLi');
            allList.each(function (i,v) {
                $(v).addClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign')
                    .find('.zm-chioceFile-file i').show();
                $(v).find('.zm-chioceFile-file b').show();
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    choicePicCheckedNone:function () {//全不选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-noCheck',function () {
            var allList = $(this).parent().parent().siblings('.zm-choiceRadio-middle').find('.zm-choiceFile-fileLi');
            allList.each(function (i,v) {
                $(v).removeClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign')
                    .find('.zm-chioceFile-file i').hide();
                $(v).find('.zm-chioceFile-file b').hide();
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    choicePicCheckedInvert:function () {//全不选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-backCheck',function () {
            var allList = $(this).parent().parent().siblings('.zm-choiceRadio-middle').find('.zm-choiceFile-fileLi');
            allList.each(function (i,v) {
                if($(v).hasClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign')){
                    $(v).removeClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign')
                        .find('.zm-chioceFile-file i').hide();
                    $(v).find('.zm-chioceFile-file b').hide();
                }else {
                    $(v).find('.zm-chioceFile-fileEdit').hide();
                    $(v).addClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign')
                        .find('.zm-chioceFile-file i').show();
                    $(v).find('.zm-chioceFile-file b').show();
                }
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    //新闻列表批量选择--全选/全不选/反选
    choiceNewsCheckedAll:function (obj) {//全选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-allCheck',function () {
            if(!obj.flag){return}
            var allList = $('.zm-choicePicture-zmspli').find('.zm-choiceR-goodsLists');
            var dataType = $('.zm-choiceRadio-middle').attr('data-type');
            allList.each(function (i,v) {
                if(dataType == 'goods' || dataType == 'service'){
                    if(!($(v).hasClass('zm-chioceFile-checkSign'))){
                        $(v).addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                            .find('.zm-choiceFile-optIcon').addClass('zm--choiceR-goodsCheckIconColor zm-choiceFile-optIconBorderNone iconColor1')
                            .find('svg').show();
                    }
                    // 有子元素的对母体的影响
                    if($(v).closest('.zm-choiceFile-parentLi').find('li').length > 0){
                        if($(v).closest('.zm-choiceFile-parentLi').find('.zm-chioceFile-checkSign').length > 0){
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0').removeClass('iconColor1 zm-choiceFile-bgD7')
                                .find('svg').show();
                        }else {
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                .find('svg').hide();
                        }
                    }
                }else {
                    $(v).addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                        .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                        .find('svg').show();
                }
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    choiceNewsCheckedNone:function (obj) {//全不选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-noCheck',function () {
            if(!obj.flag){return}
            var allList = $('.zm-choicePicture-zmspli').find('.zm-choiceR-goodsLists');
            var dataType = $('.zm-choiceRadio-middle').attr('data-type');
            allList.each(function (i,v) {
                $(v).removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                    .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                    .find('svg').hide();
                if(dataType == 'goods' || dataType == 'service'){
                    // 有子元素的对母体的影响
                    if($(v).closest('.zm-choiceFile-parentLi').find('li').length > 0){
                        if($(v).closest('.zm-choiceFile-parentLi').find('.zm-chioceFile-checkSign').length > 0){
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0').removeClass('iconColor1 zm-choiceFile-bgD7')
                                .find('svg').show();
                        }else {
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                .find('svg').hide();
                        }
                    }
                }
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    choiceNewsCheckedInvert:function (obj) {//反选
        $('.zm-choiceRadio-topM').on('click','.zm-choiceFilebtn-backCheck',function () {
            if(!obj.flag){return}
            var allList = $('.zm-choicePicture-zmspli').find('.zm-choiceR-goodsLists');
            var dataType = $('.zm-choiceRadio-middle').attr('data-type');
            allList.each(function (i,v) {
                if($(v).hasClass('zm-chioceFile-checkSign')){
                    $(v).removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                        .removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                        .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                        .find('svg').hide();
                }else {
                    $(v).addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                        .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                        .find('svg').show();
                }
                if(dataType == 'goods' || dataType == 'service'){
                    if(!($(v).hasClass('zm-chioceFile-checkSign'))){
                        $(v).find('.zm-choiceFile-optIcon').removeClass('zm--choiceR-goodsCheckIconColor zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor1 iconColor0');
                    }else {
                        $(v).find('.zm-choiceFile-optIcon').addClass('zm--choiceR-goodsCheckIconColor zm-choiceFile-optIconBorderNone iconColor1').removeClass('iconColor0 zm-choiceR-newsCheckIconColor');
                    }
                    // 有子元素的对母体的影响
                    if($(v).closest('.zm-choiceFile-parentLi').find('li').length > 0){
                        if($(v).closest('.zm-choiceFile-parentLi').find('.zm-chioceFile-checkSign').length > 0){
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0').removeClass('iconColor1 zm-choiceFile-bgD7')
                                .find('svg').show();
                        }else {
                            $(v).closest('.zm-choiceFile-parentLi').children('p')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                .find('svg').hide();
                        }
                    }
                }
            });
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        });
    },
    //点击图片选中样式
    choicePicChecked:function (obj) {
        var listBox = $('.zm-chioceFile-zmpicLists');
        if (!obj.flag){
            $(".zm-choiceRadio-topM").off('click');
        }
        var modules = obj.modules;
        listBox.on('click','.zm-choiceFile-fileLi',fn);
        listBox.on('click','.zm-chioceFile-file',fileFn);
        function fileFn() {
            //图片改名时可以点击图片完成改名并选中
            var ifRename = $(this).parent().find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameBaseColor');
            var ifRenameWarn = listBox.find('.zm-chioceFile-fileNameWarnColor').length;
            var fId, fRegularName, sendData, resultData;
            if(ifRenameWarn === 0){
                if(ifRename){
                    var $parent = $(this).parents('li.zm-choiceR-lists');
                    var thisInput = $parent.find('.zm-chioceFile-fileName').removeClass('zm-chioceFile-fileNameBaseColor').find('input');
                    if (thisInput.val() == ''){
                        thisInput.attr({
                            'readonly':true,
                            'placeholder':thisInput.attr('placeholder'),
                            'title':thisInput.attr('placeholder')
                        }).val('').blur();
                    }else {
                        fId = thisInput.closest('li').attr('data-fid');
                        fRegularName = thisInput.val();
                        sendData = (modules == 'picture' || modules == 'file') ? ({fId: fId, fRegularName: fRegularName}) : ({fId: fId, fName: fRegularName});
                        resultData = choicePopUpRoute.choicePictureListsRename(sendData,modules);
                        if(!resultData){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(resultData.status === 0){
                            thisInput.attr({
                                'readonly':true,
                                'placeholder':thisInput.val(),
                                'title':thisInput.val()
                            }).val('').blur();
                        }else {
                            choicePopUpCommon.choiceIKnow(resultData.message);
                        }
                    }
                    listBox.find('.zm-chioceFile-fileName').removeClass('zm-choiceFile-fileNameEdit');
                    $parent.addClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign');
                    $parent.find('.zm-chioceFile-file i').show();
                    $parent.find('.zm-chioceFile-file b').show();
                    choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
                }
            }
        }
        function fn(event) {
            if(document.stopClick) {
                event.stopPropagation();
                var $this = $(this);
                var ifRename = $this.find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameBaseColor');
                var siblingInput = $this.siblings().find('.zm-chioceFile-fileNameBaseColor').find('input');
                var ifRenameWarn = listBox.find('.zm-chioceFile-fileNameWarnColor').length;
                if (!obj.flag){//单选
                    if(ifRenameWarn === 0) {
                        if (ifRename){
                            //如果文件出入改名状态点击文本框不允许出发选中事件
                            $this.find('input[type=text]').on('click',function () {
                                $(this).focus();
                                return false;
                            });
                        }else {
                            if($this.hasClass('zm-chioceFile-checkSign')){
                                //如果已经被选中则去除选中样式
                                $this.removeClass("zm-choiceFile-checkStyle zm-chioceFile-checkSign");
                                $this.find('.zm-chioceFile-file i').hide();
                                $this.find('.zm-chioceFile-file b').hide();
                                if($this.find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameWarnColor')){
                                    return false;
                                }else{
                                    eleSibling(siblingInput);
                                }
                            }else {
                                //如果没有被选中则添加选中样式
                                $this.addClass("zm-choiceFile-checkStyle zm-chioceFile-checkSign")
                                    .siblings().removeClass("zm-choiceFile-checkStyle zm-chioceFile-checkSign")
                                    .find('.zm-choiceFile-videoShade').remove().end()
                                    .find('.zm-choiceFile-radioShade').remove();
                                $this.find('.zm-chioceFile-file i').show();
                                $this.find('.zm-chioceFile-file b').show();
                                $this.siblings().find('.zm-chioceFile-file i').hide();
                                $this.siblings().find('.zm-chioceFile-file b').hide();
                                //重命名有警告时点击其他文件不失去焦点/无警告可失去焦点
                                if($this.find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameWarnColor')){
                                    return false;
                                }else{
                                    eleSibling(siblingInput);
                                }
                            }
                        }
                    }
                }else {//多选
                    if(ifRenameWarn === 0) {
                        if (ifRename){
                            //如果文件出入改名状态点击文本框不允许出发选中事件
                            $this.find('input[type=text]').on('click',function () {
                                $(this).focus();
                                return false;
                            });
                        }else {
                            //zm-chioceFile-checkSign 用来标记选中
                            if($this.hasClass('zm-chioceFile-checkSign')){
                                //如果已经被选中则去除选中样式
                                $this.removeClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign');
                                $this.find('.zm-chioceFile-file i').hide();
                                $this.find('.zm-chioceFile-file b').hide();
                                $this.find('.zm-chioceFile-fileEdit').show();
                                if($this.find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameWarnColor')){
                                    return false;
                                }else{
                                    eleSibling(siblingInput);
                                }
                            }else {
                                //如果没有被选中则添加选中样式
                                $this.find('.zm-chioceFile-fileEdit').hide();
                                $this.addClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign');
                                $this.find('.zm-chioceFile-file i').show();
                                $this.find('.zm-chioceFile-file b').show();
                                //重命名有警告时点击其他文件不失去焦点/无警告可失去焦点
                                if($this.find('.zm-chioceFile-fileName').hasClass('zm-chioceFile-fileNameWarnColor')){
                                    return false;
                                }else{
                                    eleSibling(siblingInput);
                                }
                            }
                        }
                    }
                }
            }
            function eleSibling(siblingInput) {
                siblingInput.each(function (i, ele) {
                    var fId, fRegularName, sendData, resultData;
                    if ($(ele).val() == ''){
                        $(ele).blur().attr({
                            'readonly':true,
                            'placeholder' : $(ele).attr('placeholder'),
                            'title' : $(ele).attr('placeholder')
                        }).val('').closest('li').find('.zm-chioceFile-fileName').removeClass('zm-chioceFile-fileNameBaseColor zm-choiceFile-fileNameEdit');
                    }else {
                        fId = $(ele).closest('li').attr('data-fid');
                        fRegularName = $(ele).val();
                        sendData = (modules == 'picture' || modules == 'file') ? ({fId: fId, fRegularName: fRegularName}) : ({fId: fId, fName: fRegularName});
                        resultData = choicePopUpRoute.choicePictureListsRename(sendData,modules);
                        if(!resultData){
                            choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                            return
                        }
                        if(resultData.status === 0){
                            $(ele).blur().attr({
                                'readonly':true,
                                'placeholder' : $(ele).val(),
                                'title' : $(ele).val()
                            }).val('').closest('li').find('.zm-chioceFile-fileName').removeClass('zm-chioceFile-fileNameBaseColor zm-choiceFile-fileNameEdit');
                        }else {
                            choicePopUpCommon.choiceIKnow(resultData.message);
                        }
                    }
                });
            }
            document.stopClick = true;
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        }
    },
    // 新闻/博客/产品/服务列表点击事件/hover事件效果
    choiceNewsChecked:function (obj) {
        var $box = $('.zm-chioceFile-zmpicLists');
        $('.zm-choiceFile-newsHint div').hide();
        $('.zm-choiceFile-optIcon svg').hide();
        var flag = obj.flag;
        if (!flag){
            $box.off('click','.zm-choiceR-goodsLists',click);
        }
        $box.on('mouseenter mouseleave','.zm-choiceR-goodsLists',hover);
        $box.on('click','.zm-choiceR-goodsLists',click);
        function hover(event) {
            var $this = $(this);
            if(event.type == 'mouseenter'){
                if(!($this.hasClass('zm-chioceFile-checkSign'))){
                    $this.addClass('zm-choiceR-newsListsHover')
                        .find('.zm-choiceFile-newsHint div').show();
                }else {
                    $this.find('.zm-choiceFile-newsHint div').show();
                }
            }else {
                $this.removeClass('zm-choiceR-newsListsHover').find('.zm-choiceFile-newsHint div').hide();
            }
        }
        function click() {
            var $this = $(this);
            var liSblings;
            var dataType = $('.zm-choiceRadio-middle').attr('data-type');
            //产品和服务添加样式
            if(document.stopClick == true){
                if(!flag){//单选
                    if(dataType == 'goods'|| dataType == 'service'){
                        // 添加基本样式
                        if($this.hasClass('zm-chioceFile-checkSign')){
                            $this.removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign').addClass('zm-choiceR-newsListsHover')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceFile-optIconBorderNone zm--choiceR-goodsCheckIconColor iconColor1 iconColor0')
                                .find('svg').hide();
                        }else{
                            liSblings = $this.closest('.zm-choiceFile-parentLi').siblings();
                            liSblings.each(function(i,ele){
                                if($(ele).find('li').length > 0){
                                    $(ele).children('p').find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                        .find('svg').hide();
                                }
                            });
                            $this.parent().siblings().find('.zm-choiceR-newsListschecked').removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                                .find('svg').hide();
                            $this.closest('.zm-choiceFile-parentLi').siblings().find('.zm-choiceR-newsListschecked').removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                                .find('svg').hide();
                            $this.addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').addClass('zm--choiceR-goodsCheckIconColor zm-choiceFile-optIconBorderNone iconColor1')
                                .find('svg').show();
                        }
                        // 有子类的点击对母体的影响
                        if($this.closest('.zm-choiceFile-parentLi').find('li').length > 0){
                            if($this.closest('.zm-choiceFile-parentLi').find('.zm-chioceFile-checkSign').length > 0){
                                $this.closest('.zm-choiceFile-parentLi').children('p')
                                    .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0').removeClass('iconColor1 zm-choiceFile-bgD7')
                                    .find('svg').show();
                            }else {
                                $this.closest('.zm-choiceFile-parentLi').children('p')
                                    .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                    .find('svg').hide();
                            }
                        }
                    }else {
                        // 博客新闻添加基本样式
                        if($this.hasClass('zm-chioceFile-checkSign')){
                            $this.removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign').addClass('zm-choiceR-newsListsHover')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceFile-optIconBorderNone zm-choiceR-newsCheckIconColor')
                                .find('svg').hide();
                        }else{
                            $this.siblings().removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                                .find('svg').hide();
                            $this.addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                                .find('svg').show();
                        }
                    }
                }else {//多选
                    if(dataType == 'goods'|| dataType == 'service'){
                        // 添加基本样式
                        if($this.hasClass('zm-chioceFile-checkSign')){
                            $this.removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign').addClass('zm-choiceR-newsListsHover')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceFile-optIconBorderNone zm--choiceR-goodsCheckIconColor iconColor1 iconColor0')
                                .find('svg').hide();
                        }else{
                            $this.addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').addClass('zm--choiceR-goodsCheckIconColor zm-choiceFile-optIconBorderNone iconColor1')
                                .find('svg').show();
                        }
                        // 有子类的点击对母体的影响
                        if($this.closest('.zm-choiceFile-parentLi').find('li').length > 0){
                            if($this.closest('.zm-choiceFile-parentLi').find('.zm-chioceFile-checkSign').length > 0){
                                $this.closest('.zm-choiceFile-parentLi').children('p')
                                    .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0').removeClass('iconColor1 zm-choiceFile-bgD7')
                                    .find('svg').show();
                            }else {
                                $this.closest('.zm-choiceFile-parentLi').children('p')
                                    .find('.zm-choiceFile-optIcon').removeClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone iconColor0 iconColor1').addClass('zm-choiceFile-bgD7')
                                    .find('svg').hide();
                            }
                        }
                    }else {
                        // 博客新闻添加基本样式
                        if($this.hasClass('zm-chioceFile-checkSign')){
                            $this.removeClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign').addClass('zm-choiceR-newsListsHover')
                                .find('.zm-choiceFile-optIcon').removeClass('zm-choiceFile-optIconBorderNone zm-choiceR-newsCheckIconColor')
                                .find('svg').hide();
                        }else{
                            $this.addClass('zm-choiceR-newsListschecked zm-chioceFile-checkSign')
                                .find('.zm-choiceFile-optIcon').addClass('zm-choiceR-newsCheckIconColor zm-choiceFile-optIconBorderNone')
                                .find('svg').show();
                        }
                    }
                }
            }
            document.stopClick = true;
            choicePopUpCommon.choicePicCheckedNumber();//选中个数计算
        }
    },
    //产品/服务额外母体点击事件
    choiceFileGoodsPullDown:function () {
        var $box = $('.zm-choiceRadio-spli');
        $box.on('click','.zm-choiceR-newsListsGray',click);
        function click() {
            var $this = $(this);
            if(document.stopClick == true){
                //zm-choiceFile-goodsChildrenShow用来标记是否打开状态
                if ($this.hasClass('zm-choiceFile-goodsChildrenShow')){
                    $this.parent().find('ul').stop().slideUp(800);
                    $this.removeClass('zm-choiceFile-goodsChildrenShow');
                    $this.find('.zm-choiceGoods-goodsStateIcon2').css({
                        'transform': 'rotate(0deg)',
                        'transition': 'transform 0.8s'
                    })
                }else {
                    $this.parent().find('ul').stop().slideDown(800);
                    $this.addClass('zm-choiceFile-goodsChildrenShow');
                    $this.find('.zm-choiceGoods-goodsStateIcon2').css({
                        'transform': 'rotate(90deg)',
                        'transition': 'transform 0.8s'
                    })
                }
            }
            document.stopClick = true;
        }
    },
    //生成随机Id
    createId:function(){
        return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    },
    // 新建类的类名函数
    choiceFileNewClassName:function (inputs, cName) {
        var clsName = [];
        var newName = cName;
        var count = 2;
        inputs.each( function(i,ele) {
            clsName.push($(ele).attr('placeholder'));
        });
        while ($.inArray(newName, clsName) !== -1){
            newName = cName;
            newName = newName + '('+ count +')';
            count ++;
        }
        return newName;
    },
    //重命名获取字符位数
    choiceFileGetLength:function (v) {
        var len = 0;
        for (var i = 0; i < v.length; i++) {
            var a = v.charAt(i);
            len = (a.match(/[^\x00-\xff]/ig) != null) ? (len + 2) :(len + 1);
        }
        return len;
    },
    //文件类型判断
    fileNameTypeJudge:function (files, modules) {
        var arrData = [];
        $(files).each(function (i,v) {
            if(modules === 'picture'){
                if(/\.(gif|jpg|jpeg|png)$/i.test(v.name)){
                    arrData.push(v);
                }
            }else {
                if(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx)$/i.test(v.name)){
                    arrData.push(v);
                }
            }
        });
        return arrData;
    },
    //上传图片---input/file--拖拽
    choiceFileBtnImgUpdate:function (ele,modules) {
        $(document).on({
            drop: function (event) {event.preventDefault();},
            dragleave: function (event) {event.preventDefault();},
            dragenter: function (event) {event.preventDefault();},
            dragover: function (event) {event.preventDefault();}
        });
        $(ele)[0].addEventListener("drop", dropFn, false);
        function dropFn(event) {
            event.preventDefault();
            var upData = {list:[]};
            var fileList = event.dataTransfer.files;
            var arrData = choicePopUpCommon.fileNameTypeJudge(fileList, modules);
            $(arrData).each(function (i,ele) {
                var createId = upFileRequest($(ele)[0]);
                upData.list.push({name: $(ele)[0].name,state:'正在上传...',gross:'', tot: '', per: '', createId: createId});
            });
            choicePopUpCommon.choiceFileUpdateProgressBar(upData);
        }
        $(document).off("change","#zm-choicePicture-upPicBtn").on("change","#zm-choicePicture-upPicBtn",function(){
            var upFile=$('#zm-choicePicture-upPicBtn')[0].files;
            var upData = {list:[]};
            var arrData = choicePopUpCommon.fileNameTypeJudge(upFile, modules);
            $(arrData).each(function (i,ele) {
                var createId = upFileRequest($(ele)[0]);
                upData.list.push({name: $(ele)[0].name,state:'正在上传...',gross:0, tot: 0, per: 0, createId: createId});
            });
            choicePopUpCommon.choiceFileUpdateProgressBar(upData);
            $(this).val("");
        });
        $(document).off("click",".zm-choiceFile-uploadingStopTxt").on("click",".zm-choiceFile-uploadingStopTxt",function (e) {
            var box = $(this).closest('.zm-dialog-box.zm-movableBox');
            var createId = $(this).closest("li").attr("data-createId");
            //弹框提醒，回调
            var msg = '确定要停止上传所选择图片么？';
            // upCancel(createId);
            choicePopUpCommon.affirmDelete(msg);
            $(document).off('click', '.zm-choiceFile-confirm').on('click', '.zm-choiceFile-confirm', function () {
                var liLength;
                var createIdLi = $('li[data-createId='+ createId +']');
                liLength = createIdLi.siblings().length;
                createIdLi.remove();
                $(this).closest('.zm-dialog-box.zm-movableBox').remove();
                upCancel(createId);
                if(liLength === 0){
                    setTimeout(function () {
                        box.remove();
                        choicePopUpCommon.choiceIKnow('已全部处理完毕');
                    }, 2000);
                }
            });
            $(document).on('click', '.zm-choiceFile-cancel', function () {
                $(this).closest('.zm-dialog-box.zm-movableBox').remove();
            });
        });
        $(document).off('click', '.zm-choiceFile-uploadingStopAll').on('click', '.zm-choiceFile-uploadingStopAll', function () {
            var box = $(this).closest('.zm-dialog-box.zm-movableBox');
            var createIdLi = box.find('.zm-choiceFile-progressBarPageUl').find('li');
            var msg = '确定要停止上传所选择图片么？';
            choicePopUpCommon.affirmDelete(msg);
            $(document).off('click', '.zm-choiceFile-confirm').on('click', '.zm-choiceFile-confirm', function () {
                var liLength = 1;
                createIdLi.each(function (i,ele) {
                    var createId = $(ele).attr('data-createId');
                    upCancel(createId);
                    liLength = $(ele).siblings().length;
                    $(ele).remove();
                });
                $(this).closest('.zm-dialog-box.zm-movableBox').remove();
                if(liLength === 0){
                    setTimeout(function () {
                        box.remove();
                        choicePopUpCommon.choiceIKnow('已全部删除');
                    }, 2000);
                }
            });
            $(document).on('click', '.zm-choiceFile-cancel', function () {
                $(this).closest('.zm-dialog-box.zm-movableBox').remove();
            });

        });
        //重新上传的事件绑定
        var myMapfiles = new choicePopUpCommon.mapFiles();
        function upFileRequest(files) {
            //文件上传，传入文件对象
            var xhr;
            var fileObj = files || {};
            var formData = new FormData();
            var checkCategory = $('.zm-choiceFile-middleBoxList1').find('.zm-classListC-check');
            var checkCategoryId = checkCategory.attr('data-id') || checkCategory.parent().attr('data-id');
            formData.append("uploadFile",fileObj);
            formData.append("updateUrl", "");
            (!!checkCategoryId) ? formData.append("Categorys", checkCategoryId) : formData.append("Categorys", "-8888888888888888");
            xhr = new XMLHttpRequest();
            var createId = (!!fileObj.createId) ? fileObj.createId : choicePopUpCommon.createId();
            xhr.upload.addEventListener("progress", function(event) {
                uploadProgress(event, createId);
            }, false);
            xhr.addEventListener("load", function(event) {
                uploadComplete(event, createId);
            }, false);
            xhr.addEventListener("error", function(event) {
                uploadFailed(event, createId);
            }, false);
            xhr.addEventListener("abort", function(event) {
                uploadCanceled(event, createId);
            }, false);
            if(modules == 'picture'){
                xhr.open("POST", "/picture/webbuilder-api/upLoadFile/MultiplePictureUpload", true);
            }else {
                xhr.open("POST", "/file/webbuilder-api/upLoadFile/MultipleFileUpload", true);
            }
            myMapfiles.arrPush(myMapfiles.mapObj(createId,fileObj,xhr,new Date().getTime()));
            xhr.send(formData);
            return createId;
        }
        function uploadComplete(event, createId) {
            myMapfiles.arrDel(createId);
            var createIdLi = $('li[data-createId='+ createId +']');
            var liLength = createIdLi.siblings().length;
            var box = createIdLi.closest('.zm-dialog-box.zm-movableBox');
            createIdLi.css('position','absolute').animate({left:'-520px'}).remove();
            if(liLength === 0){
                box.remove();
                choicePopUpCommon.choiceIKnow('上传完成');
            }
        }
        function  uploadFailed(event, createId) {
            console.log(event+"----"+createId);
            //显示重新上传按钮
            var createIdLi = $('li[data-createId='+ createId +']');
            createIdLi.find('.zm-choiceFile-uploadingAgain').show().end()
                .find('.zm-choiceFile-updateState').text('上传失败！').addClass('zm-choiceFile-updateStateFail').end()
                .find('.zm-choiceFile-uploadingSpeed').text('     ').end()
                .find('.zm-choiceFile-updateSpareTime').text('');
            //点击重新上传调用以下方法
            $(document).on('click', '.zm-choiceFile-uploadingAgain', function () {
                var fileobj = myMapfiles.getfileObj(createId);
                var createIdLi = $(this).closest('li');
                fileobj.createId = createId;
                upFileRequest(fileobj);
                createIdLi.find('.zm-choiceFile-uploadingAgain').hide().end()
                    .find('.zm-choiceFile-updateState').text('正在上传...').removeClass('zm-choiceFile-updateStateFail').end()
                    .find('.zm-choiceFile-updateSpareTime').text('大概剩余00：00' ).end()
                    .find('.zm-choiceFile-uploadingSpeed').text('上传速度：0.00MB/s');
            });
        }
        function  uploadCanceled(event, createId) {
            //节点删除后删除数组
            myMapfiles.arrDel(createId);
        }
        function uploadProgress(event, createId){
            // 已经上传大小情况
            var loaded = event.loaded / (1024*1024);
            // 附件总大小
            var tot = event.total / (1024*1024);
            var per = Math.floor(100 * loaded / tot);
            var start_time = myMapfiles.getstart_time(createId);
            //上传速度
            var upSpeed = (loaded / ((new Date().getTime() - start_time) / 1000)).toFixed(2);
            //上传剩余时间
            var upTime = ((tot - loaded) / upSpeed).toFixed(2);
            var createIdLi = $('li[data-createId='+ createId +']');
            var obj = {
                loaded: loaded.toString().substring(0,5),
                tot: tot.toString().substring(0,5),
                upSpeed: upSpeed,
                upTime: myMapfiles.transformUpTime(upTime),
                per: per || 0,
                createId: createId
            };
            createIdLi.find('.zm-choiceFile-num').text(obj.per + '%');
            createIdLi.find('.zm-choiceFile-updateGross').text(obj.tot);
            createIdLi.find('.zm-choiceFile-updateTot').text(obj.loaded);
            createIdLi.find('.zm-choiceFile-updateSpareTime').text('大概剩余' + obj.upTime);
            createIdLi.find('.zm-choiceFile-uploadingSpeed').text('上传速度：'+ obj.upSpeed +'MB/s');
            if(3.6 * (+ obj.per ) > 180){
                createIdLi.find('.zm-choiceFile-pr2').show();
                createIdLi.find('.zm-choiceFile-pr1').css({transform:"rotate("+ 180 +"deg)"});
                createIdLi.find('.zm-choiceFile-pr2').css({transform:"rotate("+ Number((18/5)*obj.per - 360) +"deg)"});
            }else {
                createIdLi.find('.zm-choiceFile-pr1').css({transform:"rotate("+ (3.6 * (+ obj.per )) +"deg)"});
            }
        }
        function upCancel(createId) {
            var fId = createId || "";
            var this_ajaxobj = myMapfiles.getxhrObj(fId);
            this_ajaxobj.abort();
        }
    },
    //文件上传功能构造函数
    mapFiles : function() {
        this.mapArr = [];
        this.arrLen = function() {
            return this.mapArr.length;
        };
        var len;
        this.transformUpTime = function (upTime) {
            if(upTime.toString() === 'NaN' || upTime.toString() === 'Infinity'){
                return '00：00';
            }
            var m = Math.floor(upTime / 60);
            var s = Math.ceil(upTime % 60);
            m = (m > 10) ?  m:  '0' + m;
            s = (s > 10) ?  s:  '0' + s;
            return m + '：' + s;
        };
        this.mapObj = function(uuid, fileObj, ajaxEvt,start_time) {
            var this_obj = {
                uuid : uuid,
                fileObj : fileObj,
                ajaxEvt : ajaxEvt,
                start_time: start_time
            }
            return this_obj;
        };
        this.setfileObj = function(uuid, fileObj) {
            // 根据uuid设置文件对象
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    this.mapArr[i].fileObj = fileObj;
                    break;
                }
            }
        };
        this.setxhrObj = function(uuid, xhrObj) {
            // 根据uuid设置上传对象
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    this.mapArr[i].ajaxEvt = xhrObj;
                    break;
                }
            }
        };
        this.getfileObj = function(uuid) {
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    return this.mapArr[i].fileObj;
                }
            }
        };
        this.getxhrObj = function(uuid) {
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    return this.mapArr[i].ajaxEvt;
                }
            }
        };
        this.getstart_time=function (uuid) {
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    return this.mapArr[i].start_time;
                }
            }
        };
        this.arrDel = function(uuid) {
            // 根据uuid的值删除对应的数组项
            for (var i = 0; i < len; i++) {
                if (this.mapArr[i].uuid == uuid) {
                    this.mapArr.splice(i, 1);
                    break;
                }
            }
            len = this.arrLen();
        };
        this.arrPush = function(obj) {
            // 添加数组
            this.mapArr.push(obj);
            len = this.arrLen();
        };
    },
    //上传文件进度页面
    choiceFileUpdateProgressBar:function (data) {
        zmEditor.dialog.open(
            {
                title:'文件上传',
                content: '<div class="zm-choiceFile-progressBarPageBox"><div class="zm-choiceFile-progressBarPage"><ul class="zm-choiceFile-progressBarPageUl"></ul></div><div class="zm-choiceFile-uploadingStopAll">删除全部</div></div>',
                width: 520,
                height: 500,
                movable:true,
                target: $('.zm-choiceFile-wrap')
            },function () {
                var box = $('.zm-choiceFile-progressBarPageBox');
                var removeNode = $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help');
                removeNode.closest('.zm-dialog').find('.zm-dialog-header-btn.zm-dialog-close').html(choicePopUpCommon.closeBtnSvg);
                $(".zm-choiceFile-progressBarPage").mCustomScrollbar({theme:"minimal"});
                box.closest('.zm-dialog-box.zm-movableBox').addClass('zm-choiceFile-wrapShadow');
                //删除的下划线
                box.on('mouseenter mouseleave','.zm-choiceFile-uploadingStop',function (event) {
                    if (event.type == 'mouseenter') {
                        $(this).find('.zm-choiceFile-uploadingStopTxt').css('textDecoration','underline');
                    }else {
                        $(this).find('.zm-choiceFile-uploadingStopTxt').css('textDecoration','none');
                    }
                });
                choicePopUpRendering.zmUpdateProgressBar(data);
                // $('.zm-dialog-bg').remove();
                $('.mCSB_scrollTools.mCSB_6_scrollbar.mCS-minimal.mCSB_scrollTools_vertical').remove();
                box.closest('.zm-dialog-box.zm-movableBox').find('.zm-dialog-header.zm-movable-header').css({'height':'45px', 'font-size':'18px'});
                removeNode.parent().css({'padding-left':'10px', 'padding-right':'10px', 'height':'40px'});
                removeNode.siblings('.zm-dialog-title').css({'font-size':'16px', 'font-weight':'500', 'height':'40px', 'line-height':'40px'});
                removeNode.siblings('.zm-dialog-close').css({'margin-top':'6px'});
                removeNode.remove();
            })
    }
};