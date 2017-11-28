/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpRadio = {
    choiceRadioPopUp:function (args) {
        zmEditor.dialog.loading("choiceRadio.html", function () {
            var titleHtml = "<span class='zm-choiceFile-iconTitle'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 263.23 231.25'><path d='M197.48,221.95'/><path class='cls-1' d='M262.83,66.63c.13-3.12,3.33-20.5-10.83-31.33s-33.33-15.17-40.92-16.75C205.21,17.32,188.5,11,178.4,5a77.68,77.68,0,0,1-6.72-5V177.51A53.72,53.72,0,0,0,147,171.79c-23.09,0-41.81,13.31-41.81,29.73-.71,19.1,15.46,29.73,41.81,29.73,21.06,0,37.09-10.06,40.93-23.47,3.37-8.44,2.89-26.78,2.89-26.78s0-78.08,0-128.41C200.87,54.53,260.32,66.05,262.83,66.63Z'/><rect class='cls-1' y='53.21' width='124.71' height='18.88'/><rect class='cls-1' y='92.88' width='124.71' height='18.88'/><rect class='cls-1' y='133.54' width='124.71' height='18.88'/></g></g></svg></span><span>音频列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 事件方法调用
            var obj1 = {
                data: {iDisplayStart: 0, iDisplayLength: 28},
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

            choicePopUpRadio.choiceFileRadioShade();//选中音频添加的遮罩层
            choicePopUpCommon.PicDragSort();//拖拽图片
            choicePopUpCommon.catalogDragSort(args.modules);//拖拽类目
        })
    },
    //点击选中音频添加遮罩层
    choiceFileRadioShade:function () {
        var listBox = $('.zm-chioceFile-zmpicLists');
        var videoShade = '<div class="zm-choiceFile-radioShade"></div>';
        listBox.on('click','.zm-choiceR-radiolists',fn);
        function fn() {
            var $this = $(this);
            if($this.hasClass('zm-chioceFile-checkSign')){
                $this.prepend(videoShade);
            }else {
                $this.find('.zm-choiceFile-radioShade').remove();
            }
        }
    }
};