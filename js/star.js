document.addEventListener('DOMContentLoaded', function (e) {
    let startElements = document.getElementsByClassName('stars');
    startElements = Array.prototype.slice.call( startElements)
    startElements.forEach(function (startElement) {
        let rate = startElement.slot;
        let fullStar = `<img src="../assets/icons/star-fill.svg"/>`;
        let emptyStar =  `<img src="../assets/icons/star-empty.svg"/>`;
        if (rate) {
            let newElement = document.createElement('div');
            newElement.classList.add('starList');
            for (let i = 0; i < rate; i++) {
                newElement.innerHTML += (fullStar);
            }
            for (let i = 0; i < 5 - parseInt(rate); i++) {
                newElement.innerHTML += (emptyStar);
            }
            startElement.appendChild(newElement)
        }
    })
})