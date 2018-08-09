<?php
session_start();

function logado(){
	if($_SESSION['logado']!="logado"){
		header('Location: login.php');
		
	}
}
?>