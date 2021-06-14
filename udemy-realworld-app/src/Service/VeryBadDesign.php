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
   * Annotation sets Service container?
   * @required
   */
  public function setContainer(?ContainerInterface $container = null)
  {
    // $container->get(Greeting::class); // By class
    $container->get('app.greetingx'); // By alias
  }
}
