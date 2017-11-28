/**
 * Created by Administrator on 2017/11/10.
 */
if(!zmEditor){
    var zmEditor={};
}

zmEditor.dialog = {
    btnInfo:{
        setHref:{
            help:'给组件设置链接！',
            close:'关闭'
        }
    },
    loading:function(url,cb){
        var box = zmEditor.dialog.box();
        box.find(".zm-dialog-content")
            .load(url, function () {
                box.css({width:'auto',height:'auto'}).appendTo('body');
                box.zmDialog('noMovable');
                if(cb){
                    cb()
                }
            })
    },
    box: function () {
        var e = $('<div class="zm-dialog-box zm-movableBox" data-animate="">'
            + '<div class="zm-dialog" >'
            + '<div class="zm-dialog-header zm-movable-header" >'
            + '<span class="zm-dialog-title">设置</span>'
            + '<span class="zm-dialog-header-btn zm-tooltip zm-dialog-close" data-zm-title="关闭"></span>'
            + '<span class="zm-dialog-header-btn zm-tooltip zm-dialog-help" ></span>'
            + '</div>'
            + '<div class="zm-dialog-content">'
            + '</div>'
            + '</div></div>');
        return e;
    },
    Tabbox: function () {
        var e = $('<div class="zm-dialog-box zm-movableBox" data-animate="">'
            + '<div class="zm-dialog" >'
            + '<div class="zm-dialog-header zm-movable-header" style="height:35px;">'
            + '<span class="zm-dialog-title" style="font-size:14px;">设置</span>'
            + '</div>'
            + '<div class="zm-dialog-content" style="height:80px !important;min-height:80px;">'
            + '</div>'
            + '</div></div>');
        return e;
    },
    open:function(obj,cb,filter){
        if(typeof obj == 'string') {
            var temp = $('<div></div>').load(obj,function(){
                var dialog = temp.find(".zm-dialog-box");
                dialog.append('<div class="zm-dialog-bg"></div>');
                dialog.appendTo('body');
                dialog.zmDialog();
                if(cb){
                    cb();
                }
            });
        }else if( filter == 'tab') {
            zmEditor.dialog.Tabbox().zmDialog(obj);
            if(cb){
                cb();
            }
        }else{
            zmEditor.dialog.box().zmDialog(obj);
            if(cb){
                cb();
            }
        }
    },
    previewPane:function(obj){
        var e = $('<div class="zm-QuickPreview-popup">'
            +'<div class="prev_img"><video class="prev_video" loop autoplay></video></div>'
            +'<div class="prev_mes"><span class="prev_name"></span><span class="prev_time"></span></div>'
            +'</div>');
        var _bg = obj.bg,
            _type = obj.type,
            _name = obj.name,
            _time = obj.time;
        var prev_img = e.find(".prev_img"),
            prev_video = e.find(".prev_video"),
            prev_name = e.find(".prev_name"),
            prev_time = e.find(".prev_time");
        switch(_type){
            case "image":
                prev_img.css({"background": "url("+ _bg + ")","backgroundSize": "cover"});
                prev_name.text(_name);
                break;
            case "overlay":
                prev_img.css({"background": _bg });
                prev_name.text(_name);
                break;
            case "video":
                prev_video.attr("src",_bg);
                prev_name.text(_name);
                prev_time.text(_time);
                break;
            default:
                console.log("错误的预览格式");
                break;
        }
        return e;
    }
};
$(document).on("mouseenter mouseleave",".zm-QuickLook",function(e){
    var _this = $(this);
    var _bg = _this.attr("data-prev-bg");
    var _type = _this.attr("data-prev-type");
    var _name = _this.attr("data-prev-name");
    var _time = _this.attr("data-prev-time");
    if(e.type == "mouseenter"){
        var x = e.clientX,
            y = e.clientY,
            l = e.offsetX,
            t = e.offsetY,
            w = _this.width(),
            h = _this.height();
        var pre_x = x - l + w + 5,
            pre_y = y - t - (198 - h)/2;
        var popup = zmEditor.dialog.previewPane({bg: _bg,type: _type,name: _name,time: _time});
        popup.css({left: pre_x,top: pre_y});
        $("body").append(popup);
    }else {
        $(".zm-QuickPreview-popup").remove();
    }
});
(function($){
    /*测试   点击跳转*/
    $.fn.zmDialog=function(obj){
        if(obj=='remove'){
            this.closest(".zm-dialog-bg").fadeOut().remove();
            this.closest('.zm-dialog-box').remove();
        }else{
            var _this = this,width,height,headerH=0,footerH=0,animate='';
            if(obj){
                _this.append("<div class='zm-dialog-bg'></div>");
                if(obj.movable==false){
                    _this.find('.zm-dialog-header').removeClass('zm-movable-header');
                }
                if(obj.target){
                    obj.target.append(_this);
                }
                if(obj.title&&obj.title!=""){
                    _this.find(".zm-dialog-title").text(obj.title);
                }
                if(obj.content&&obj.content!=""){
                    _this.find(".zm-dialog-content").append(obj.content);
                }
                if(obj.width&&obj.width!=""){
                    width=obj.width;
                }else{
                    width = _this.outerWidth();
                }
                if(obj.height&&obj.height!=""){
                    height=obj.height;
                }else{
                    height = _this.outerHeight();
                }
                if(obj.footer&&obj.footer!=""){
                    _this.find('.zm-dialog').append(obj.footer);
                }
                if(obj.animate&&obj.animate!=""){
                    animate=obj.animate;
                }
            }
            else{
                animate=_this.attr("data-animate")||"";
                width = _this.outerWidth();
                height = _this.outerHeight();
            }
            footerH = _this.find(".zm-dialog-footer").outerHeight();
            headerH = _this.find(".zm-dialog-header").outerHeight();
            _this.css({width:width,height:height,marginLeft: -width / 2, marginTop: -height / 2});
            switch (animate.substr(0, 17)) {
                case "fade":
                    _this.fadeIn(300);
                    break;
                case "slide":
                    _this.slideDown(300);
                    break;
                case "zm-dialog-animate":
                    _this.addClass(animate);
                    _this.show();
                    break;
                default:
                    _this.show();
                    break;
            }
            _this.css("display","block")
        }
    };

})(jQuery);
(function($){
    $.fn.eleDragSort = function(ay){
        if(!ay.dragEle){return false;}
        var doc = $(document),
            sortDone = true,//是否排序完成
            isSort = false,//是否进行排序操作
            down='mousedown',
            move='mousemove',
            up='mouseup';
        var box = this;
        document.stopClick = true;
        var obj = {
            dragEle:ay.dragEle,
            moveEle : ay.moveEle||ay.dragEle,
            opacity : ay.opacity||0.3,
            offset : ay.offset||0,
            rule : ay.rule||'lr',
            speed : ay.speed||400,
            callback : ay.callback||function(){}
        };
        box.each(function (i,ele) {
            $(ele).on(down,obj.dragEle,function(e){
                var variety = $(ele).attr('data-variety');
                if(sortDone){
                    e.preventDefault();
                    e.stopPropagation();
                    var _this = $(this).closest(obj.moveEle);
                    var sortId = _this.attr('data-id');
                    var oldIndex = _this.index();
                    var dx = e.clientX,
                        dy = e.clientY,
                        dl = _this.offset().left,
                        dt = _this.offset().top,
                        dragEleW = _this.width(),
                        dragEleH = _this.height();
                    var temp = _this.clone();
                    var whiteShade1 = _this.find('.zm-choiceFile-whiteShade1').length;
                    var whiteShade2 = _this.find('.zm-choiceFile-whiteShade2').length;
                    var whiteShade3 = _this.find('.zm-choiceFile-whiteShade3').length;
                    temp.removeClass('zm-choiceFile-checkStyle zm-chioceFile-checkSign');
                    doc.on(move,moveFn);
                    doc.on(up,upFn);
                    // move
                    function moveFn(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var mx = e.clientX,
                            my = e.clientY;
                        var picShadeDiv = null;
                        _this.css('cursor','move');
                        temp.css('cursor','move');
                        if((Math.abs(mx-dx)> 10||Math.abs(my-dy)> 10)&&isSort==false){
                            document.stopClick = false;
                            if(_this.hasClass('zm-choiceR-lists')) {
                                if (variety == 'video') {
                                    picShadeDiv = $('<div class="zm-choiceFile-moveVideoShade zm-choiceFile-moveShade"></div>');
                                }else {
                                    picShadeDiv = $('<div class="zm-choiceFile-movePicShade zm-choiceFile-moveShade"></div>');
                                }
                                _this.find('.zm-choiceFile-whiteShade').remove();
                                _this.append(picShadeDiv);
                                _this.addClass('zm-choiceFile-isMove');
                                _this.find('.zm-chioceFile-fileEdit').hide();
                            }
                            isSort=true;
                            temp.addClass('zm-choiceFile-fileProcessMove').css("opacity",obj.opacity);
                            _this.after(temp);
                            _this.css({"position":"fixed","left":dl,"top":dt});
                        }
                        if(isSort){
                            if(_this.hasClass('zm-choiceFile-pictureDragSort')){
                                _this.css({"left":mx - (dragEleW/2 + 10),"top":my - (dragEleH/2 + 10),"z-index":'20'});
                            }else {
                                _this.css({"left":dl + mx - dx,"top":dt + my - dy,"z-index":'20'});
                            }
                            $(ele).find(obj.moveEle).not(_this).not(temp).each(function(){
                                var that = $(this),
                                    o = that.offset(),
                                    l = o.left,
                                    r = l+that.outerWidth(),
                                    t = o.top,
                                    b = t+that.outerHeight();
                                if(mx > l && mx < r && my > t && my < b){
                                    if(obj.rule=='tb'){
                                        if(my>(b-t)/2+t){
                                            temp.insertAfter(that);
                                        }
                                        else{
                                            temp.insertBefore(that);
                                        }
                                    }
                                    else {
                                        if(mx>(r-l)/2+l){
                                            temp.insertAfter(that);
                                        }
                                        else{
                                            temp.insertBefore(that);
                                        }
                                    }
                                    return false;
                                }
                            })
                        }
                        $(window).on("blur",function(){
                            upFn();
                            return false;
                        });
                    }
                    // up
                    function upFn(){
                        _this.css('cursor','pointer');
                        temp.css('cursor','pointer');
                        _this.find('.zm-choiceFile-moveShade').remove();
                        doc.off(move).off(up);
                        sortDone=false;
                        if(_this.hasClass('zm-choiceFile-isMove')) {
                            if (whiteShade1 != 0) {
                                _this.append('<div class="zm-choiceFile-whiteShade1 zm-choiceFile-whiteShade"></div>');
                            }else if (whiteShade2 != 0){
                                _this.append('<div class="zm-choiceFile-whiteShade2 zm-choiceFile-whiteShade"></div>');
                            }else if (whiteShade3 != 0){
                                _this.append('<div class="zm-choiceFile-whiteShade3 zm-choiceFile-whiteShade"></div>');
                            }
                            _this.removeClass('zm-choiceFile-isMove');
                        }
                        if(isSort){
                            _this.stop(true, false).animate({"left": temp.offset().left, "top": temp.offset().top}, obj.speed, 'swing',
                                function () {
                                    var objData = {
                                        sortId: sortId,
                                        sortThis:_this,
                                        oldIndex: oldIndex
                                    };
                                    _this.css({'position': 'relative', 'left': 0, 'top': 0, 'z-index': 'auto'});
                                    _this.parent().find('.zm-choiceFile-fileProcessMove').replaceWith(_this);
                                    _this.parent().find().removeClass('zm-choiceFile-fileProcessMove');
                                    obj.callback(objData);
                                    sortDone = true;
                                    isSort = false;
                                });
                        }
                        else{
                            sortDone = true;
                            isSort = false
                        }
                    }
                }
                document.stopClick = true;
            });
        });
    }
})(jQuery);

