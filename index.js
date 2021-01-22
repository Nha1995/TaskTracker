const containerFields = document.querySelector('.containerWithFields');
const button = document.querySelector('.button');
const form = document.querySelector('.form');
const xLogo = document.querySelector('.x-logo');
const sortIcon = document.querySelector('.sort-icon');
let sortTracker;
let dragElement;

button.addEventListener('click', () => {
    let formElem = form.cloneNode(true);
    formElem.children[1].value ='';
    containerFields.append(formElem);
    let xLogo = formElem.querySelector('.x-logo');
    removeField(xLogo);
    dragOparaition(formElem);
    dragTrueOrFalse(formElem);
});

function removeField(xLogoButton) {    
    xLogoButton.addEventListener('click', () => {
        let formParentElement = xLogoButton.parentElement;
        formParentElement.remove(); 
    });
};

function dragTrueOrFalse(item) {
    item.children[0].addEventListener('mousedown', event => {
        item.draggable = true;
    });
};

function sortUpAndDown() {

    let arrForms = document.querySelectorAll('.form');
    let newArr = [...arrForms];

    if(sortTracker!='down') {

    sortIcon.innerHTML = `<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="12" width="2.5" height="12.5" transform="rotate(-180 3 13)"/>
    <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)"/>
    <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)"/>
    <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)"/>
    <path d="M3.75 6.55671e-07L6.99759 4.6875L0.502404 4.6875L3.75 6.55671e-07Z"/>
    </svg>`;
    
    newArr.sort((str1, str2) => {
        let a = str1.querySelector('.field-block').value;
        let b = str2.querySelector('.field-block').value;
        if(a > b) {
            return 1;
        } else {
            return -1;
        }
    });    
    sortTracker = 'down';
} else {
    sortIcon.innerHTML = `<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" width="2.5" height="12.5"/>
    <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)"/>
    <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)"/>
    <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)"/>
    <path d="M3.75 15L0.502405 10.3125L6.9976 10.3125L3.75 15Z"/>
    </svg> `;
    
    newArr.sort((str1, str2) => {
        let a = str1.querySelector('.field-block').value;
        let b = str2.querySelector('.field-block').value;
        if(a > b) {
            return -1;
        } else {
            return 1;
        }
    });    
    sortTracker = 'up';
}
    containerFields.innerHTML = '';
    containerFields.append(...newArr);
};

function dragOparaition(item) {    
    item.addEventListener('dragstart', (event) => {
        console.log(event.target); 
        console.log(item.children[0]);        
        dragElement = event.target;
        dragElement.style.backgroundColor = '#c3c3c3';
        dragElement.children[1].style.backgroundColor = '#c3c3c3';
        dragElement.children[1].style.color = '#FFFFFF';
        dragElement.querySelector('.dotes-icon-svg').style.fill = '#FFFFFF';
        dragElement.querySelector('.x-logo-svg').style.fill = '#c3c3c3';
        dragElement.querySelector('.x-logo-svg').style.stroke = '#FFFFFF';
    });

    item.addEventListener('dragend', (event) => {
        dragElement.style.backgroundColor = 'unset';
        dragElement.children[1].style.backgroundColor = 'unset';
        dragElement.children[1].style.color = 'black';
        dragElement.querySelector('.dotes-icon-svg').style.fill = '#c3c3c3';
        dragElement.querySelector('.x-logo-svg').style.fill = '#FFFFFF';
        dragElement.querySelector('.x-logo-svg').style.stroke = '#c3c3c3';
        hoverFunction(dragElement);
        dragElement = null;
    });
};

function hoverFunction (form) {
    form.addEventListener('mouseover', (event) => {
        form.style.backgroundColor = '#FFDC40';
        form.children[1].style.backgroundColor = '#FFDC40';
        form.children[2].children[0].style.fill = '#FFDC40';
    });
    form.addEventListener('mouseout', (event) => {
        form.children[1].style.backgroundColor = '#FFFFFF';
        form.style.backgroundColor = '#FFFFFF';
        form.children[2].children[0].style.fill = '#FFFFFF';
    });
};

containerFields.addEventListener('dragenter', (event) => {
    event.target.parentElement.style['border-top'] = 'solid 3px blueviolet';
    event.preventDefault();
});

containerFields.addEventListener('dragover', (event) => {
    event.preventDefault();
});

containerFields.addEventListener('dragleave', (event) => {
event.target.parentElement.style['border-top'] = '';
});

containerFields.addEventListener('drop', (event) => {
    event.target.parentElement.style['border-top'] = '';
    containerFields.insertBefore(dragElement, event.target.parentElement);
    dragElement.draggable = false ;
});

dragOparaition(form);
dragTrueOrFalse(form);
removeField(xLogo);
sortIcon.addEventListener('click', sortUpAndDown);