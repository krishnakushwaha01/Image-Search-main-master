const accessKey = "o-_syyP5bcXMZNDLmoKoiS9WFrPHXBR6jKuCDAKnFRE";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("input-search");
const searchResult = document.getElementById("image-input");
const showMore = document.getElementById("show");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        results.forEach(result => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("image-inputs");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResult.appendChild(imageWrapper);
        });

        page++;

        if (results.length > 0) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

formEl.addEventListener("submit", event => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", event => {
    searchImages();
});
