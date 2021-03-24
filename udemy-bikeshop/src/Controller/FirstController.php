<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class FirstController
{
  public function index(): Response
  {
    return new Response(
      '<html><body><h1>FirstController</h1></body></html>'
    );
  }
}

