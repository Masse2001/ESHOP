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
$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST" :
        $user = json_decode( file_get_contents('php://input') );
       
        $sql = "INSERT INTO commande(idcommande, email_client, datecommande)
                VALUES
                (null,:email_client,:datecommande)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':email_client', $user->user);
       
        $stmt->bindParam(':datecommande', $created_at);
        if($stmt->execute()) {
                
            $cart = $user->panier;
            $myjson = json_encode($cart);
            $mypanier=json_decode($myjson,true);
            $idcommande = $conn->lastInsertId();    
            //echo $myjson;
            foreach ($mypanier as $row) 
            {
        
                $code = $row["code"];
                $productname = $row["productname"];
                $quantity = $row["quantity"];
                $quantstock = $row["quantstock"];
                $quantrestant = $quantstock - $quantity;
                $prix = $row["prixU"];
                $montant= $prix * $quantity;

                $sql1 = "INSERT INTO detailscommande(idcommande, code,quantity,productname,montant)
                VALUES
                (:idcommande,:code,:quantity,:productname, :montant)";
                $stmt1 = $conn->prepare($sql1);
        
                $stmt1->bindParam(':idcommande', $idcommande);
            
                $stmt1->bindParam(':code', $code);
                $stmt1->bindParam(':quantity', $quantity);
                $stmt1->bindParam(':productname', $productname);
                $stmt1->bindParam(':montant', $montant);
                $updatequant = "update produit  set QuantiteStock = '$quantrestant' where  code = '$code'";
                
                if($stmt1->execute() &&  $conn -> exec($updatequant)){

                    echo "Commande created successfully";

                }
                else
                {
                    echo 'error';
                }
                
            }        
           

                        

                    } else {
                        echo "Failed to add commande Client";
                    }
                
            
        
        break;

}


?>