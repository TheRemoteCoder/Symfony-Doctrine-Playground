<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211216091402 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE following (user_id INT NOT NULL, following_user_id INT NOT NULL, INDEX IDX_71BF8DE3A76ED395 (user_id), INDEX IDX_71BF8DE31896F387 (following_user_id), PRIMARY KEY(user_id, following_user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE following ADD CONSTRAINT FK_71BF8DE3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE following ADD CONSTRAINT FK_71BF8DE31896F387 FOREIGN KEY (following_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD roles LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', ADD confirmation_token VARCHAR(30) DEFAULT NULL, ADD enabled TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE following');
        $this->addSql('ALTER TABLE user DROP roles, DROP confirmation_token, DROP enabled');
    }
}