$(document).on("click",".zm-dialog-close,.zm-dialog-btnCancel",function(){
    var _this =$(this);
    var thisDialog = _this.closest(".zm-dialog-box");
    thisDialog.attr("style","");
    var animate=thisDialog.attr("data-animate");
    switch (animate.substr(0, 17)) {
        case "fade":
            thisDialog.fadeOut(300);
            break;
        case "slide":
            thisDialog.slideUp(300);
            break;
        default:
            thisDialog.removeClass(animate);
            thisDialog.hide();
            break;
    }
    $(".zm-tooltipBox").remove();
    _this.closest(".zm-dialog-bg").fadeOut().remove();
    thisDialog.remove();
});

$(document).on('mousedown',".zm-dialog-close,.zm-dialog-help",function(e){
    e.stopPropagation()
});

$(document).on("mousedown",".zm-movable-header",function(e){
    e.preventDefault()
    var _this = $(this);
    var thisDialog = _this.closest(".zm-movableBox");
    var width=0;
    var height=0;
    if(_this.hasClass('zm-components-detail-header')||thisDialog.hasClass('zm-colorPicker-more')){width=0;height=0;}
    else{width=thisDialog.width() / 2;height=thisDialog.height() / 2}
    var rectLeft = this.getBoundingClientRect().left;
    var rectTop = this.getBoundingClientRect().top;
    var startX = e.clientX;
    var startY = e.clientY;
    $(document).mousemove(function (e) {
        var top = e.clientY - startY + rectTop + height;
        if(top<=height){
            top=height;
        }
        thisDialog.css({
            "left": (e.clientX - startX + rectLeft + width),
            "top": top
        });
    });
    _this.off('mouseup').mouseup(function () {
        $(document).off("mousemove");
        //console.log('mouseup')
    });
});

