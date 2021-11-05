<?php

namespace App\DataFixtures;

use App\Entity\MicroPost;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Exception;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * @throws Exception
     */
    public function load(ObjectManager $manager): void
    {
        $this->createPosts($manager);
        $this->createUsers($manager);

        // Handles persisting of -all- data
        $manager->flush();
    }

    /**
     * Create user.
     *
     * @todo How does encryption algorithm (bcrypt) work here?
     * @param ObjectManager $manager
     * @return void
     * @throws Exception
     */
    private function createUsers(ObjectManager $manager): void
    {
        $user = new User();

        $user->setUsername('test');
        $user->setFullName('Test');
        $user->setEmail('test@localhost');
        $user->setPassword($this->userPasswordEncoder->encodePassword(
            $user,
            'test'
        ));

        $manager->persist($user);
    }

    /**
     * Create random posts.
     *
     * @param ObjectManager $manager
     * @return void
     * @throws Exception
     */
    private function createPosts(ObjectManager $manager): void
    {
        for ($i = 0; $i < 10; $i++) {
            $post = new MicroPost();
            $post->setTitle('Random title: ' . random_int(0, 100));
            $post->setText('Random text: ' . random_int(0, 100));
            $post->setTime(new DateTime('now'));

            // Queues objects -to be- persisted (later)
            $manager->persist($post);
        }
    }
}
