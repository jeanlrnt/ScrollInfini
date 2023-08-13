const imagesList = document.querySelector('.images-list');
const errorMsg = document.querySelector('.error-msg');
let searchQuery = 'beach';
let pageIndex = 1;

async function fetchData() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=yau9DYqRgX-lmC3Ncn-OC6dDkyU-02OHRe4uGhPBK2M`)
        
        if (!response.ok) {
            throw new Error(`Error ${response.status} : ${response.statusText}`)
        }

        const responseData = await response.json()

        if (!responseData.total) {
            throw new Error(`No results found for ${searchQuery}`)
        }

        createImages(responseData.results)
    }
    catch (err) {
        errorMsg.textContent = `${err}`;
    }
}

function createImages(images) {
    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.src = image.urls.regular;
        imagesList.appendChild(imageElement);
    })
}

const observer = new IntersectionObserver(handleIntersect, {rootMargin: '50%'});

observer.observe(document.querySelector('.infinite-marker'));

function handleIntersect(entries) {
    if (entries[0].isIntersecting && window.scrollY > window.innerHeight) {
        pageIndex++;
        fetchData();
    }
}

const input = document.querySelector('#search');
const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    imagesList.innerHTML = '';
    searchQuery = input.value;
    pageIndex = 1;
    fetchData();
}

const scrollToTopBtn = document.querySelector('.scroll-to-top');

scrollToTopBtn.addEventListener('click', scrollToTop);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}