<?php

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Automatically picked up as a service, because we extend a certain class that is part of
 * what can get mapped to services (Service container looks for classes that extend 'AbstractExtension'; among others).
 * Here is no need to map it in any config YAML. Works because we use the system default YAML files.
 */
class AppExtension extends AbstractExtension
{
  public function getFilters()
  {
    return [new TwigFilter('price', [$this, 'priceFilter'])];
  }

  private function priceFilter(float $price, $options)
  {
    return '$' . number_format($price, 2);
  }
}
