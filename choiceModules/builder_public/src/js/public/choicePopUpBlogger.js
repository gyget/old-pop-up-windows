/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpBlogger = {
    choiceBloggerPopUp:function (args) {
        zmEditor.dialog.loading("choiceBlogger.html", function () {
            var titleHtml = "<span>博客列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 事件方法调用
            var obj = {
                data: {descOrAsc: args.descOrAsc, iDisplayLength: 10, sortBy: args.sortBy},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            $('#modules').before('<script src="../js/public/choicePopUpCommon.js"></script>')
                .before('<script src="../js/public/choicePopUpRoute.js"></script>')
                .before('<script src="../js/public/choicePopUpAJAX.js"></script>')
                .before('<script src="../js/public/choicePopUpRendering.js"></script>');
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj);
            choicePopUpCommon.commonFunction(args);// 通用方法调用

            choicePopUpCommon.goodsListsSort();//列表内容拖拽排序--产品列表类型
        })
    }
};