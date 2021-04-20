<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FirstController extends AbstractController
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
   * @Route("/first/{name}")
   */
  public function first(string $name): Response
  {
    return $this->json([
      'name' => $name,
    ]);
  }
}

