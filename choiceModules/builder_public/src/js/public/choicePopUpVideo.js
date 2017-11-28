/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpVideo = {
    choiceVideoPopUp:function (args) {
        zmEditor.dialog.loading("choiceVideo.html", function () {
            var titleHtml = "<span>视频列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 视频事件方法调用
            var obj1 = {
                data: {pStart: 1, pLength: 20},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            var obj2 = {
                data: {type: 'all', iDisplayStart: 0, iDisplayLength: 20},
                mData: args.mData,
                modules: args.modules + 'Free',
                type: true
            };
            var obj3 = {
                data: {},
                mData: args.mData,
                modules: args.modules,
                type: false
            };
            var obj4 = {
                data: {},
                mData: args.mData,
                modules: args.modules + 'Free',
                type: false
            };
            $('#modules').before('<script src="../js/public/choicePopUpCommon.js"></script>')
                .before('<script src="../js/public/choicePopUpRoute.js"></script>')
                .before('<script src="../js/public/choicePopUpAJAX.js"></script>')
                .before('<script src="../js/public/choicePopUpRendering.js"></script>');
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj1);
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj2);
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj3);
            choicePopUpCommon.choiceFileAJAXFunctionAsync(obj4);
            choicePopUpCommon.addCatalogEvent(args.modules);//类目设置-添加类目-二级
            choicePopUpCommon.choiceFileTopTab();//顶部tab栏切换
            choicePopUpCommon.commonFunction(args);// 通用方法调用

            choicePopUpVideo.choiceFileVideoShade();//视频选中的遮罩层

        })
    },
    //点击选中视频添加遮罩层
    choiceFileVideoShade:function () {
        var listBox = $('.zm-chioceFile-zmpicLists');
        var videoShade = '<div class="zm-choiceFile-videoShade"></div>';
        listBox.on('click','.zm-choiceR-videolists',fn);
        function fn() {
            var $this = $(this);
            if($this.hasClass('zm-chioceFile-checkSign')){
                $this.prepend(videoShade);
            }else {
                $this.find('.zm-choiceFile-videoShade').remove();
            }
        }
    }
};