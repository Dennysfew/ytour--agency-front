let tourId = localStorage.getItem('id');
let tourName = document.querySelector('#nameField');
let tourCountry = document.querySelector('#nameCountry');
let tourPrice = document.querySelector('#priceField');
let tourImage = document.querySelector('#imgField');

function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getTour(id) {
    fetch(`https://632b56441090510116d71181.mockapi.io/tours/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            tourName.value = data.name;
            tourCountry.value = data.country;
            tourPrice.value = data.price;
            tourImage.value = data.image;
        })
        .catch((err) => {
            document.querySelector('.alert').textContent = `${err}`;
            showAlert();
        });
}

async function updateTour() {
    if (tourName.value && tourPrice.value && tourImage.value && tourPrice.value >= 1) {
        fetch(`https://632b56441090510116d71181.mockapi.io/tours/${tourId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': tourName.value,
                'country': tourCountry.value,
                'price': parseInt(tourPrice.value),
                'image': tourImage.value
            })
        })
            .then(res => {
                if (res.ok) {
                    tourName.value = '';
                    tourCountry.value = '';
                    tourPrice.value = '';
                    tourImage.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                } else {
                    showAlert();
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            })
    }
}

getTour(tourId);