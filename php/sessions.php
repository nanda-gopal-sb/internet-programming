<?php
session_start();
$_SESSION["username"] = "JohnDoe";
echo "Session started.";
echo "Hello, " . $_SESSION["username"];
?>
