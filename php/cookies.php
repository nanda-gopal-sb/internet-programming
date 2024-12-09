<?php
    setcookie("username", "John", time() + (86400 * 30), "/");
    echo $_COOKIE["username"];
    setcookie("username", "", time() - 3600, "/");

?>