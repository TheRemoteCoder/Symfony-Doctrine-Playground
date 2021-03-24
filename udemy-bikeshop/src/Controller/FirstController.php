<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route; 

class FirstController
{
  /**
   * See 'config/routes.yaml'
   */
  public function index(): Response
  {
    return new Response(
      '<html><body><h1>index</h1></body></html>'
    );
  }

  /**
   * Annotations -MUST- have double ticks, not single ticks.
   *
   * @Route("/first")
   */
  public function first(): Response
  {
    return new Response(
      '<html><body><h1>first</h1></body></html>'
    );
  }
}

