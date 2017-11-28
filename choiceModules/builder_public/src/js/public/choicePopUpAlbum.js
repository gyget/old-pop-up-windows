/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpAlbum = {
    choiceAlbumPopUp:function (args) {
        zmEditor.dialog.loading("choiceAlbum.html", function () {
            var titleHtml = "<span class='zm-choiceFile-iconTitle'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' version='1.1'><path d='M768 512C768 370.615108 653.384896 256 512 256 370.615104 256 256 370.615108 256 512 256 653.384892 370.615104 768 512 768 653.384896 768 768 653.384892 768 512ZM512 1024 512 1024C229.230208 1024 0 794.769792 0 512 0 229.230208 229.230208 0 512 0 794.769792 0 1024 229.230208 1024 512 1024 794.769792 794.769792 1024 512 1024L512 1024ZM512 597.333333 512 597.333333C559.128299 597.333333 597.333333 559.128294 597.333333 512 597.333333 464.871706 559.128299 426.666667 512 426.666667 464.871701 426.666667 426.666667 464.871706 426.666667 512 426.666667 559.128294 464.871701 597.333333 512 597.333333L512 597.333333Z'/></svg></span><span>专辑列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            var wrap = $('.zm-choiceFile-wrap');
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-close').find().remove();
            // 事件方法调用
            var obj = {
                data: {iDisplayStart: 0, iDisplayLength: 36},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            $('#modules').before('<script src="../js/public/choicePopUpCommon.js"></script>')
                .before('<script src="../js/public/choicePopUpRoute.js"></script>')
                .before('<script src="../js/public/choicePopUpAJAX.js"></script>')
                .before('<script src="../js/public/choicePopUpRendering.js"></script>');
            choicePopUpCommon.commonFunction(args);// 通用方法调用
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj);
            choicePopUpCommon.PicDragSort();//拖拽图片
        })
    }
};