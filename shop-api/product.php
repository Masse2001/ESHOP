<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
//var_dump($conn); dans le preload
//print_r(file_get_contents('php://input')) pour le voir dans le preview
//$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM produit";
        $path = explode('/', $_SERVER['REQUEST_URI']);//pour edit recup id
        
        if(isset($path[3]) && is_numeric($path[3])) 
        {
            $sql .= " WHERE code = :code ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':code', $path[3]);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 

        else 
        {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);  
        }//edit

        echo json_encode($users);
        $json = json_encode($users);
        break;
 
         

}


?>