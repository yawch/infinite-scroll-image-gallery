const images = [
    'https://images.pexels.com/photos/1122414/pexels-photo-1122414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2587467/pexels-photo-2587467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2694453/pexels-photo-2694453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2356089/pexels-photo-2356089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2400594/pexels-photo-2400594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

const expandImg = (src) => {
    document.querySelector('.view-image .view-container .image').src = src;
    document.querySelector('.view-image .view-container .url').textContent = src;
    document.querySelector('.view-image .view-container .url').href = src;
    document.querySelector('.view-image').style.opacity = 1;
    document.querySelector('.view-image').style.zIndex = 3;
};

(() => {
    document.querySelectorAll('main ul').forEach((ul) => {
        ul.addEventListener('click', (e) => {
            e.target.tagName === 'IMG' && expandImg(e.target.getAttribute('src'));
        });
    });

    document.querySelector('.view-image').addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target === document.querySelector('.view-image')) {
            document.querySelector('.view-image').style.opacity = 0;
            document.querySelector('.view-image').style.zIndex = -1;
        }
    });

    let i = 0;
    return renderImage = (url) => {
        const img = document.createElement('img');
        img.src = url;
        const li = document.createElement('li');
        li.appendChild(img);
        document.querySelectorAll('main ul')[i++].appendChild(li);
        if (i === 3) i = 0;
    }
})();

images.forEach(renderImage);