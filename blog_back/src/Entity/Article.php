<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiSubresource;


/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"article_read"}}
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"article_post"}}
 *          },
 *     },
 *     itemOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"article_details_read"}}
 *         },
 *         "put"={
 *             "normalization_context"={"groups"={"article_details_put"}}
 *         },
 *         "delete"
 *     }
 * )
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"article_read", "article_details_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Author::class, inversedBy="articles")
     * @Groups({"article_read", "article_post", "article_details_read", "article_details_put"})
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"author_details_read", "article_read", "article_post", "article_details_read", "article_details_put"})
     *
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"article_post", "article_details_read", "article_details_put"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"author_details_read", "article_read", "article_post", "article_details_read", "article_details_put"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"author_details_read", "article_read", "article_post", "article_details_read", "article_details_put"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="articles")
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Commentary::class, mappedBy="article")
     */
    private $commentary;

    public function __construct()
    {
        $this->commentary = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): ?author
    {
        return $this->author;
    }

    public function setAuthor(?author $author): self
    {
        $this->author = $author;

        return $this;
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

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCategory(): ?category
    {
        return $this->category;
    }

    public function setCategory(?category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|commentary[]
     */
    public function getCommentary(): Collection
    {
        return $this->commentary;
    }

    public function addCommentary(commentary $commentary): self
    {
        if (!$this->commentary->contains($commentary)) {
            $this->commentary[] = $commentary;
            $commentary->setArticle($this);
        }

        return $this;
    }

    public function removeCommentary(commentary $commentary): self
    {
        if ($this->commentary->contains($commentary)) {
            $this->commentary->removeElement($commentary);
            // set the owning side to null (unless already changed)
            if ($commentary->getArticle() === $this) {
                $commentary->setArticle(null);
            }
        }

        return $this;
    }

}
