let tourId = localStorage.getItem('id');
let tourName = document.querySelector('#nameField');
let tourCountry = document.querySelector('#countryField');
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
    fetch(`http://localhost:8080/api/v1/tour/${id}`)
        .then(res => res.json())
        .then(data => {
            tourName.value = data.description;
            tourCountry.value = data.country;
            tourPrice.value = data.price;
            tourImage.value = data.image;
        })
        .catch(() => {
            document.querySelector('.alert').textContent = 'Something go wrong';
            showAlert();
        });
}

async function updateTour() {
    if (tourName.value && tourCountry.value && tourImage.value && tourPrice.value >= 1) {
        fetch(`http://localhost:8080/api/v1/tour/update/${tourId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'description': tourName.value,
                'country':tourCountry.value,
                'price': tourPrice.value,
                'image': tourImage.value
            })
        })
            .then(res => {
                if (res.status === 200) {
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