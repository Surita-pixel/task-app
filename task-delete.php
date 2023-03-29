<?php

    include("database.php");

    if (isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "DELETE FROM TASK WHERE ID = $id";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Failes');
        }
        echo 'Task Deleted successfully';
    }
    


?>