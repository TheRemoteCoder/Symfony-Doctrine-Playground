<?php

namespace App\Controller;

use App\Entity\MicroPost;
use App\Repository\MicroPostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;

/**
 * @todo Find out how to replace SessionInterface with new method
 *
 * IMPORTANT: Route ordering of methods matters to Symfony!
 * What is written first here, is first evaluated.
 *
 * @Route("/micropost")
 */
class MicroPostController extends AbstractController
{
    public function __construct(
        EntityManagerInterface $entityManager,
        FormFactoryInterface $formFactory,
        MicroPostRepository $microPostRepository,
        RouterInterface $router,
        \Twig\Environment $twig
    ) {
        $this->entityManager = $entityManager;
        $this->formFactory = $formFactory;
        $this->microPostRepository = $microPostRepository;
        $this->router = $router;
        $this->twig = $twig;
    }

    /**
     * @Route("/", name="micropost_index")
     */
    public function index(): Response
    {
        $html = $this->twig->render('micropost/index.html.twig', [
            // 'posts' => $this->microPostRepository->findAll()
            'posts' => $this->microPostRepository->findBy(
                [],
                ['time' => 'DESC'],
            )
        ]);

        return new Response($html);
    }

    /**
     * See 'add()' method for basics about how forms work.
     * Symfonys internal ParamConverter automatically fetches post with given ID.
     *
     * @Route("/edit/{id}", name="micropost_edit")
     */
    public function edit(MicroPost $post, Request $request): Response
    {
        // Keep time same here (could be an extra field for 'time changed')
        // $post->setTime(new \DateTime());

        $form = $this->formFactory->create(
            MicroPostType::class,
            $post
        );

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Persist is not needed on change (it already exists)
            $this->entityManager->flush();
        }

        return $this->render(
            'micropost/edit.html.twig',
            [
                'form' => $form->createView()
            ]
        );
    }

    /**
     * Create post.
     *
     * @todo How is form data associated (entity properties are filled after 'handleRequest'/submit?
     * @todo How to use forms with pure array data (not MicroPost object)?
     * @see https://symfony.com/doc/current/form/without_class.html
     * @Route("/add", name="micropost_add")
     */
    public function add(Request $request): Response
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
            // Persist only needed for creating new data sets
            $this->entityManager->persist($microPost);
            $this->entityManager->flush();

            // Alternative (usually done this way)
            // return new RedirectResponse($this->router->generate('micropost_index'));
        }

        return $this->render(
            'micropost/add.html.twig',
            [
                'form' => $form->createView()
            ]
        );
    }

    /**
     * Warning: Beware of Symfony magic of route ordering:
     * 'id' would pick up any string after slash, so other routes might not work anymore.
     * Put this in the correct order - here ideally last, or better rename it to be unique.
     *
     * Symfony way (Param converter): By supplying the class as parameter,
     * Symfony will automatically look up the required route parameter in it
     * and auto-fetches the required data.
     *
     * This is visible in the debug toolbar under Doctrine, when on the page for a single post:
     * - https://127.0.0.1:8000/_profiler/3fb394?panel=db
     *
     * @Route("/{id}", name="micropost_post")
     */
    public function post(MicroPost $post): Response
    {
        return $this->render(
            'micropost/post.html.twig',
            [
                'post' => $post
            ]
        );
    }

    /**
     * Classic way: Fetch post by ID manually.
     * @Route("/{id}", name="micropost_post_example")
     */
    /* * /
    public function postExample(int $id): Response
    {
        $post = $this->microPostRepository->find($id);
        // Render ...
    }
    /* */
}
