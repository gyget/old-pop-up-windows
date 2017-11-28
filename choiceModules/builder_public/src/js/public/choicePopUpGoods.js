/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpProduct = {
    choiceProductPopUp:function (args) {
        zmEditor.dialog.loading("choiceGoods.html", function (e) {
            var titleHtml = "<span>产品列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 事件方法调用
            var obj1 = {
                data: {},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            var obj2 = {
                data: {},
                mData: args.mData,
                modules: args.modules,
                type: false
            };
            $('#modules').before('<script src="../js/public/choicePopUpCommon.js"></script>')
                .before('<script src="../js/public/choicePopUpRoute.js"></script>')
                .before('<script src="../js/public/choicePopUpAJAX.js"></script>')
                .before('<script src="../js/public/choicePopUpRendering.js"></script>');
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj1);
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj2);
            choicePopUpCommon.commonFunction(args);// 通用方法调用

            choicePopUpCommon.choiceFileGoodsPullDown();//产品/服务额外母体点击事件

            choicePopUpProduct.addCatalogEventGoods(args.modules);//类目设置框功能--产品添加类
            //choicePopUpCommon.goodsListsSort();//列表内容拖拽排序--产品列表类型
            choicePopUpCommon.catalogDragSortGoods();
        })
    },
    //类目设置框功能--产品添加类
    addCatalogEventGoods:function (modules) {
        var setIconParent = $('.zm-choicePicture-middleLTop');
        setIconParent.on('click','.zm-choiceFile-bigCatalog',f1);
        setIconParent.on('click','.zm-choiceFile-catalog',f2);
        setIconParent.on('click','.zm-choiceFile-smallCatalog',f3);
        // 添加大类
        function f1(event) {
            event.stopPropagation();
            var cLi = $(this).parent().parent().parent().parent();
            var inputs = $(this).closest('.zm-chioceFile-cataLogCls').find('.zm-choiceFile-catalog1').children('p').find('.zm-chioceFile-catalogName');
            var sendData;
            var newClsName = '新建产品大类';
            var newName = choicePopUpCommon.choiceFileNewClassName(inputs, newClsName);
            $(this).parent().hide();
            sendData = {fName:newName,fParentId: 0,fSort:Number(cLi.attr('data-sort')) + 1};
            var result = choicePopUpRoute.choicePictureAddCategory(sendData, modules);
            if(!result){
                choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                return
            }
            if(result.status === 0){
                var categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                choicePopUpRendering.goodsCatalogRendering(categoryData);
                $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls2').eleDragSort({
                    dragEle:'.zm-choiceFile-catalog2'});
                $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls3').eleDragSort({
                    dragEle:'.zm-choiceFile-catalog3'});
                $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
            }else {
                choicePopUpCommon.choiceIKnow(result.message);
            }
        }
        //添加中类
        function f2(event) {
            event.stopPropagation();
            var $this = $(this);
            var isT = $this.parent().find('.zm-choiceFile-bigCatalog').length;
            var inputs1 = $this.closest('p.zm-chioceFile-clsLists').siblings('.zm-chioceFile-cataLogCls2').find('.zm-choiceFile-catalog2').children('p').find('.zm-chioceFile-catalogName');
            var inputs2 = $this.closest('.zm-chioceFile-cataLogCls2').find('.zm-choiceFile-catalog2').children('p').find('.zm-chioceFile-catalogName');
            var newClsName = '新建产品中类';
            fn(isT,inputs1, inputs2, newClsName, $this);
        }
        //添加小类
        function f3(event) {
            event.stopPropagation();
            var $this = $(this);
            var isT = $this.parent().find('.zm-choiceFile-catalog').length;
            var inputs1 = $this.closest('.zm-choiceFile-catalog2').find('.zm-chioceFile-cataLogCls3').find('.zm-chioceFile-catalogName');
            var inputs2 = $this.closest('.zm-chioceFile-cataLogCls3').find('.zm-chioceFile-catalogName');
            var newClsName = '新建产品小类';
            fn(isT,inputs1, inputs2, newClsName, $this);
        }
        function fn(isT,inputs1, inputs2, newClsName, $this) {
            var sendData, newName, result, thisLi, categoryData;
            if(isT){
                thisLi = $this.closest('li');
                newName = choicePopUpCommon.choiceFileNewClassName(inputs1, newClsName);
                sendData = {fName:newName,fParentId: thisLi.attr('data-id'),fSort: 0};
                result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.goodsCatalogRendering(categoryData);
                    $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls2').eleDragSort({
                        dragEle:'.zm-choiceFile-catalog2'});
                    $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls3').eleDragSort({
                        dragEle:'.zm-choiceFile-catalog3'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }else{
                thisLi = $this.closest('li');
                newName = choicePopUpCommon.choiceFileNewClassName(inputs2, newClsName);
                sendData = {fName:newName,fParentId: thisLi.attr('data-fParentId'),fSort: Number(thisLi.attr('data-sort')) + 1};
                result =  choicePopUpRoute.choicePictureAddCategory(sendData, modules);
                if(!result){
                    choicePopUpCommon.choiceIKnow('接口返回错误---接口不通控制台报错');
                    return
                }
                if(result.status === 0){
                    categoryData = choicePopUpRoute.choiceFileGetClassify(modules);//ajax获取类目数据
                    choicePopUpRendering.goodsCatalogRendering(categoryData);
                    $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls2').eleDragSort({
                        dragEle:'.zm-choiceFile-catalog2'});
                    $('.zm-choiceFile-middleBoxList1').find('.zm-chioceFile-cataLogCls3').eleDragSort({
                        dragEle:'.zm-choiceFile-catalog3'});
                    $(".zm-choicePicture-middleLTop").mCustomScrollbar({theme:"minimal"});
                }else {
                    choicePopUpCommon.choiceIKnow(result.message);
                }
            }
            $(this).parent().hide();
        }
    }
};