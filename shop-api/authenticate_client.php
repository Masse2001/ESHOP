<?php
include 'DbConnect.php';
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$objDb = new DbConnect;
$conn = $objDb->connect();



$data = json_decode(file_get_contents("php://input"));

$myemail = $data->identifier;
$mypassword= $data->password;

$table_name = 'client';

$query = "SELECT email_client, mdp, nom, prenom, adresse, age, sexe, tel,date_creation FROM " . $table_name . " WHERE email_client = ?  and mdp = ? LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(1, $myemail);
$stmt->bindParam(2, $mypassword);
$stmt->execute();
$num = $stmt->rowCount();


if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $emailf = $row['email_client'];
    $mdp2 = $row['mdp'];
    $nom = $row['nom'];
    $prenom = $row['prenom'];
    $adresse = $row['adresse'];
    $age = $row['age'];
    $tel = $row['tel'];
    $date_creation = $row['date_creation'];
  
    if( ($mypassword == $mdp2) && ($myemail == $emailf))
    {
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 60; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "email_client" => $myemail,
                "nom" => $nom,
                "prenom" => $prenom
        ));

        http_response_code(200);
        $alg= 'HS256';

        $jwt = JWT::encode($token, $secret_key,$alg,null,null);
        
        echo json_encode(
            array(
                "message" => "Successful login client .",
                "jwt" => $jwt,
               
                "ist" => $notbefore_claim,
                "expireAt" => $expire_claim,
                "user" => array(

                    "email_client" => $myemail,
                    "nom" => $nom,
                    "prenom" => $prenom,
                    "adresse" => $adresse,
                    "age" => $age,
                     "tel" => $tel,
                    "date_creation" => $date_creation

                )
                    
                
            ));

              
            }
    else{

        http_response_code(401);
        echo json_encode(array("message" => "Login client failed.", "mdp" => $mypassword , "count"=>$num, "nom : "=> $emailf));
    }
}
else
{
    echo "error";
}

?>