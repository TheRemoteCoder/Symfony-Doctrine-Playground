<?php

namespace App\Controller;

use App\Service\Greeting;
use App\Service\VeryBadDesign;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;


/**
 * AbstractController is one of few other possible extensions (check source).
 *
 * Symfony 4: It's more restrictive than others, e.g. only a few services from container;
 * so it enforces Dependency Injection and not using the service container directly?
 *
 * Prefix URL for all routes in Controller:
 * @Route("/example")
 */
class ExampleController extends AbstractController
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
     * @Route("/", name="example_index")
     */
    public function index(HttpFoundationRequest $request): Response
    {
        // Cannot be used: 'AbstractController' does not allow accessing the service container directly
        // $service = $this->get('app.greeting');
        $name = $request->get('name');

        // For demo purpose: Use own twig renderer: Allows to separate rendering markup from Response
        $html = $this->twig->render('example.html.twig', [
            'message' => 'index(): ' . $this->greeting->greet($name)
        ]);

        /* * /
        d($request->getBaseUrl());
        d($request->getScheme());
        d($request->getPort());
        d($request->getUserInfo());
        d($request->getHttpHost());
        d($request->getRequestUri());
        d($request->getUri());
        d($request->getLocale());
        d($request->isMethodSafe());
        d($request->isMethodIdempotent());
        d($request->isMethodCacheable());
        d($request->isXmlHttpRequest());
        d($request->headers);
        d(array_values((array)$request->headers));
        /* */

        $response = new Response($html, 200);

        // Works only if no other output has occured (e.g. debug messages)
        $response->headers->add(['x-test' => 'XXX']);
        //$response->headers->addCacheControlDirective('must-revalidate', true);

        return $response;
    }

    /**
     * Guzzle testing route.
     * Also uses 'Kint' to show debug results (toolbar at screen bottom).
     *
     * @Route("/guzzle", name="example_guzzle")
     * @see https://kint-php.github.io/kint
     */
    public function guzzle(): Response
    {
        $client = new Client();
        $res = $client->request('GET', 'https://jsonplaceholder.typicode.com/todos/1', [
          // 'auth' => ['user', 'pass']
        ]);
        
        d($res->getStatusCode());
        d($res->getHeader('content-type')[0]);
      
        return new Response($res->getBody());
    }

    /**
     * Catch-all route.
     *
     * @Route("/{name}", name="example_catchall", stateless=true)
     */
    public function catchall($name): Response
    {
        return $this->render('example.html.twig', [
            'message' => "catchall(): $name"
        ]);
    }
}
