<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'theater_booking';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>