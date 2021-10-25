<?php

namespace App\DataFixtures;

use App\Entity\MicroPost;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $this->createPosts($manager);
        $manager->flush();
    }

    /**
     * Create random posts.
     *
     * @param ObjectManager $manager
     * @return void
     */
    private function createPosts(ObjectManager $manager): void
    {
        for ($i = 0; $i < 10; $i++) {
            $post = new MicroPost();
            $post->setText('Random text: ' . rand(0, 100));
            $post->setTime(new \DateTime('now'));
            $manager->persist($post);
        }
    }
}
