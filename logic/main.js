
let tours = [];
let filterArr = [];

function toCreatePage() {
    window.location.href = 'create.html';
}

function toEditPage(id) {
    localStorage.setItem('id', id);
    window.location.href = 'edit.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

function createTourElem(arr) {
    let index = 0;
    arr.forEach(element => {
        document.querySelector('.content').innerHTML += `
        <div class="item">
            <img src="${element.image}" alt="">
            <h2>${element.name}</h2>
            <p>${element.price}$</p>
            <p>${element.country}$</p>
            <div class="actions">  
                <button class="edit" onclick="toEditPage(${element.id})">Edit</button>
                <button class="delete" onclick="deleteTour(${element.id}, ${index++})">Delete</button>
            </div>
        </div>
        `;
    });
} 

async function getTours() {
    fetch('https://632b56441090510116d71181.mockapi.io/tours')
        .then(res => res.json())
        .then(data => { 
            tours = data;
            document.querySelector('.content').replaceChildren();
            createTourElem(tours);
            getTotalPrice(tours);
        })
        .catch(err => console.log(err));
}

function searchTour() {
    document.querySelector('#price').checked = false;
    let search = document.querySelector('#search').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filterArr = tours.filter(element => reg.test(element.name) === true);
        document.querySelector('.content').replaceChildren();
        createTourElem(filterArr);
        getTotalPrice(filterArr);
    } else {
        getTours();
    }
}



function sortPriceAl(arr) {
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.content').replaceChildren();
    createTourElem(arr);
}

function sortByPrice() {
    if (document.querySelector('#price').checked) {
        if (document.querySelector('#search').value) {
            sortPriceAl(filterArr);
        } else {
            sortPriceAl(tours);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getTours();
    }
}

function getTotalPrice(arr) {
    let total = 0;
    console.log(arr);
    arr.forEach(element => {
        total += element.price;
    });
    document.querySelector('#totalPrice').textContent = `${total}$`;
}

async function deleteTour(id, index) {
    fetch(`https://632b56441090510116d71181.mockapi.io/tours${id}`,{
        method: 'DELETE'
    })  
    .then(res => {
        if(res.ok) {
            tours.splice(index, 1);
            document.querySelector('.content').replaceChildren();
            createTourElem(tours);
            getTotalPrice(tours);
        }
    }) 
} 

getTours();