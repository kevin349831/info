<?php

$results = array(
    'success' => true,
    'results' => null
);

try {
    $name = $_POST['name'];
    $user = 's1103137222';
    $pass = 'haoyu';
    $dbh = new PDO('mysql:host=db.mis.kuas.edu.tw;dbname=s1103137222', $user, $pass);
    $dbh-> exec("SET CHARACTER SET utf8");//讓查出來的資料編碼是UTF-8
    $stmt = $dbh->prepare("SELECT * FROM music  where music_name = '$name'");
    if ($stmt->execute(array($name))) {
        while ($row = $stmt->fetch()) {
            $results['success'] = false;
            $results['results'] = $row[2];
            break;
        }
    }
    $dbh = null;
} catch (PDOException $e) {
    $results['success'] = false;
    $results['results'] = $e->getMessage();
}
//暫停一秒再回傳
sleep(1);
echo json_encode($results);
