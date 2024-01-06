function updateHeadline(title, picture, content) {
    document.getElementById('headlineTitle').innerHTML = title;
    document.getElementById('headlinePicture').setAttribute('src', picture);
    document.getElementById('headlineContent').innerHTML = content;
}

document.getElementById('changeHeadlineButton').addEventListener('click', function () {
    //TODO 1 : Get a random article
    fetch("http://localhost:8000/api/articles/random")
    .then(res => res.json())
    .then(data => updateHeadline(data.title, data.picture, data.content))
    .catch(err => console.log(err));
});

document.getElementById('searchHeadline').addEventListener('input', function(e) {
    //Ici, nous obtenons la valeur saisie dans l'entrée
    let search = e.target.value;

    // la <ul> ou sera injecter les element trouvés
    const listeArticles = document.getElementById('resultList');
    listeArticles.innerHTML = "" ; 

    //Appelez la route 'api/articles/search' pour obtenir la liste des 
    // articles ciblés par la recherche
    fetch(`http://localhost:8000/api/articles/search?search_title=${search}` )

    .then(res => res.json())

    .then(data => data.forEach(element => {
      
        // Création de la balise <a>
        const linkArticle = document.createElement("a");
        linkArticle.href = "http://localhost:8000/article?id=" + element.id

        // pour chaque element trouvé on va créer un <li>
        const liArticle = document.createElement('li');

        linkArticle.textContent = element.title;

        liArticle.appendChild(linkArticle);
    
        // et on l'inject dans <ul>
        listeArticles.appendChild(liArticle);     
    }))
    .catch(err => console.log(err));
});

