<?php
session_start();

if (isset($_POST['submit'])) {
	$username = $_POST['username'];
	$password = $_POST['password'];

	// You should validate the user input here to prevent SQL injection and other attacks

	// Here, you would typically query your database to check if the username and password are correct
	// For this example, we will assume that the correct username is "admin" and the password is "password"

	if ($username == 'admin' && $password == 'password') {
		$_SESSION['username'] = $username;
		header('Location: dashboard.php');
		exit();
	} else {
		echo "Incorrect username or password";
	}
}
?>
