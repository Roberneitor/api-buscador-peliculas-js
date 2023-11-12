document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = 'b7f58a6840e78c8120be4812aab1c1eb'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')
resultContainer.innerHTML = ''

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...'
    let searchInput = document.getElementById('searchInput').value

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}&language=es-ES`)
    .then(response => response.json())
    .then(response=>displayMovies(response.results))
}

function displayMovies(movies){
    resultContainer.innerHTML = ''

    if(movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv= document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.original_title + ' (' + movie.title + ')'

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        let votoAvg = document.createElement('p')
        votoAvg.textContent = 'Votos promedio: ' + String(movie.vote_average) + ' [1 - 10]'

        let votoCont = document.createElement('p')
        votoCont.textContent = 'Total Votos: ' + String(movie.vote_count)

        let star = document.createElement('img', 'width: 10px; float: left; margin-right: 10px;')
        star.src = 'star.png'

        let popularidad = document.createElement('p')
        popularidad.textContent = 'Popularidad: ' + String(movie.popularity)

        let adulto = document.createElement('p')
        if(movie.adult)
            adulto.textContent = 'Adulto: >18'
        else
            adulto.textContent = 'Adulto: Todo Espectador'

        let separacion = document.createElement('p')
        separacion.textContent = '-------------------------------------------'

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(star)
        movieDiv.appendChild(popularidad)
        movieDiv.appendChild(votoAvg)
        movieDiv.appendChild(votoCont)
        movieDiv.appendChild(adulto)
        movieDiv.appendChild(separacion)

        resultContainer.appendChild(movieDiv)
    })
}