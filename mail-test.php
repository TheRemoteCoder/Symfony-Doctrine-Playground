<?php

@ini_set('display_errors', '1');
@ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$to      = 'info@christianoellers.com';
$subject = 'Test Mail';
$message = 'This is a test email';

echo mail($to, $subject, $message);

