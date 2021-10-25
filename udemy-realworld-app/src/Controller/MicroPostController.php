<?php

namespace App\Controller;

use App\Entity\MicroPost;
use App\Repository\MicroPostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @todo Find out how to replace SessionInterface with new method
 *
 * @Route("/micropost")
 */
class MicroPostController extends AbstractController
{
    public function __construct(
        \Twig\Environment $twig,
        FormFactoryInterface $formFactory,
        MicroPostRepository $microPostRepository
    ) {
        $this->twig = $twig;
        $this->formFactory = $formFactory;
        $this->microPostRepository = $microPostRepository;
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
    public function add(HttpFoundationRequest $request): Response
    {
        $post = new MicroPost();
        $post->setTime(new \DateTime());

        $form = $this->formFactory->create(
            MicroPostType::class,
            $post
        );

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // die('Submitted + Valid');
        }

        return $this->render(
            'micropost/add.html.twig',
            [
                'form' => $form->createView()
            ]
        );
    }
}
