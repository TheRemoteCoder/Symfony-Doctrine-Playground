<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\MicroPostRepository;

/**
 * @todo Find out how to replace SessionInterface with new method
 *
 * @Route("/micropost")
 */
class MicroPostController extends AbstractController
{
    public function __construct(
        \Twig\Environment $twig,
        MicroPostRepository $microPostRepository
    ) {
        $this->twig = $twig;
        $this->microPostRepository  = $microPostRepository;
    }

    /**
     * @Route("/", name="micropost_index")
     */
    public function index(): Response
    {
        $html = $this->twig->render('micropost/index.html.twig', [
            'posts' => $this->microPostRepository->findAll()
        ]);

        return new Response($html);
    }

    /**
     * Create post.
     *
     * @Route("/add", name="micropost_add")
     */
    public function add()
    {
        return $this->render('micropost/add.html.twig', []);
    }
}
