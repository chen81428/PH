//序列圖位置
var urlRoot = 'art/cover/';
//要播放的編號範圍
var indexRange = [1, 60];
//要播放的圖片總數
var maxLength = indexRange[1] - indexRange[0] + 1;
//放置封面圖的位置
var eleContainer;
//載入條
var eleLoading;
// 儲存加載的DOM和數量
var store = {
    length: 0
};
// 圖片序列圖加載
function loadCover(){
    eleContainer = document.getElementById('CoverPage');
    eleLoading = document.getElementById('loading');
    for ( var start = indexRange[0]; start <= indexRange[1]; start++) {
        (function (index) {
            var img = new Image();
            img.onload = function () {
                store.length++;
                // 存放載好的圖
                store[index] = this;
                loadingUpate();
            };
            img.onerror = function () {
                store.length++;
                loadingUpate();
            };
            img.src = urlRoot + index + '.png';
        })(start);
    }
}

function loadingUpate() {
    // loading進度
    var percent = Math.round(100 * store.length / maxLength);
    eleLoading.setAttribute('data-percent', percent);
    eleLoading.style.backgroundSize = percent + '% 100%';
    // 全部加載完畢，開始播放
    if (percent == 100) {
        var index = indexRange[0];
        eleContainer.innerHTML = ''; //清除loading文字

        // 一次加入一張圖，並刪除上一張圖(播放動畫在此)
        var step = function () {
            if (store[index - 1]) {
                eleContainer.removeChild(store[index - 1]);
            }
            eleContainer.appendChild(store[index]);
            // 序列增加
            index++;
            // 如果圖片播放完畢，就呼叫跳選到主頁
            if (index <= indexRange[1]) {
                setTimeout(step, 42);
            } else {
                GoHomePage();
            }
        };

        //載入完畢後開始播放
        setTimeout(step, 100);
    }
};