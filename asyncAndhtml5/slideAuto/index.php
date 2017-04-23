<!DOCTYPE html>

<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="../openWindow/ajax.js"></script>
        
        <script type="text/javascript" src="slide.js"></script>
        <link rel="stylesheet" type="text/css" href="slide.css">

        <script type="text/javascript" src="../openWindow/open.js"></script>
        <link rel="stylesheet" type="text/css" href="../openWindow/open.css">
        
        <script>
            window.addEventListener("load", function () {
                var slide1 = new slide('dd');
                slide1.addPicture('./pic/1.jpg');
                slide1.addPicture('./pic/2.jpg');
                slide1.addPicture('./pic/3.jpg');
                slide1.autoPlay();

                var open1 = new open('myBtn', 800, 100, 300, 300, '../openWindow/Qarticle.php', '測試', 'button', 'skyblue');
                var open2 = new open('myBtn2', 800, 100, 410, 300, '../openWindow/Qarticle.php', '你好', 'button', 'cornflowerblue');
                var open3 = new open('myBtn2', 800, 100, 520, 300, '../openWindow/Qarticle.php', '標題標題標題標題', 'button', 'skyblue');
                var open4 = new open('myBtn2', 800, 100, 630, 300, '../openWindow/Qarticle.php', '測試1', 'button', 'cornflowerblue');
                var open5 = new open('myBtn2', 800, 100, 740, 300, '../openWindow/Qarticle.php', '測試2', 'button', 'skyblue');

            });
        </script>
    </head>
    <body id="body" style="background: burlywood">
        <div id="dd" style="position: fixed; left:50px"></div>
    </body>
</html>
