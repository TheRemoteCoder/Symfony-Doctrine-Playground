<?php

require 'vendor/autoload.php';

@ini_set('display_errors', '1');
@ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

use \Mailjet\Resources;

$mj = new \Mailjet\Client('4d60de8fe755d0e2015237d0d2a5f570','c5a017e6fcead91d9ea6af32036d5b6d',true,['version' => 'v3.1']);

$body = [
  'Messages' => [
    [
      'From' => [
        'Email' => "info@christianoellers.com",
        'Name' => "Christian"
      ],
      'To' => [
        [
          'Email' => "info@christianoellers.com",
          'Name' => "Christian"
        ]
      ],
      'Subject' => "Greetings from Mailjet.",
      'TextPart' => "My first Mailjet email",
      'HTMLPart' => "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      'CustomID' => "AppGettingStartedTest"
    ]
  ]
];

$response = $mj->post(Resources::$Email, ['body' => $body]);
$response->success() && var_dump($response->getData());


/* * /

// Via Postfix SMTP?
$to      = 'info@christianoellers.com';
$subject = 'Test mail';
$message = 'Test mail';

echo mail($to, $subject, $message);

/* */
