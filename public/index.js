const getRandomImageUrl = async () => {
    const res = await fetch('api/getRandomImageUrl');
    const data = await res.json();
    return data.url;
}

const expandImg = (src) => {
    document.querySelector('.view-image .view-container .image').src = src;
    document.querySelector('.view-image .view-container .url').textContent = src;
    document.querySelector('.view-image .view-container .url').href = src;
    document.querySelector('.view-image').style.opacity = 1;
    document.querySelector('.view-image').style.zIndex = 3;
};

(() => {
    let i = 0;
    return renderImage = (url) => {
        const img = document.createElement('img');
        img.src = url;
        document.querySelectorAll('main div')[i++].appendChild(img);
        if (i === 4) i = 0;
    }
})();

document.querySelectorAll('main div').forEach((div) => {
    div.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            expandImg(e.target.getAttribute('src'));
        }
    });
});

document.querySelector('.view-image').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.view-image')) {
        document.querySelector('.view-image').style.zIndex = -1;
        document.querySelector('.view-image').style.opacity = 0;
    }
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2000) {
        (async () => {
            renderImage(await getRandomImageUrl());
        })();
    }
});

(async () => {
    const promiseArr = [];
    for (let i = 0; i < 10; i++) {
        promiseArr.push(getRandomImageUrl());
    }
    const results = await Promise.all(promiseArr);
    results.forEach(renderImage);
})();