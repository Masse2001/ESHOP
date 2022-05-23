<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$connection = mysqli_connect('localhost', 'root', '','eshop');

//var_dump($conn); dans le preload
//print_r(file_get_contents('php://input')) pour le voir dans le preview
/**where commande.idcommande=detailscommande.idcommande and client.email_client=commande.email_client and produit.code=detailscommande.code and client.email_client='gueyebachir98@gmail.com' */
$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT produit.productname,produit.url_produit, detailscommande.quantity,detailscommande.montant, datecommande FROM produit,client,commande, detailscommande  ";
        $path = explode('/', $_SERVER['REQUEST_URI']);//pour edit recup id
        
        if(isset($path[3]) && is_string($path[3])) 
        {
            $sql .= " WHERE commande.idcommande=detailscommande.idcommande 
                         and client.email_client=commande.email_client
                         and produit.code=detailscommande.code and
                         client.email_client = :email_client ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email_client', $path[3]);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 

        else 
        {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);  
        }
        echo json_encode($users);
        $json = json_encode($users);
        break;
  

}


?>
