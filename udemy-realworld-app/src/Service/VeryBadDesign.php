<?php

namespace App\Service;

use App\Service\Greeting; // Optional use?
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Old pattern <= Symfony 4 to access services from container on fly.
 * Not recommended anymore as Dependency Injection should be prefered.
 */
class VeryBadDesign implements ContainerAwareInterface
{
  /*+
   * Required annotation for service autowiring: It will call method and autowire parameters.
   * PHP 7 way to go; PHP8 can use attributes: #[Required]
   *
   * Sources
   * - https://symfony.com/doc/current/service_container/autowiring.html
   * - https://symfony.com/doc/current/service_container/calls.html
   *
   * @required
   */
  public function setContainer(?ContainerInterface $container = null)
  {
    // $container->get(Greeting::class); // By class
    $container->get('app.greetingx'); // By alias
  }
}
