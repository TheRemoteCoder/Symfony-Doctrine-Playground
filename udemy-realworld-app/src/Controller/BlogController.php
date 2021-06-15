<?php

namespace App\Controller;

use App\Service\Greeting;
use App\Service\VeryBadDesign;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * AbstractController is one of few other possible extensions (check source).
 *
 * Symfony 4: It's more restrictive than others, e.g. only a few services from container;
 * so it enforces Dependency Injection and not using the service container directly?
 *
 * Prefix URL for all routes in Controller:
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
  public function __construct(Greeting $greeting, VeryBadDesign $veryBadDesign, \Twig\Environment $twig)
  {
    $this->greeting = $greeting;
    $this->veryBadDesign = $veryBadDesign;
    $this->twig = $twig;
  }

  /**
   * 'HttpFoundationRequest' as 'argument resolver' (you can add any other compatible?)
   *
   * @Route("/", name="blog_index")
   */
  public function index(HttpFoundationRequest $request): Response
  {
    // Cannot be used: 'AbstractController' does not allow accessing the service container directly
    // $service = $this->get('app.greeting');
    $name = $request->get('name');

    // For demo purpose: Use own twig renderer: Allows to separate rendering markup from Response
    $renderedMarkup = $this->twig->render('base.html.twig', [
      'message' => 'index(): ' . $this->greeting->greet($name)
    ]);

    return new Response($renderedMarkup);
  }

  /**
   * Catch-all route.
   *
   * @Route("/{name}", name="blog_catchall", stateless=true)
   */
  public function catchall($name): Response
  {
    return $this->render('base.html.twig', [
      'message' => "catchall(): $name"
    ]);
  }
}
