<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route; 

class WelcomeController extends AbstractController
{
  /**
   * Annotations -MUST- have double ticks, not single ticks.
   *
   * @Route("/welcome")
   */
  public function thisNameDoesNotMatterForRouting(): Response
  {
    $this->render('welcome.html.twig');
  }
}

