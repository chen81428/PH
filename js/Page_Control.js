var ResoureXmlDoc; //下載後的xml

var AllPronXml; //例字區塊
var AllRemindXml; //叮嚀區塊

var NowItemXml; //當前播放的項目


var IsPlay = false; //是否正在播放
var IsRepeat = false; //是否重複播放

//記錄當下路徑
var VideoPath; //影片路徑
var ImgPath; //圖卡路徑

//載入XML
function LoadXML() {
    var parser = new DOMParser();
    ResoureXmlDoc = parser.parseFromString(ResoureXmlString, "text/xml");
    InitPage();
}

//初始化頁面
function InitPage() {
    //取得全部的單字及例句
    AllPronXml = ResoureXmlDoc.getElementsByTagName('Pron')[0];
    AllRemindXml = ResoureXmlDoc.getElementsByTagName('Remind')[0];
    console.log(AllPronXml);
    console.log(AllRemindXml);
    //預先load完圖片，之後載入直接用暫存紀錄讀取，加快速度
    /*
    for(var i = 0; i < AllWordsXml.getElementsByTagName('Item').length ;i++){
        var newimg = document.createElement("IMG");
        var path = resourcePath+AllWordsXml.getElementsByTagName('Item')[i].getElementsByTagName('img')[0].getAttribute('path');
        console.log("預載圖片:"+path);
        newimg.setAttribute('src', path);
    }*/
    //設置發音叮嚀連結
    document.getElementsByClassName('RemindBtn')[0].setAttribute('src', resourcePath+AllRemindXml.getElementsByTagName('Item')[0].getElementsByTagName('wordimg')[0].getAttribute('path'));
    document.getElementsByClassName('RemindBtn')[1].setAttribute('src', resourcePath+AllRemindXml.getElementsByTagName('Item')[1].getElementsByTagName('wordimg')[0].getAttribute('path'));
    document.getElementsByClassName('RemindBtn')[2].setAttribute('src', resourcePath+AllRemindXml.getElementsByTagName('Item')[2].getElementsByTagName('wordimg')[0].getAttribute('path'));
    document.getElementsByClassName('RemindBtn')[3].setAttribute('src', resourcePath+AllRemindXml.getElementsByTagName('Item')[3].getElementsByTagName('wordimg')[0].getAttribute('path'));
    document.getElementsByClassName('RemindBtn')[4].setAttribute('src', resourcePath+AllRemindXml.getElementsByTagName('Item')[4].getElementsByTagName('wordimg')[0].getAttribute('path'));
}

//開啟網頁
function OpenWeb(Index){
    window.open(AllRemindXml.getElementsByTagName('Item')[Index].getElementsByTagName('Url')[0].getAttribute('path'));
}

//跳轉到主頁
function GoHomePage(){
    HomePage.style.display = '';
}

//切換頁面 (開啟的頁面名稱，開啟的單字編號)
function GoToPage(PageName,WordIndex){
    if(PageName == "TypePage1"){
        BackBtn.style.display = 'none';
        HomePage.style.display = 'none';
        TypePage1_1.style.display = 'none';
        TypePage1.style.display = '';
        TypePageBtn1.style.display = 'none';
        TypePage2.style.display = 'none';
        TypePageBtn2.style.display = '';
        NowPage = 1;
    }else if(PageName == "TypePage2"){
        BackBtn.style.display = 'none';
        HomePage.style.display = 'none';
        TypePage1_1.style.display = 'none';
        TypePage1.style.display = 'none';
        TypePageBtn1.style.display = '';
        TypePage2.style.display = '';
        TypePageBtn2.style.display = 'none';
        NowPage = 1;
    }else if(PageName == "TypePage1_1"){
        //if(WordIndex > 1)return;  //測試版先鎖住A以外的
        BackBtn.style.display = '';
        BackBtn.style.right = '470px';
        BackText.style.right = '500px';
        HomePage.style.display = 'none';
        TypePage1_1.style.display = '';
        TypePage1.style.display = 'none';
        TypePageBtn1.style.display = 'none';
        TypePage2.style.display = 'none';
        TypePageBtn2.style.display = '';
        MainPage.style.display = 'none';
        NowPage = 2;
        //設定載入的字母
        NowIndex = WordIndex;
        //按鈕切換圖
        SetWordPage();
    }else if(PageName == "MainPage"){ //播放頁播放頁
        BackBtn.style.display = '';
        BackBtn.style.right = '325px';
        BackText.style.right = '340px';
        TypePage1_1.style.display = 'none';
        TypePage1.style.display = 'none';
        TypePageBtn1.style.display = 'none';
        TypePage2.style.display = 'none';
        TypePageBtn2.style.display = 'none';
        MainPage.style.display = '';

        NowPage = 3;
        //載入影片
        SetVideoPage(WordIndex);
    }
}

