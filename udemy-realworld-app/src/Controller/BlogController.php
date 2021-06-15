<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Prefix URL for all routes in Controller:
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
  public function __construct(\Twig\Environment $twig)
  {
    $this->twig = $twig;
  }

  /**
   * @Route("/", name="blog_index")
   */
  public function index(HttpFoundationRequest $request): Response
  {
    return $this->render('base.html.twig', [
      'message' => ''
    ]);
  }
}
