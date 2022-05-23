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
        $sql = "INSERT INTO produit(code, productname, description, QuantiteStock, prixU, email_fournisseur, categoryid, url_produit)
                VALUES
                (null, :productname, :description, :QuantiteStock, :prixU, :email_fournisseur, :categoryid, :url_produit)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productname', $user->productname);
        $stmt->bindParam(':description', $user->description);
        $stmt->bindParam(':QuantiteStock', $user->QuantiteStock);
        $stmt->bindParam(':prixU',$user->prixU);
        $stmt->bindParam(':email_fournisseur', $user->email_fournisseur);
        $stmt->bindParam(':categoryid', $user->categoryid);
        $stmt->bindParam(':url_produit', $user->url_produit);
        $query = "SELECT * FROM produit where email_fournisseur = '$user->email_fournisseur' and productname = '$user->productname' ";
        
        // Execute the query and store the result set
        $result = mysqli_query($connection, $query);
        $row =0;
        if ($result)
        {
            // it return number of rows in the table.
            $row = mysqli_num_rows($result);

            if($row == 1)
            {
                echo "produit existant";
            }
            else
            {
                    
                    if($stmt->execute()) {
                                
                                    
                        echo "Product add successfully";
                                    
            
                    } 
                    else {
                        echo "Failed to add Product";
                    }
                                
            }       
            
        }
            
        
       // echo json_encode($response);
        break;
    
    case "GET":
        $sql = "SELECT * FROM produit WHERE email_fournisseur = '$user->email_fournisseur' ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
           
        echo json_encode($users);
        $json = json_encode($users);
        break;
     
    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE produit SET productname=:productname, description=:description, QuantiteStock=:QuantiteStock, prixU=:prixU, email_fournisseur=:email_fournisseur, categoryid=:categoryid, url_produit=:url_produit WHERE code = :code";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':code', $user->code);
        $stmt->bindParam(':productname', $user->productname);
        $stmt->bindParam(':description', $user->description);
        $stmt->bindParam(':QuantiteStock', $user->QuantiteStock);
        $stmt->bindParam(':prixU',$user->prixU);
        $stmt->bindParam(':email_fournisseur', $user->email_fournisseur);
        $stmt->bindParam(':categoryid', $user->categoryid);
        $stmt->bindParam(':url_produit', $user->url_produit);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;    
       
    case "DELETE":
        $sql = "DELETE FROM produit WHERE code = :code";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':code', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;

}


?>