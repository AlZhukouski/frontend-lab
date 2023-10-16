const searchButton = document.querySelector(".navigation__btn--search"),
    searchOverlay = document.querySelector(".search");
searchCloseButton = document.querySelector(".search__close-btn");

searchButton && searchOverlay && searchButton.addEventListener("click", () => {
    searchOverlay.classList.add("active");
});
searchCloseButton&&searchCloseButton.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
});

const giphyApiKey = "BOt4sJ4cJRxDcCSJz9lSYnTe28D9gTvI",
    giphyFlex = document.querySelector(".giphy__flex"),
    currentCount = document.querySelector(".giphy__pagination-current-count"),
    maxCount = document.querySelector(".giphy__pagination-max-count"),
    buttonPrev = document.querySelector(".giphy__pagination-button--prev"),
    buttonNext = document.querySelector(".giphy__pagination-button--next");

let searchString = "cats",
    count = 4,
    offset = 0,
    totalCount = 0;

async function giphyRender() {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchString}&limit=${count}&offset=${offset}`);
    const giphyResponse = await response.json();
    giphyFlex.innerHTML = "";
    totalCount = giphyResponse.pagination.total_count;

    currentCount.innerHTML = (Math.floor(offset / count) + 1).toString();
    maxCount.innerHTML = (Math.floor(totalCount / count) + 1).toString();

    buttonPrev.disabled = offset === 0;
    buttonNext.disabled = offset + 1 === totalCount;

    /* console.log(giphyResponse);*/
    giphyResponse.data.forEach((item) => {
        createGiphyCard(item);
    });
}

giphyRender();

function pagination(direction) {
    if (direction) {
        if (offset - count >= 0) {
            offset = offset - count;
        }

    } else {
        offset = offset + count;
    }
    giphyRender();
}

buttonPrev.addEventListener("click", () => pagination(true));
buttonNext.addEventListener("click", () => pagination(false));

function createGiphyCard(item) {
    let card = document.createElement("div");
    card.className = "giphy__card";

    const imageLink = document.createElement("div");
    imageLink.className = "giphy__card-link";
    card.appendChild(imageLink);

    const imageLinkIcon = document.createElement("a");
    imageLinkIcon.className = "giphy__card-link-icon fas fa-link";
    imageLinkIcon.href = item.url;
    imageLinkIcon.target = "_blank";
    imageLink.appendChild(imageLinkIcon);

    const image = new Image(item.images.original.width, item.images.original.height);
    image.className = "giphy__card-img";
    image.src = item.images.original.url;
    imageLink.appendChild(image);

    const content = document.createElement("div");
    content.className = "giphy__card-content";
    card.appendChild(content);

    const title = document.createElement("h2");
    title.className = "giphy__card-title";
    title.innerHTML = item.title;
    content.appendChild(title);

    const publicDate = document.createElement("p");
    publicDate.className = "giphy__card-public-date";
    publicDate.innerHTML = item.import_datetime;
    content.appendChild(publicDate);

    const description = document.createElement("p");
    description.className = "giphy__card-description";
    description.innerHTML = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
    content.appendChild(description);

    giphyFlex.appendChild(card);
}

function handleWidthChange (width) {
    /* console.log(width);*/
}

let prevWidth = 0;

const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
        const width = entry.borderBoxSize?.[0].inlineSize;
        if (typeof width === 'number' && width !== prevWidth) {
            prevWidth = width;

            if (width < 900) {
                count = 3;
                giphyRender()
            } else if (width >= 900) {
                count = 4;
                giphyRender()
            }
            handleWidthChange(width);
        }
    }
});

observer.observe(document.body, {box: 'border-box'});