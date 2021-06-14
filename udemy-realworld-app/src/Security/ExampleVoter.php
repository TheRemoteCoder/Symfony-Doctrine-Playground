<?php

namespace App\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class ExampleVoter implements VoterInterface
{
    /**
     * Return vote for given parameters.
     *
     * @see VoterInterface
     */
    public function vote(TokenInterface $token, $subject, array $attributes) : int
    {
      return self::ACCESS_GRANTED;
    }
}