<?php

require_once 'app/config/database.php';

class UserModel
{
    private $conn;

    public $id;
    public $active;
    public $name;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $createDate;
    public $image;
    public $role;

    # External Auth Provider Identifiers
    public $googleId;

    public function __construct()
    {
        $this->conn = Connection::connectDB();
        $this->name = $this->firstName . " " . $this->lastName;
    }

    function create()
    {
        try{
            $query = "INSERT INTO users
                    SET
                        firstName=:firstName,
                        lastName=:lastName,
                        email=:email,
                        role=:role,
                        password=:password,
                        image=:image,
                        googleId=:googleId"
                        ;

            $stmt = $this->conn->prepare($query);

            $this->firstName = htmlspecialchars(strip_tags($this->firstName));
            $this->lastName = htmlspecialchars(strip_tags($this->lastName));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->role = $this->role ? htmlspecialchars(strip_tags($this->role)) : 'student';
            $this->password = htmlspecialchars(strip_tags($this->password));
            $this->image = $this->image ? htmlspecialchars(strip_tags($this->image)) : null;
            $this->googleId = $this->googleId ? htmlspecialchars(strip_tags($this->googleId)) : null;


            $stmt->bindParam(":firstName", $this->firstName);
            $stmt->bindParam(":lastName", $this->lastName);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":role", $this->role);
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $password_hash);
            $stmt->bindParam(":image", $this->image);
            $stmt->bindParam(":googleId", $this->googleId);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }catch(Exception $e){
            echo json_encode(array("message" => $e->getMessage()));
            return false;
        }
    }

    function emailExists()
    {
        try{
            $query = "SELECT *
                        FROM users
                        WHERE email = ?
                        LIMIT 0,1";

            $stmt = $this->conn->prepare($query);
            $this->email = htmlspecialchars(strip_tags($this->email));
            $stmt->bindParam(1, $this->email);
            $stmt->execute();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = intval($row['id']);
                $this->firstName = $row['firstName'];
                $this->lastName = $row['lastName'];
                $this->name = $this->firstName . " " . $this->lastName;
                $this->password = $row['password'];
                $this->image = $row['image'];
                $this->role = $row['role'];
                return true;
            }
            return false;
        }catch(Exception $e){
            return false;
        }
    }

    function validatePassword($password)
    {
        return password_verify($password, $this->password);
    }

    function getOne($id){
        try{
            $query = "SELECT *
            FROM users
            WHERE id = ?
            LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $id);
            $stmt->execute();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = $row['id'];
                $this->active = $row['active'] == 1? true : false;
                $this->firstName = $row['firstName'];
                $this->lastName = $row['lastName'];
                $this->name = $this->firstName . " " . $this->lastName;
                $this->email = $row['email'];
                $this->image = $row['image'];
                $this->role = $row['role'];
                return true;
            }
            return false;
        }catch (Exception $e){
            return false;
        }
    }

    function updateProfile($updateProfileValues) {
        try{
            if (count($updateProfileValues) === 0) {
                return true;
            }
            
            $query = "UPDATE users
                    SET ".implode(", ", $updateProfileValues)."
                    WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":id", $this->id);
            $this->name = $this->firstName . " " . $this->lastName;

            if ($stmt->execute()) {
                $this->getOne($this->id);
                return true;
            }

            return false;
        }catch(Exception $e){
            return false;
        }
    }

    function googleIdUpdate(){
        try{
            $query = "UPDATE users
                        SET
                            googleId = :googleId
                        WHERE
                            id = :id AND googleId != :googleId";
            $stmt = $this->conn->prepare($query);
            
            $this->googleId = htmlspecialchars(strip_tags($this->googleId));
            $stmt->bindParam(":googleId", $this->googleId);
            $stmt->bindParam(":id", $this->id);

            if ($stmt->execute()) {
                return true;
            }
            return false;
        }catch(Exception $e){
            error_log($e->getMessage());
            return false;
        }
    }

    function updatePassword($password){
        try{
            $query = "UPDATE users
                        SET
                            password = :password
                        WHERE
                            id = :id";
            $stmt = $this->conn->prepare($query);
            
            $password_hash = password_hash($password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $password_hash);
            $stmt->bindParam(":id", $this->id);

            if ($stmt->execute()) {
                return true;
            }
            return false;
        }catch(Exception $e){
            error_log($e->getMessage());
            return false;
        }
    }

    function getMany()
    {
        try{
            $query = "SELECT *
                        FROM users
                        ORDER BY id DESC";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $users_arr = array();
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $user_item = array(
                        "id" => $row['id'],
                        "active" => $row['active'] == 1? true : false,
                        "name" => $row['firstName'] . " " . $row['lastName'],
                        "firstName" => $row['firstName'],
                        "lastName" => $row['lastName'],
                        "email" => $row['email'],
                        "image" => $row['image'],
                        "role" => $row['role'],
                        "createDate" => $row['createDate']
                    );
                    array_push($users_arr, $user_item);
                }
                return $users_arr;
            }
            return false;
        }catch(Exception $e){
            return false;
        }
    }

    function deleteOne()
    {
        try{
            $query = "DELETE FROM users WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $this->id);
            if ($stmt->execute()) {
                return true;
            }
            return false;
        }catch(Exception $e){
            echo json_encode(array("message" => $e->getMessage()));
            return false;
        }
    }
}
