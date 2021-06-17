<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Automatically picked up as a service, because we extend a certain class that is part of
 * what can get mapped to services (Service container looks for classes that extend 'AbstractExtension'; among others).
 * Here is no need to map it in any config YAML. Works because we use the system default YAML files.
 *
 * @example
 *   php bin/console debug:container 'App\Twig\AppExtension'
 *
 * @todo Decide - Should this be a subfolder to Service/ as it basically is one?
 */
class AppExtension extends AbstractExtension
{
  public function getFilters()
  {
    return [new TwigFilter('price', [$this, 'priceFilter'])];
  }

  public function priceFilter(float $price)
  {
    return '$' . number_format($price, 2);
  }
}
