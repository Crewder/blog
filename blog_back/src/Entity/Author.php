<?php

namespace App\Entity;

use App\Repository\AuthorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=AuthorRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"author_read"}}
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"author_post"}}
 *          },
 *     },
 *     itemOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"author_details_read"}}
 *         },
 *         "put"={
 *             "normalization_context"={"groups"={"author_details_put"}}
 *         },
 *         "delete"
 *     }
 * )
 */
class Author
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"article_read", "article_details_read", "author_read", "author_post", "author_details_read", "author_details_put"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"article_details_read", "author_read", "author_post", "author_details_read", "author_details_put"})
     */
    private $lastname;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="author")
     * @Groups({"author_post", "author_details_read", "author_details_put"})
     */
    private $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setAuthor($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            // set the owning side to null (unless already changed)
            if ($article->getAuthor() === $this) {
                $article->setAuthor(null);
            }
        }

        return $this;
    }

}
