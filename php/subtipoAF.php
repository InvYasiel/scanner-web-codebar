<?php
//---------------------------------Consulta Agenda---------------------------------  
$results = '';
$results2 = '';
$results3 = '';
$results4 = '';
$results5 = '';
$pdo = new PDO("sqlsrv:Server=172.26.11.13,49188;Database=InventarioAF", "sa", "Monte01!");
$statement = $pdo->prepare("SELECT * FROM [dbo].[SUBTIPOACTIVOFIJO]");
$statement->execute();
if (!$statement) {

} else {
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
$statement2 = $pdo->prepare("SELECT * FROM [dbo].[MARCA]");
$statement2->execute();
if (!$statement2) {

} else {
    $results2 = $statement2->fetchAll(PDO::FETCH_ASSOC);
    }
$statement3 = $pdo->prepare("SELECT * FROM [dbo].[MODELO]");
$statement3->execute();
if (!$statement3) {

} else {
    $results3 = $statement3->fetchAll(PDO::FETCH_ASSOC);
    }
$statement4 = $pdo->prepare("SELECT * FROM [dbo].[SISTEMAOPERATIVO]");
$statement4->execute();
if (!$statement4) {

} else {
    $results4 = $statement4->fetchAll(PDO::FETCH_ASSOC);
    }
$statement5 = $pdo->prepare("SELECT * FROM [dbo].[DISCO]");
$statement5->execute();
if (!$statement5) {

} else {
    $results5 = $statement5->fetchAll(PDO::FETCH_ASSOC);
    $resultado =array_merge($results,$results2,$results3,$results4,$results5);
    echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
    }
?>