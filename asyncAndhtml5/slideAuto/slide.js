/*
 * 
 * 
 * 
 * 
 */

function slide(place) {
    var self = this;
    var countPic = 0; //紀錄放幾張圖
    var nowPic = 1; //紀錄目前看到的圖
    var setT = 0; //自動撥放 控制是否自動
    //創建一個區塊
    this.init = function () {
        //整個照片區塊
        var divSlide = document.createElement('div');
        divSlide.setAttribute('id', 'divSlide');
        document.getElementById(place).appendChild(divSlide);
        //左邊換面區塊-----------------------------------------------------
        var divLeftSlide = document.createElement('div');
        divLeftSlide.setAttribute('id', 'divLeftSlide');
        //點 往左換頁
        divLeftSlide.addEventListener('click', function () {
            //先隱藏目前的 再顯示右邊的
            document.getElementById(nowPic).style.visibility = 'hidden';
            if (nowPic == 1) {
                nowPic = countPic;
            } else {
                nowPic--;
            }
            document.getElementById(nowPic).style.visibility = 'visible';
        });
        //滑鼠在上面 不自動換
        divLeftSlide.addEventListener('mouseover', function () {
            clearTimeout(setT);
        });
        //滑鼠離開 開始自動換
        divLeftSlide.addEventListener('mouseout', function () {
            setT = setTimeout(self.autoPlay, 2000);
        });
        document.getElementById(place).appendChild(divLeftSlide);
        //右邊換面區塊-----------------------------------------------------
        var diveRightSlide = document.createElement('div');
        diveRightSlide.setAttribute('id', 'diveRightSlide');
        diveRightSlide.addEventListener('click', function () {
            //先隱藏目前的 再顯示左邊的
            document.getElementById(nowPic).style.visibility = 'hidden';
            if (nowPic == countPic) {
                nowPic = 1;
            } else {
                nowPic++;
            }
            document.getElementById(nowPic).style.visibility = 'visible';
        });
        //滑鼠在上面 不自動換
        diveRightSlide.addEventListener('mouseover', function () {
            clearTimeout(setT);
        });
        //滑鼠離開 開始自動換
        diveRightSlide.addEventListener('mouseout', function () {
            setT = setTimeout(self.autoPlay, 2000);
        });
        document.getElementById(place).appendChild(diveRightSlide);
    };
    //新增圖片
    this.addPicture = function (pic) {
        var src = pic;
        var pic = document.createElement('img');
        pic.setAttribute('id', ++countPic);
        pic.setAttribute('src', src);
        pic.setAttribute("width", "810");
        pic.setAttribute("height", "200");
        pic.style.visibility = 'hidden';
        pic.style.position = 'fixed';
        pic.style.margin = '-200px 0px 0px 280px';
        document.getElementById(place).appendChild(pic);
    };
    //自動撥放
    this.autoPlay = function () {
        if (nowPic == 1) {
            document.getElementById(nowPic).style.visibility = 'visible';
        } else if (nowPic > countPic) {
            document.getElementById(nowPic - 1).style.visibility = 'hidden';
            nowPic = 1;
            document.getElementById(nowPic).style.visibility = 'visible';
        } else {
            document.getElementById(nowPic - 1).style.visibility = 'hidden';
            document.getElementById(nowPic).style.visibility = 'visible';
        }
        nowPic++;
        //每秒換一次
        setT = setTimeout(self.autoPlay, 2000);
    };
    this.init();
}
