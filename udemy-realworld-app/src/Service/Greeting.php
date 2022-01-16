<?php

namespace App\Service;

use Psr\Log\LoggerInterface;

class Greeting
{
    /**
     * Symfony 'issue': Autowiring a string cannot be done as it is not a service, just a type;
     * so it needs to be configured as argument.
     */
    public function __construct(LoggerInterface $logger, string $message)
    {
        $this->logger = $logger;
        $this->message = $message;
    }

    public function greet(string $name): string
    {
        $this->logger->info("Greeted: $name");

        return "{$this->message} $name";
    }
}