//返回上一頁
function BackToPage(){
    if(NowPage == 2){
        GoToPage("TypePage1",0);
    }else if(NowPage == 3){
        $('#PlayerVideo').get(0).pause();
        GoToPage("TypePage1_1",NowIndex);
    }
}
//打開離開頁面
function OpenExitPage(){
    ExitWindow.style.display = '';
}
//關閉離開頁面
function CloseExitPage(){
    ExitWindow.style.display = 'none';
}
//關閉頁面
function exitPage(){
    window.close();
}

//載入該字母的圖片
function SetWordPage(){
    NowItemXml = AllPronXml.getElementsByTagName('Item')[NowIndex-1];
    //字母圖
    document.getElementById('TitleImg').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('titleImg')[0].getAttribute('path'));
    //字母讀音影片按鈕
    document.getElementById('VideoBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video1')[0].getAttribute('path'));
    //字母發音影片按鈕
    document.getElementById('VideoBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('video2')[0].getAttribute('path'));
    //字母圖片按鈕
    document.getElementById('ImgBtn1').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img1')[0].getAttribute('path'));
    document.getElementById('ImgBtn2').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img2')[0].getAttribute('path'));
    document.getElementById('ImgBtn3').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img3')[0].getAttribute('path'));
    document.getElementById('ImgBtn4').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img4')[0].getAttribute('path'));
    document.getElementById('ImgBtn5').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img5')[0].getAttribute('path'));
    document.getElementById('ImgBtn6').setAttribute('src', resourcePath+NowItemXml.getElementsByTagName('img6')[0].getAttribute('path'));
    console.log("載入字母:"+NowItemXml.getAttribute('name'));
}
//載入該字母的圖片
function SetVideoPage(VideoIndex){
    if(VideoIndex == 1){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('video1')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 2){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('video2')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 3){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img1')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 4){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img2')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 5){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img3')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 6){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img4')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 7){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img5')[0].getAttribute('videoUrl');
    }else if(VideoIndex == 8){
        VideoPath = resourcePath+NowItemXml.getElementsByTagName('img6')[0].getAttribute('videoUrl');
    }
    //載入影片
    document.getElementById('PlayerVideo').setAttribute('src', VideoPath);
    PlayBtn.setAttribute('src',"art/btn/playBtn.png");
    RepeatBtn.setAttribute('src',"art/btn/repeatBtn1.png");
    IsPlay = false;
    IsRepeat = false;
    document.getElementById("PlayerVideo").loop = false;
    PlayVideo();
}

//播放單字音檔
function PlayVideo(){
    if(IsPlay){
        $('#PlayerVideo').get(0).pause();
        PlayBtn.setAttribute('src',"art/btn/playBtn.png");
    }else{
        $('#PlayerVideo').get(0).play();
        PlayBtn.setAttribute('src',"art/btn/pauseBtn.png");
    }
    IsPlay = !IsPlay;
}
//播放例句音檔
function SetRepeat(){
    if(IsRepeat){
        document.getElementById("PlayerVideo").loop = false;
        RepeatBtn.setAttribute('src',"art/btn/repeatBtn1.png");
    }else{
        document.getElementById("PlayerVideo").loop = true;
        RepeatBtn.setAttribute('src',"art/btn/repeatBtn2.png");
    }
    IsRepeat = !IsRepeat;
}
//影片結束
function VideoEnd(){
    console.log("播放結束:"+IsRepeat);
    if(!IsRepeat){
        PlayBtn.setAttribute('src',"art/btn/playBtn.png");
        IsPlay = false;
    }
}
