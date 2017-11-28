var dataDispose = {
    dataDispose:function(obj){
        if(!obj){
            window.parent.document.getElementById("choiceModules").remove();
            return
        }
        var data = {
            multiple: (typeof obj.multiple === "string") ? ((obj.multiple === 'true') ? 1 : 0) : obj.multiple,
            modules: obj.modules,
            mData: obj.mData || 1,
            sortBy: obj.sortBy || 'fBlogCode',
            descOrAsc: obj.descOrAsc || 'descOrAsc',
            fNewsType: obj.fNewsType || -1,
            callback: obj.callBack || function (data) {
                console.log(data);
            }
        };
        $('#dataDispose').before('<script id="callModules" src="../js/public/callModules.js"></script>');
        choicePopUp.choicePopUp(data);
    }
};
(function(){
    var fileModulesArguments = window.localStorage.getItem('choiceModulesDataValue');
    window.localStorage.removeItem('choiceModulesDataValue');
    dataDispose.dataDispose(JSON.parse(fileModulesArguments));
}());
