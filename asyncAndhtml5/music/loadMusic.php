<?php

$results = array(
    'success' => true,
    'results' => null
);
$singer = array();

try {
    $user = 's1103137222';
    $pass = 'haoyu';
    $dbh = new PDO('mysql:host=db.mis.kuas.edu.tw;dbname=s1103137222', $user, $pass);
    $dbh-> exec("SET CHARACTER SET utf8");//讓查出來的資料編碼是UTF-8
    $stmt = $dbh->prepare("SELECT * FROM music");
    if ($stmt->execute()) {
        while ($row = $stmt->fetch()) {
            $results['success'] = false;
            $results['results'] = $row[3];
            $results[] = $row[3];
        }
    }
    $dbh = null;
} catch (PDOException $e) {
    $results['success'] = false;
    $results['results'] = $e->getMessage();
}
echo json_encode($results);
