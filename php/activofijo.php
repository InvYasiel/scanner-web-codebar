<?php
//---------------------------------Consulta Agenda---------------------------------   
$data = $_GET['datos'];

$pdo = new PDO("sqlsrv:Server=172.26.11.13,49188;Database=InventarioAF", "sa", "Monte01!");
$statement = $pdo->prepare("SELECT * ,
[ACTIVOFIJO].[DESCRIPCION]  as DESCRIPCIONS,
[SOCIEDADES].[NOMBRE] as NOMBRESOCIEDAD, 
[DEPARTAMENTO].[NOMBRE] as NOMBREDEPARTAMENTO,
[TIPOACTIVOFIJO].[NOMBRE] as NOMBRETIPOAF
FROM [dbo].[ACTIVOFIJO] 
INNER JOIN [SOCIEDADES] ON [ACTIVOFIJO].[SOCIEDAD] = [SOCIEDADES].[VALOR]
INNER JOIN [DEPARTAMENTO] ON [ACTIVOFIJO].[DEPARTAMENTO] = [DEPARTAMENTO].[LETRA]
INNER JOIN [TIPOACTIVOFIJO] ON [ACTIVOFIJO].[TIPOAF] = [TIPOACTIVOFIJO].[TIPOAF]
WHERE [ACTIVOFIJO] = $data");
$statement->execute();
if (!$statement) {

} else {
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($results)) {
        $statement = $pdo->prepare("SELECT [ACTIVOFIJO] as ID, 
        [SOCIEDAD] as VALORSOCIEDAD, 
        [DEPARTAMENTO] as VALORDEPARTAMENTO,
        [EJERCICIO] as ANIO,
        [TIPOAF] as TIPO,
        [SOCIEDADES].[NOMBRE] as NOMBRESOCIEDAD, 
        [DEPARTAMENTO].[NOMBRE] as NOMBREDEPARTAMENTO
        FROM [ACTIVOFIJOSINASIGNAR]
        INNER JOIN [SOCIEDADES] ON [ACTIVOFIJOSINASIGNAR].[SOCIEDAD] = [SOCIEDADES].[VALOR]
        INNER JOIN [DEPARTAMENTO] ON [ACTIVOFIJOSINASIGNAR].[DEPARTAMENTO] = [DEPARTAMENTO].[LETRA]
        WHERE [ACTIVOFIJO] = $data");
        $statement->execute();
        if (!$statement) {
            echo 'Error al ejecutar la consulta';
        } else {
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            if (empty($results)) {
                echo 'ETIQUETA NO EXISTENTE';

            } else {
                
                $statement = $pdo->prepare("INSERT INTO ACTIVOFIJO ([ACTIVOFIJO], [SOCIEDAD], [DEPARTAMENTO], [EJERCICIO], [TIPOAF])
                VALUES ('" . $results[0]['ID'] . "','" . $results[0]['VALORSOCIEDAD'] . "','" . $results[0]['VALORDEPARTAMENTO'] . "','" . $results[0]['ANIO'] . "','" . $results[0]['TIPO'] . "')");
                 $statement->execute();
                 if (!$statement) {
                    echo 'Error al ejecutar la consulta';
                } else {
                    $arr = $statement->errorInfo();
                    print_r($arr);
                }
                    print_r($results[0]);
                //  echo json_encode($results, JSON_UNESCAPED_UNICODE);
               //   echo $results[0]['ID'];
            }
        }

    } else {
        
        echo json_encode($results, JSON_UNESCAPED_UNICODE);
    }
}
?>