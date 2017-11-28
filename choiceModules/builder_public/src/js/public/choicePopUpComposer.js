/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpComposer = {
    choiceComposerPopUp:function (args) {
        zmEditor.dialog.loading("choiceComposer.html", function () {
            var titleHtml = "<span class='zm-choiceFile-iconTitle'><svg version='1.1'xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 256 255.3'><path d='M256,214c0,5.5-0.1,10-0.1,16.5c0,15.4-22.7,25.3-35.5,18.9c-2.5-1.2-6.8-1.4-8.9-10.3c-1-4.1,2.2-10.2,5.5-12.8c7.3-5.9,19.5-4,27.6-0.5l0-57.5l-45.1,8.2c0,8.7,0,22,0,40.7c0,5.4,0,11.2,0,17.5c0,15.1-22.1,24.8-34.9,18.5c-2.5-1.2-7.1-3-8.8-9.7c-1.1-4.1,2-10.4,5.3-13c7.3-5.7,17.4-4.3,26.8,0.4l-0.1-43.5l0.3-19.2c-0.4-4.7,2.7-9.1,7.3-9.9l50-9.1c4.9-0.9,9.5,2.5,10.4,7.5c0.2,1,0.1,2,0,2.9C255.9,162.8,256,179.8,256,214L256,214z'/><path d='M162,144.4c-0.7-0.3-1.3-0.6-2-0.9c-0.8-0.4-1.7-0.7-2.5-1.1c20.9-14,34.7-37.6,34.7-64.4c0-43-35.5-77.9-79.4-77.9C69.1,0,33.5,34.9,33.5,77.9c0,26.8,13.8,50.4,34.7,64.4c-0.8,0.3-1.6,0.7-2.4,1c-1.5,0.7-3,1.4-4.5,2.1c-1.7,0.9-3.4,1.8-5,2.7c-1.3,0.7-2.5,1.5-3.7,2.2c-1.8,1.1-3.6,2.3-5.3,3.5c-1,0.7-1.9,1.4-2.8,2.1c-1.9,1.4-3.7,2.8-5.5,4.3c-0.6,0.5-1.2,1.1-1.8,1.6c-2,1.8-4,3.6-5.8,5.5c-0.1,0.1-0.1,0.2-0.2,0.2c-16,16.4-26.8,37.5-30.3,61c-0.5,1.3-0.8,2.7-0.8,4.2l0.1,1c0,6.1,5.1,11.1,11.3,11.1c6.3,0,10.8-5.3,11.6-11.2l0,0c5.4-43.1,42-76.6,87-78c1,0,1.9,0.1,2.9,0.1c1,0,1.9-0.1,2.9-0.1c14.2,0.4,27.5,4.1,39.3,10.2c1.3,0.6,4.7,1,6.8,1c6,0,9.7-4.4,10.4-9.9C172.3,157,173.7,149.5,162,144.4z M112.9,133.6c-31.3,0-56.7-24.9-56.7-55.7c0-30.7,25.4-55.7,56.7-55.7c31.3,0,56.7,24.9,56.7,55.7C169.6,108.7,144.2,133.6,112.9,133.6z'/><path d='M112.9,22.3'/></svg></span><span>选择创作人</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').closest('.zm-dialog-header.zm-movable-header').css({
                'height': '50px',
                'line-height': '50px'
            }).end().siblings('.zm-dialog-close').css({'margin-top': '12px'}).end().siblings('.zm-dialog-title').find('.zm-choiceFile-iconTitle svg').css({
                'top': '5px',
                'width': '22px',
                'height': '22px'
            }).end().end().remove();

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
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj);
            choicePopUpCommon.commonFunction(args);// 通用方法调用
            choicePopUpCommon.PicDragSort();//拖拽图片
        })
    }
};