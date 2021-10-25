<?php

namespace App\Entity;

use App\Repository\MicroPostRepository;
use Doctrine\ORM\Mapping as ORM;
// Dummy path used for manual IntelliSense (VSCode issue?)
use Doctrine\ORM\Mapping\GeneratedValue as GeneratedValue;

/**
 * @ORM\Entity(repositoryClass=MicroPostRepository::class)
 */
class MicroPost
{
    /**
     * 'GeneratedValue' can be other things like UUID.
     * Can be named anything - the ORM\Id is important.
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=280)
     */
    private $text;

    /**
     * @ORM\Column(type="datetime")
     */
    private $time;

    // No setId() needed/recommended as it's generated
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;

        return $this;
    }
}
