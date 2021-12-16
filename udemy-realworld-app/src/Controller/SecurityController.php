<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Twig\Environment;

/**
 * If not extending AbstractController, an error is thrown about tagging:
 * https://symfony.com/doc/current/controller/service.html
 */
class SecurityController extends AbstractController
{
    /**
     * @var \Twig_Environment
     */
    private $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }


    /**
     * @todo ???
     * @Route("/login-attempt", name="security_login_attempt")
     */
    public function loginAttempt(Request $request): Response
    {
      if ($request->isMethod('post')) { 
          var_dump('POST');
      }
    }
    
    /**
     * Dependencies can also be injected in methods directly.
     * 
     * @todo Fix - Login to this route throws error 'Invalid credentials'
     * @Route("/login", name="security_login")
     */
    public function login(AuthenticationUtils $authenticationUtils)
    {
        return new Response($this->twig->render(
            'security/login.html.twig',
            [
                'error' => $authenticationUtils->getLastAuthenticationError(),
                'last_username' => $authenticationUtils->getLastUsername(),
            ]
        ));
    }

    /**
     * @Route("/logout", name="security_logout")
     */
    public function logout()
    {
    }
}
