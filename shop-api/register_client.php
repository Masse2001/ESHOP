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
        $sql = "INSERT INTO client(email_client, mdp, nom, prenom, adresse, age, sexe, tel, conf,date_creation)
                VALUES
                (:email_client, :mdp, :nom, :prenom, :adresse, :age, :sexe, :tel, :conf,:date_creation)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $conf = 1;
        $stmt->bindParam(':email_client', $user->email_client);
        $stmt->bindParam(':mdp', $user->mdp);
        $stmt->bindParam(':nom', $user->nom);
        $stmt->bindParam(':prenom',$user->prenom);
        $stmt->bindParam(':adresse', $user->adresse);
        $stmt->bindParam(':age', $user->age);
        $stmt->bindParam(':sexe', $user->sexe);
        $stmt->bindParam(':tel', $user->tel);
        $stmt->bindParam(':conf', $conf);
        $stmt->bindParam(':date_creation', $created_at);
        $query = "SELECT * FROM client where email_client = '$user->email_client'";
        
        // Execute the query and store the result set
        $result = mysqli_query($connection, $query);
        $row =0;
        if ($result)
        {
            // it return number of rows in the table.
            $row = mysqli_num_rows($result);

            if($row == 1)
            {
                echo "ce mail existe déjà";
            }
            else
            {
                    if($stmt->execute()) {
                    
                        
                        echo "Account Client created successfully";
                        

                    } else {
                        echo "Failed to create account Client";
                    }
            }       
            
        }
       // echo json_encode($response);
        break;

}


?>