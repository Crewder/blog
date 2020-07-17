<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
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

}
