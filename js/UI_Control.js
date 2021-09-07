//介面自適應縮放
function SetCssScale(){
    //100vh的意思
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    //----調整各介面css----
    //Canvas
    //背景圖片與螢幕尺寸的比例需更新成當下的比例，否則判定置中會錯誤
    var scaleX = (w / BgImageWidth).toFixed(3);
    var scaleY = (h / BgImageHeight).toFixed(3);
    //console.log("背景寬:"+(BgImageWidth * scaleY));
    //console.log("網頁寬:"+w);
    if (BgImageWidth * scaleY -1 > w) { //背景寬大於螢幕寬時，左右滿版，改為上下置中
        var BgScale = BgImageWidth / BgImageHeight; //固定比例下，算出高跟寬的比例(寬算出來，高也可直接取得)
        //console.log("上下置中");
        document.getElementById('CanvasDiv').style.transform = "scale("+scaleX+")";
        document.getElementById('CanvasDiv').style.top = (h - (w / BgScale)) * 0.5 + "px";
        document.getElementById('CanvasDiv').style.left = "0px";
    } else { //背景寬小於螢幕寬時，上下滿版，改為左右置中
        //console.log("左右置中");
        document.getElementById('CanvasDiv').style.transform = "scale("+scaleY+")";
        document.getElementById('CanvasDiv').style.top = "0px";
        document.getElementById('CanvasDiv').style.left = (w - BgImageWidth * scaleY) * 0.5 + "px";
    }
}

//全螢幕
var IsFull = false;
function WindowScreenFull() {
    //判斷當前是否全螢幕狀態
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        //判斷是否支援全螢幕
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        //判斷是否支援退出全螢幕
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

//二態
function hover(element) {
    if(model != 0) return;
    if (element.id == "BackBtn") {
        document.getElementById('BackText').style.display = '';
    }else if (element.id == "TypePageBtn1") {
        document.getElementById('TypeText1').style.display = '';
    }else if(element.id == "TypePageBtn2"){
        document.getElementById('TypeText2').style.display = '';
    }else if(element.id == "TypeBtn1"){
        document.getElementById('TypeBtn1').setAttribute('src', 'art/btn/btn_type1_2.png');
    }else if(element.id == "TypeBtn2"){
        document.getElementById('TypeBtn2').setAttribute('src', 'art/btn/btn_type2_2.png');
    }else if(element.id == "ExitBtn"){
        document.getElementById('ExitBtn').setAttribute('src', 'art/btn/exit_2.png');
    }else if(element.id == "FullBtn"){
        document.getElementById('FullBtn').setAttribute('src', 'art/btn/full_2.png');
    }else if(element.id == "VideoBtn1"){
        document.getElementById('VideoBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video1')[0].getAttribute('path2'));
    }else if(element.id == "VideoBtn2"){
        document.getElementById('VideoBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video2')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn1"){
        document.getElementById('ImgBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img1')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn2"){
        document.getElementById('ImgBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img2')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn3"){
        document.getElementById('ImgBtn3').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img3')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn4"){
        document.getElementById('ImgBtn4').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img4')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn5"){
        document.getElementById('ImgBtn5').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img5')[0].getAttribute('path2'));
    }else if(element.id == "ImgBtn6"){
        document.getElementById('ImgBtn6').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img6')[0].getAttribute('path2'));
    }else if(element.id == "cancelBtnW"){
        document.getElementById('cancelBtnW').setAttribute('src', 'art/btn/cancelBtn2.png');
    }else if(element.id == "exitBtnW"){
        document.getElementById('exitBtnW').setAttribute('src', 'art/btn/exitBtn2.png');
    }
}
function unhover(element) {
    if(model != 0) return;
    if (element.id == "BackBtn") {
        document.getElementById('BackText').style.display = 'none';
    }else if (element.id == "TypePageBtn1") {
        document.getElementById('TypeText1').style.display = 'none';
    }else if(element.id == "TypePageBtn2"){
        document.getElementById('TypeText2').style.display = 'none';
    }else if(element.id == "TypeBtn1"){
        document.getElementById('TypeBtn1').setAttribute('src', 'art/btn/btn_type1_1.png');
    }else if(element.id == "TypeBtn2"){
        document.getElementById('TypeBtn2').setAttribute('src', 'art/btn/btn_type2_1.png');
    }else if(element.id == "ExitBtn"){
        document.getElementById('ExitBtn').setAttribute('src', 'art/btn/exit.png');
    }else if(element.id == "FullBtn"){
        document.getElementById('FullBtn').setAttribute('src', 'art/btn/full.png');
    }else if(element.id == "VideoBtn1"){
        document.getElementById('VideoBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video1')[0].getAttribute('path'));
    }else if(element.id == "VideoBtn2"){
        document.getElementById('VideoBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video2')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn1"){
        document.getElementById('ImgBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img1')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn2"){
        document.getElementById('ImgBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img2')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn3"){
        document.getElementById('ImgBtn3').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img3')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn4"){
        document.getElementById('ImgBtn4').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img4')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn5"){
        document.getElementById('ImgBtn5').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img5')[0].getAttribute('path'));
    }else if(element.id == "ImgBtn6"){
        document.getElementById('ImgBtn6').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img6')[0].getAttribute('path'));
    }else if(element.id == "cancelBtnW"){
        document.getElementById('cancelBtnW').setAttribute('src', 'art/btn/cancelBtn.png');
    }else if(element.id == "exitBtnW"){
        document.getElementById('exitBtnW').setAttribute('src', 'art/btn/exitBtn.png');
    }
}