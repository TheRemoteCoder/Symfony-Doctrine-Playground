<?php

namespace App\Controller;

use App\Entity\MicroPost;
use App\Repository\MicroPostRepository;
use Doctrine\ORM\EntityManagerInterface;
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
        EntityManagerInterface $entityManager,
        FormFactoryInterface $formFactory,
        MicroPostRepository $microPostRepository,
        \Twig\Environment $twig
    ) {
        $this->entityManager = $entityManager;
        $this->formFactory = $formFactory;
        $this->microPostRepository = $microPostRepository;
        $this->twig = $twig;
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
     * @todo How to use forms with pure array data?
     * @todo How is form data associated with MicroPost?
     * @todo Why is initial data with $post needed?
     * @see https://symfony.com/doc/current/form/without_class.html
     * @Route("/add", name="micropost_add")
     */
    public function add(HttpFoundationRequest $request): Response
    {
        $microPost = new MicroPost();
        $microPost->setTime(new \DateTime());
        //$microPost->setText('TEXT:DEFAULT');

        // Class defines the form structure requirement: Form must match the Entity properties
        // Parameter 1 = Required (form fields), Parameter 2 = Optional (default values).
        $form = $this->formFactory->create(
            MicroPostType::class,
            $microPost
        );

        if ($request->isMethod('post')) {
            var_dump('POST 1');
            var_dump($microPost);
        }

        // After this, the data object is modified with data to persist (?)
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            var_dump('POST 2');
            var_dump($microPost);
            //var_dump($form->getData()); // Object
            //die;
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->persist($microPost);
            $this->entityManager->flush();
        }

        return $this->render(
            'micropost/add.html.twig',
            [
                'form' => $form->createView()
            ]
        );
    }
}
