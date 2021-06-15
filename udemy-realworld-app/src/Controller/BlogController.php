<?php

namespace App\Controller;

use App\Service\Greeting;
use App\Service\VeryBadDesign;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\Routing\Annotation\Route;

/**
 * AbstractController is one of few other possible extensions (check source).
 *
 * Symfony 4: It's more restrictive than others, e.g. only a few services from container;
 * so it enforces Dependency Injection and not using the service container directly?
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
    // Cannot be used: 'AbstractController' does not allow accessing the service container directly
    // $service = $this->get('app.greeting');
    $name = $request->get('name');

    return $this->render('base.html.twig', [
      'message' => $this->greeting->greet($name)
    ]);
  }
}
