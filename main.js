let elList = document.querySelector(".list");
const elForm = document.querySelector(".form");
const elInput = elForm.querySelector(".input");

// modal 
const elModal = document.querySelector(".modal-body");

const modalTitle = elModal.querySelector(".modal-title");
const modalIframe = elModal.querySelector(".modal-iframe");
const modalRank = elModal.querySelector(".modal-rank");
const modalYear = elModal.querySelector(".modal-year");
const modalTime = elModal.querySelector(".modal-time");
const modalCategory = elModal.querySelector(".modal-category");
const modalSummary = elModal.querySelector(".modal-summary");
const modalLink = elModal.querySelector(".btn-link");
const modalClose = document.querySelector(".close-btn");

let movieSplic = movies.slice(0, 100);

let elTemplate = document.querySelector(".template").content;

function minuteToHour(time) {
    let hour = Math.floor(time / 60);
    let min = time % 60;
    return `${hour} hr ${min} min`;
}

function showMovies(films) {

    elList.innerHTML = "";
    let fragment = new DocumentFragment();

    for (const movie of films) {

        let elTemplateClone = elTemplate.cloneNode(true);

        elTemplateClone.querySelector(".movie-img").src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`;
        elTemplateClone.querySelector(".movie-title").textContent = movie.Title;
        elTemplateClone.querySelector(".movie-rank").textContent = movie.imdb_rating;
        elTemplateClone.querySelector(".movie-year").textContent = movie.movie_year;
        elTemplateClone.querySelector(".movie-category").textContent = movie.Categories.split("|").join(", ");
        elTemplateClone.querySelector(".movie-time").textContent = minuteToHour(movie.runtime);
        elTemplateClone.querySelector(".more-info").dataset.id = movie.imdb_id;

        fragment.appendChild(elTemplateClone);
    }
    elList.appendChild(fragment);
}


function modalShow(movieId) {

    let foundMovie = movieSplic.find(function (element) {
        return element.imdb_id == movieId;
    })

    modalTitle.textContent = foundMovie.Title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${foundMovie.ytid}`;
    modalRank.textContent = foundMovie.imdb_rating;
    modalYear.textContent = foundMovie.movie_year;
    modalTime.textContent = minuteToHour(foundMovie.runtime);
    modalCategory.textContent = foundMovie.Categories.split("|").join(", ");
    modalSummary.textContent = foundMovie.summary;
    modalLink.href = `https://www.imdb.com/title/${foundMovie.imdb_id}`;
}


elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".more-info")) {
        modalShow(evt.target.dataset.id);
    }

})

modalClose.addEventListener("click", function () {
    modalIframe.src = ``;
})

showMovies(movieSplic);



elForm.addEventListener("keyup", function (evt) {
    evt.preventDefault();
    let inputValue = elInput.value.toLowerCase();

    let filterMovies = movieSplic.filter(movie => String(movie.Title).toLowerCase().includes(inputValue));
    showMovies(filterMovies);
});













// const movie = movies.filter((item) => {

//     return item.Categories.includes("Thriller") && item.movie_year >= 2008 && item.imdb_rating >= 6;

// });

// console.log(movie);


// const changeMovies = movies.map(item => {

//     return {
//         title: item.Title,
//         year: item.movie_year,
//         categories: item.Categories.split("|").join(", "),
//         imdbid: item.imdb_id,
//         imdbrating: item.imdb_rating,
//     }

// })

// console.log(changeMovies);