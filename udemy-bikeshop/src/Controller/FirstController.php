<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route; 

class FirstController
{
  /**
   * Annotations -MUST- have double ticks, not single ticks.
   *
   * @Route("/first")
   */
  public function first(): Response
  {
    return new Response(
      '<html><body><h1>FirstController</h1></body></html>'
    );
  }
}

