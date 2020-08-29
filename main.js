const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const singleEl = document.querySelector('.single-res')
const searchEl = document.querySelector('.search-res')
const imgEl = document.querySelector('.img-res')
const searchHeading = document.querySelector('.search-heading')
const resHeading = document.querySelector('.res-heading')
const resHeading2 = document.querySelector('#head')

// Event listener
submit.addEventListener('submit', searchShows)

// get Shows
function searchShows(e) {
    e.preventDefault();
    const term = search.value;
    if (term.trim()) {
        fetch(`http://api.tvmaze.com/singlesearch/shows?q=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                searchHeading.innerHTML = `<h2>You Searched '${term}'</h2>`;
                searchEl.innerHTML = `
                    <div class="show">
                        <img src="${data.image.medium}">
                        <div class="show-d">
                            <h3>${data.name}</h3>
                            <p>Genres: ${data.genres.map(item => `${item ? item : '---'} `)}</p>
                            <p>Year: ${data.premiered.slice(0 , 4)}</p>
                            ${data.summary}
                        </div>
                    </div>
                    
                `
                showCast(data.id);
                showImg(data.id);
            })
    } else {
        alert('Please Enter The TV show name!')
    }
}

function showCast(id) {
    resHeading.innerHTML = `<h2>Cast</h2>`
    resHeading.classList.add('bt')
    fetch(`http://api.tvmaze.com/shows/${id}/cast`)
        .then(res => res.json())
        .then(data => {
            singleEl.innerHTML = data.map(item =>
                `
                    
                    <div class="actor">
                        <img src="${item.person.image.medium}">
                        <div class="actor-name">
                            <h3>${item.person.name}</h3>
                        </div>
                    </div>
                `
            ).join('')
        })

}

function showImg(id) {
    resHeading2.innerHTML = `<h2>Images</h2>`;
    resHeading2.classList.add('bt')
    fetch(`http://api.tvmaze.com/shows/${id}/images`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            imgEl.innerHTML = data.map(img =>
                `
                <div class="mySlides">
                    <img src="${img.resolutions.original.url}" style="width:100%">
                </div>
                `
            ).join('')
        })
}