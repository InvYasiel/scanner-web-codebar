<?php
$Activofijo = $_POST['Activofijo'];
$selSubtipoAf = $_POST['selSubtipoAf'];
$selMarca = $_POST['selMarca'];
$selModelo = $_POST['selModelo'];
$selSO = $_POST['selSO'];
$selDisco1 = $_POST['selDisco1'];
$selDisco2 = $_POST['selDisco2'];
$selDescripcion = $_POST['selDescripcion'];
$selMemoria = $_POST['selMemoria'];
$selNumserie = $_POST['selNumserie'];

$pdo = new PDO("sqlsrv:Server=172.26.11.13,49188;Database=InventarioAF", "sa", "Monte01!");
$statement = $pdo->prepare("UPDATE [dbo].[ACTIVOFIJO]
SET [SUBTIPOAF] = '$selSubtipoAf',
[MARCA] = '$selMarca',
[MODELO] = '$selModelo',
[SISTEMAOPERATIVO] = '$selSO',
[DISCO1] ='$selDisco1',
[DISCO2] ='$selDisco2',
[DESCRIPCION] ='$selDescripcion',
[MEMORIA] ='$selMemoria',
[NUMSERIE] ='$selNumserie'
WHERE [ACTIVOFIJO] = $Activofijo");
$statement->execute();
if (!$statement) {
 $arr = $statement->errorInfo();
    print_r($arr);
} else {
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $arr = $statement->errorInfo();
    print_r($arr);
}
?>