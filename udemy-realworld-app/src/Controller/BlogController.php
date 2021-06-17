<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
  public function __construct(\Twig\Environment $twig, SessionInterface $session)
  {
    $this->twig    = $twig;
    $this->session = $session;
  }

  /**
   * @Route("/", name="blog_index")
   */
  public function index(): Response
  {
    return $this->render('blog/index.html.twig', [
      'posts' => $this->session->get('posts')
    ]);
  }

  /**
   * Create random post.
   *
   * @todo Fix - Method must return some response object
   * @todo Improve - Posts should not be stored in sessions
   * @todo Improve - Redirect users to main page after adding post
   * @Route("/add", name="blog_add")
   */
  public function add()
  {
    $posts = $this->session->get('posts');

    $id = uniqid();
    $posts[$id] = [
      'title' => 'Random title ' . $id,
      'text'  => 'Random text ' . $id,
    ];

    $this->session->set('posts', $posts);

    // Not needed, just for visual demo
    return new Response(json_encode($posts));
  }

  /**
   * @Route("/show/{id}", name="blog_show")
   */
  public function show(string $id)
  {
    $posts = $this->session->get('posts');

    if (!$posts || !isset($posts[$id])) {
      // Throw 404 and use internal template
      throw new NotFoundHttpException('Post not found.');
    }

    return $this->render('blog/post.html.twig', [
      'id' => $id,
      'post' => $posts[$id]
    ]);
  }
}
