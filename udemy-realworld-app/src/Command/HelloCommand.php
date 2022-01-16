<?php

namespace App\Command;

use App\Service\Greeting;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Create own CLI commands.
 *
 * @example
 *   php bin/console app:say-hello John
 */
class HelloCommand extends Command
{
    public function __construct(Greeting $greeting)
    {
        $this->greeting = $greeting;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('app:say-hello')
            ->setDescription('Say hello to user')
            ->addArgument('name', InputArgument::REQUIRED);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $name = $input->getArgument('name');

        $output->writeln("Hello from app: \n =========");
        $output->writeln($this->greeting->greet($name));

        return self::SUCCESS;
    }
}
