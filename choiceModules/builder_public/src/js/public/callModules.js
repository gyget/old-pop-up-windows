/**
 * Created by gengliangxiang on 2017/10/11.
 */
var choicePopUp = {
    choicePopUp:function (args) {
        $('#callModules').before('<script id= "modules" src="../js/public/choicePopUp'+ args.modules +'.js"></script>');
        switch (args.modules){
            case 'album':
                choicePopUpAlbum.choiceAlbumPopUp(args);
                break;
            case 'blogger':
                choicePopUpBlogger.choiceBloggerPopUp(args);
                break;
            case 'file':
                choicePopUpFile.choiceFilePopUp(args);
                break;
            case 'goods':
                choicePopUpProduct.choiceProductPopUp(args);
                break;
            case 'news':
                choicePopUpNews.choiceNewsPopUp(args);
                break;
            case 'picture':
                choicePopUpPicture.choicePicturePopUp(args);
                break;
            case 'radio':
                choicePopUpRadio.choiceRadioPopUp(args);
                break;
            case 'service':
                choicePopUpService.choiceServicePopUp(args);
                break;
            case 'video':
                choicePopUpVideo.choiceVideoPopUp(args);
                break;
            case 'composer':
                choicePopUpComposer.choiceComposerPopUp(args);
                break;
            default:
                window.parent.document.getElementById("choiceModules").remove();
                return
        }
    }
};