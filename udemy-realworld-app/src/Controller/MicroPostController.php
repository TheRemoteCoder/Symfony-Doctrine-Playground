<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;

/**
 * @todo Find out how to replace SessionInterface with new method
 *
 * @Route("/micropost")
 */
class MicroPostController extends AbstractController
{
    public function __construct(
        \Twig\Environment $twig,
        RouterInterface $router
    ) {
        $this->twig    = $twig;
        $this->router  = $router;
    }

    /**
     * @Route("/", name="micro_post_index")
     */
    public function index(): Response
    {
        return $this->render('micropost/index.html.twig', []);
    }
}
