<?php

namespace App\Controller;

use App\Service\Greeting;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
	public function __construct(Greeting $greeting)
	{
		$this->greeting = $greeting;
	}

	/**
	 * @Route("/", name="blog_index")
	 */
	public function index(HttpFoundationRequest $request)
	{
		$name = $request->get('name');

		return $this->render('base.html.twig', [
			'message' => $this->greeting->greet($name)
		]);
	}
}
