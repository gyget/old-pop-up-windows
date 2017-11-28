/**
 * Created by gengliangxiang on 2017/11/10.
 */
var choicePopUpPicture = {
    choicePicturePopUp:function (args) {
        zmEditor.dialog.loading("choicePicture.html", function () {
            var titleHtml = "<span class='zm-choiceFile-iconTitle'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' version='1.1'><path d='M914.285714 109.714286 109.714286 109.714286c-40.393143 0-73.142857 32.749714-73.142857 73.142857l0 658.285714c0 40.393143 32.749714 73.142857 73.142857 73.142857l804.571429 0c40.393143 0 73.142857-32.749714 73.142857-73.142857L987.428571 182.857143C987.428571 142.464 954.678857 109.714286 914.285714 109.714286zM914.285714 841.142857 109.714286 841.142857 109.714286 182.857143l804.571429 0L914.285714 841.142857zM292.571429 438.857143c40.393143 0 73.142857-32.749714 73.142857-73.142857 0-40.411429-32.749714-73.142857-73.142857-73.142857-40.356571 0-73.142857 32.731429-73.142857 73.142857C219.428571 406.107429 252.214857 438.857143 292.571429 438.857143zM658.285714 402.285714 441.536 701.160229 329.142857 548.571429 146.285714 804.571429 877.714286 804.571429Z'/></svg></span><span>图片列表</span>";
            $(".zm-dialog-title:last").html(titleHtml);
            var mySelector = '.zm-choiceRadio-middleR'; //右面大盒子
            $('.zm-dialog-header-btn.zm-tooltip.zm-dialog-help').remove();
            // 图片事件方法调用
            var obj1 = {
                data: {fIsTrash: 0,iDisplayLength:28,iDisplayStart:0},
                mData: args.mData,
                modules: args.modules,
                type: true
            };
            var obj2 = {
                data: {type: 'all', iDisplayStart: 0, iDisplayLength: 28},
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
            choicePopUpCommon.commonFunction(args);// 通用方法调用

            choicePopUpCommon.addCatalogEvent(args);//类目设置-添加类目-二级
            choicePopUpCommon.choiceFileBtnImgUpdate(mySelector, args.modules);//上传图片
            choicePopUpCommon.choiceFileTopTab();//顶部tab栏切换
            choicePopUpCommon.PicDragSort();//拖拽图片
            choicePopUpCommon.catalogDragSort(args.modules);//拖拽类目

            choicePopUpPicture.choicePicMagnify();//查看大图--轮播展示
        })
    },
    //放大查看图片
    choicePicMagnify:function () {
        var listBox = $('.zm-choiceRadio-spli');
        listBox.on('click','.zm-chioceFile-magnifyClick',function (e) {
            e.stopPropagation();
            var $this = $(this);
            var thisPic = $this.closest('li.zm-choiceFile-fileLi');
            var img = thisPic.closest('.zm-choiceRadio-middle').find('.zm-chioceFile-magnify');
            var picListLength = thisPic.parent().find('li.zm-choiceFile-fileLi').length;
            var thisIndex = thisPic.index();
            img.show();
            picView(thisIndex);
            // 下一张
            img.on('click','.zm-chioceFile-magnifyBtnR',function () {
                thisIndex ++;
                if(thisIndex >= picListLength){
                    thisIndex = 0;
                }
                picView(thisIndex);
            });
            // 上一张
            img.on('click','.zm-chioceFile-magnifyBtnL',function () {
                thisIndex --;
                if(thisIndex < 0){
                    thisIndex = picListLength - 1;
                }
                picView(thisIndex);
            });
            img.on('mouseenter',function () {
                $('.zm-chioceFile-magnifyBtn').show();
            });
            img.on('mouseleave',function () {
                $('.zm-chioceFile-magnifyBtn').hide();
            });
            $(document).on('click', '.zm-chioceFile-magnifyCloseBtn, .zm-choicePicture-middleL',function () {
                $(this).closest('.zm-choiceFile-middleBoxList').find('.zm-chioceFile-magnify').hide();
            });
            function picView(thisIndex) {
                var picSrc = $this.closest(".zm-choiceRadio-spli").find('.zm-choiceR-lists').eq(thisIndex).attr('data-fsrc');
                var picName = thisPic.parent().find('li.zm-choiceFile-fileLi:eq('+thisIndex+')').attr('data-fname');
                img.find('div.zm-chiocePic-bigImg').css('background-image','url('+ picSrc +')');
                img.find('span.zm-chocieFile-bigPicName').text(picName);
            }
        });
    }

};