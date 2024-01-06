<?php

namespace App\Model;

class ArticleManager extends AbstractManager
{
    public const TABLE = 'article';

    // Recuperation d'un article aléatoire
    public function selectRandomOne()
    {
        // prepared request      
        $statement = $this->pdo->prepare("SELECT * FROM " . static::TABLE . " ORDER BY RAND() LIMIT 1");
        $statement->execute();

        return $statement->fetch();
    }

    // Récuperation de tous les articles contenant le mot clé passé en parametre
    public function selectFromSearch(string $title)
    {
        $statement = $this->pdo->prepare("SELECT * FROM ".static::TABLE. " 
            WHERE title LIKE :title ");
        
        $statement->bindValue(":title", '%' .$title .'%', \PDO::PARAM_STR);
        $statement->execute();
        
        return $statement->fetchAll();
        
    }
}
