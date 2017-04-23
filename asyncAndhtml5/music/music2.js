//播放選擇的音樂
function playMusic(music) {//controls
    //播放選取的檔案
    document.getElementById("musicBar").innerHTML = "<audio autoplay id='audi'><source src='./music/mp3/" + music + ".mp3'></audio>";
    //顯示目前播放的
    var marq = '';
    for (i = 1; i < 10; i++) {
        marq += "＃＃＃＃＃目前播放 : " + music;
    }
    document.getElementById("test").innerHTML = marq + "＃＃＃＃＃";
    //顯示歌詞
    getLyric(music);
    //讓字幕stop
    lyTimeCheck = false;
    lytimes();
    //換歌按鍵變成準備播放狀態
    var player = document.getElementById("player");
    player.style.backgroundImage = "url('./music/icon/pause.png')";
    player.style.background.size = "cover";
    //字幕回到原點
    var ru = document.getElementById('showLyric');
    ru.style.margin = '50px 0px 0px 0px';
}
//載入歌詞
function getLyric(music) {
    ajax.xhrPost('loadLyric.php', {name: music}, function (result) {
        if (!result.success) {
            testLyric(result.results);
        } else {
            document.getElementById("showLyric").innerHTML = "查無歌詞";
        }
    }, function (errorMessage) {
        alert(errorMessage);
    });
}
//分解歌詞&不顯示時間&換行
var lyricArray = new Array;//時間歌詞陣列
var lyricArrayCount = 0;
function testLyric(lyric) {
    lyricArray = new Array;
    var ly = '';
    var rr = '';
    var coun = 0;
    for (var i = 0; i < lyric.length; i++) {
        if (lyric[i] == "[") {
            ly += '<br/>';
            for (var j = i; j < (i + 10); j++) {
                rr += lyric[j];
            }
            lyricArray[coun] = rr;
            coun++;
            rr = '';
            i += 9;
        } else {
            ly += lyric[i];
        }
    }
    document.getElementById("lyricCover").style.background = 'rgba(255,255,255,0.5)';
    document.getElementById('showLyric').innerHTML = ly;
}
//讓歌詞跑
var lyTimeCheck = false;
var realTime = 0;
function lytimes() {
    if (lyTimeCheck == true) {//字幕要跟著走
        //目前播放秒數
        var thisTime = document.getElementById('audi').currentTime;
        var thisSec = thisTime % 60;
        var thisMin = (thisTime - thisSec) / 60;
        thisSec = Math.floor(thisSec);
        thisMin = Math.floor(thisMin);
        //把秒數格式規定為00:00
        var ov = '';
        if (thisSec > 9) {
            ov = thisMin + ":" + thisSec;
        } else {
            ov = thisMin + ":0" + thisSec;
        }
        //找一樣的秒數
        for (var i = 0; i < lyricArray.length; i++) {
            var tea = lyricArray[i];
            realTime = tea.substr(2, 4);
            if (realTime == ov) {
                var sum = 50;
                sum -= 27 * i;
                var ru = document.getElementById('showLyric');
                ru.style.margin = (sum) + 'px 0px 0px 0px';
                break;
            }
        }
        setTimeout("lytimes( )", 100)//毫秒針測一次
    }
}
//載入音樂
function loadMusic() {
    ajax.xhrPost('loadMusic.php', {name: null}, function (result) {
        if (!result.success) {
            //從資料庫找出檔案名稱
            var i = 0;
            while (result[i] != undefined) {
                //宣告需要新增的
                var div = document.getElementById("musicBigList");
                var newDiv = document.createElement('div');
                var content1 = document.createTextNode(i + 1 + '.');
                var content2 = document.createTextNode(result[i]);
                var img = document.createElement('img');
                //設置id等等...
                newDiv.setAttribute('id', 'musicList' + (i + 1));
                newDiv.setAttribute('class', 'musicListB');
                newDiv.setAttribute('onclick', 'playMusic("' + result[i] + '")');
                img.setAttribute('id', 'image' + (i + 1));
                img.setAttribute('class', 'image')
                img.setAttribute('src', './music/jpg/' + result[i] + '.jpg');
                //新增到HTML裡面
                div.appendChild(newDiv);
                newDiv.appendChild(content1);
                newDiv.appendChild(img);
                newDiv.appendChild(content2);
                //i++ 換下一首新增
                i++;
            }
        } else {
            document.getElementById("testt").innerHTML = "查無音樂";
        }
    }, function (errorMessage) {
        alert(errorMessage);
    });
}
//撥放器功能
function player() {
    if (checkMusic() == 1) {
        //播放停止&按鈕名稱改變
        var player = document.getElementById("player");
        var music = document.getElementById("audi");
        if (player.value == 'play') {
            player.value = 'stop';
            music.play();
            player.style.backgroundImage = "url('./music/icon/pause.png')";
            player.style.background.size = "cover";
            //讓字幕跟著跑
            lyTimeCheck = true;
            lytimes();
        } else {
            player.value = 'play';
            music.pause();
            player.style.backgroundImage = "url('./music/icon/play.png')";
            player.style.background.size = "cover";
            //讓字幕stop
            lyTimeCheck = false;
            lytimes();
        }
        //算整首時間
        music_Times();
        //目前播放時間
        countSec();
    }
}
//計算整首歌的時間
var sec = '';
var min = '';
function music_Times() {
    sec = document.getElementById('audi').duration % 60;
    min = (document.getElementById('audi').duration - sec) / 60;
    sec = Math.floor(sec); //無條件捨去取整數
    document.getElementById('me').innerHTML = '/' + min + ':' + sec;
}
//每半秒偵測一次目前撥放秒數
var w = 0;
function countSec() {
    //time 拉bar 每秒更新
    var thisTime = document.getElementById('audi').currentTime;
    document.getElementById('timeRange').value = (thisTime / document.getElementById('audi').duration) * 100;
    //目前播放秒數
    var thisSec = thisTime % 60;
    var thisMin = (thisTime - thisSec) / 60;
    thisSec = Math.floor(thisSec);
    thisMin = Math.floor(thisMin);
    //把秒數格式規定為00:00
    if (thisSec > 9) {
        document.getElementById('me').innerHTML = thisMin + ":" + thisSec + '  /  ' + min + ':' + sec;
    } else {
        document.getElementById('me').innerHTML = thisMin + ":0" + thisSec + '  /  ' + min + ':' + sec;
    }
    setTimeout('countSec()', 500);
}
//靜音
function mut() {
    if (checkMusic() == 1) {
        var mu = document.getElementById('audi');
        var sou = document.getElementById('muted');
        if (mu.muted == false) {
            mu.muted = true;
            console.log('true');
            sou.style.backgroundImage = "url('./music/icon/mute.png')";
            sou.style.background.size = "cover";
        } else {
            mu.muted = false;
            console.log('false');
            sou.style.backgroundImage = "url('./music/icon/volume.png')";
            sou.style.background.size = "cover";
        }
    }
}
//檢測是否有音樂
function checkMusic() {
    if (document.getElementById('test').textContent != '選擇播放的音樂') {
        return 1;
    } else {
        return 0;
    }
}
window.onload = function () {
    document.getElementById("test").innerHTML = "選擇播放的音樂";
    loadMusic();
    //當移動時間軸,會改變音樂時間&時間軸
    document.getElementById('timeRange').addEventListener('change', function () {
        if (checkMusic() == 1) {
            var timeRange = document.getElementById('timeRange').value;
            var allTime = document.getElementById('audi').duration;
            var songTime = Math.floor((timeRange / 100) * allTime);
            document.getElementById('audi').currentTime = songTime;
            timeRange = songTime / 100;
        }
    });
    //改變音量
    document.getElementById('soundRange').addEventListener('change', function () {
        if (checkMusic() == 1) {
            var newSR = document.getElementById('soundRange').value;
            document.getElementById('musicSound').innerHTML = newSR + '%';
            document.getElementById('audi').volume = newSR / 100;
        }
    });

    //額外做的 字幕在中央
    var BoomBtn = document.createElement('button');
    BoomBtn.style.position = 'absolute';
    BoomBtn.style.left = '80%';
    BoomBtn.innerHTML = '字幕彈出';
    document.getElementById('body').appendChild(BoomBtn);
    BoomBtn.addEventListener('click',function(){
       console.log('ni hao'); 
    });

}

