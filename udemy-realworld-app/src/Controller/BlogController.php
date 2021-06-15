<?php

namespace App\Controller;

use App\Service\Greeting;
use App\Service\VeryBadDesign;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\Routing\Annotation\Route;

/**
 * AbstractController is one of few other possible extensions (check source)
 */
class BlogController extends AbstractController
{
  public function __construct(Greeting $greeting, VeryBadDesign $veryBadDesign)
  {
    $this->greeting = $greeting;
    $this->veryBadDesign = $veryBadDesign;
  }

  /**
   * @Route("/", name="blog_index", stateless=true)
   */
  public function index(HttpFoundationRequest $request)
  {
    $name = $request->get('name');

    return $this->render('base.html.twig', [
      'message' => $this->greeting->greet($name)
    ]);
  }
}
