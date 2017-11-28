/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpService = {
    choiceServicePopUp:function (args) {
        zmEditor.dialog.loading("choiceService.html", function () {
            var titleHtml = "<span>服务列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 事件方法调用
            var obj1 = {
                data: {pageSize: 15, fCateId: 0, pageIndex: 0},
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

            choicePopUpCommon.addCatalogEvent(args.modules);//类目设置-添加类目-二级
            choicePopUpCommon.choiceFileGoodsPullDown();//产品/服务额外母体点击事件
            //choicePopUpCommon.goodsListsSort();//列表内容拖拽排序--产品列表类型
            choicePopUpCommon.catalogDragSort(args.modules);//拖拽类目
        })
    }
};