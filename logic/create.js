function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function createTour() {
    let name = document.querySelector('#nameField').value;
    let country = document.querySelector('#countryField').value;
    let price = parseInt(document.querySelector('#priceField').value);
    let image = document.querySelector('#imgField').value;
    if (name && country && image && price >= 1) {
        fetch('http://localhost:8080/api/v1/tour', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'description': name,
                'country': country,
                'price': price,
                'image': image
            })
        })
            .then(res => {
                if (res.status === 200) {
                    name = '';
                    country = '';
                    price = '';
                    image = '';
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            });
    }
}