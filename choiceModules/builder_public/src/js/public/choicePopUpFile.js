/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpFile = {
    choiceFilePopUp:function (args) {
        zmEditor.dialog.loading("choiceFile.html", function () {
            var titleHtml = "<span class='zm-choiceFile-iconTitle'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' version='1.1'><path d='M914.285714 109.714286 109.714286 109.714286c-40.393143 0-73.142857 32.749714-73.142857 73.142857l0 658.285714c0 40.393143 32.749714 73.142857 73.142857 73.142857l804.571429 0c40.393143 0 73.142857-32.749714 73.142857-73.142857L987.428571 182.857143C987.428571 142.464 954.678857 109.714286 914.285714 109.714286zM914.285714 841.142857 109.714286 841.142857 109.714286 182.857143l804.571429 0L914.285714 841.142857zM292.571429 438.857143c40.393143 0 73.142857-32.749714 73.142857-73.142857 0-40.411429-32.749714-73.142857-73.142857-73.142857-40.356571 0-73.142857 32.731429-73.142857 73.142857C219.428571 406.107429 252.214857 438.857143 292.571429 438.857143zM658.285714 402.285714 441.536 701.160229 329.142857 548.571429 146.285714 804.571429 877.714286 804.571429Z'/></svg></span><span>文件管理</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            var mySelector = '.zm-choiceRadio-middleR';
            // 事件方法调用
            var obj = {
                data: {currPage: 1, iDisplayLength: 20, iDisplayStart: 0},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            $('#modules').before('<script src="../js/public/choicePopUpCommon.js"></script>')
                .before('<script src="../js/public/choicePopUpRoute.js"></script>')
                .before('<script src="../js/public/choicePopUpAJAX.js"></script>')
                .before('<script src="../js/public/choicePopUpRendering.js"></script>');
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj);
            choicePopUpCommon.PicDragSort();//拖拽图片
            choicePopUpCommon.commonFunction(args);// 通用方法调用
            choicePopUpCommon.choiceFileBtnImgUpdate(mySelector, args.modules);//上传文件
        })
    }
};