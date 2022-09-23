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
    let image = parseInt(document.querySelector('#imgField').value);
    console.log(typeof(price));
    if (name && country && price && image >= 1) {
        fetch('https://632b56441090510116d71181.mockapi.io/tours', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'country': country,
                'price': price,
                'image': image
            })
        })
            .then(res => {
                if (res.ok) {
                    name = '';
                    country = '';
                    price = 1;
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