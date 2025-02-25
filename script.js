const body = document.body;
const kartochki = document.getElementById('kartochki');
const searched = document.getElementById('search');
const btn = document.getElementById('btn');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        function generator(data){
            kartochki.innerHTML = '';
            data.forEach(element => {
                const card = document.createElement('div');
                card.classList.add('kartochka');
                card.innerHTML = `
                    <b>${element.name}</b>
                    <span class="span1">🤵</span>
                    <span class="span2">📧 ${element.email}</span>
                    <span class="span2">📞 ${element.phone}</span>
                    <span class="span2">🏠 ${element.address.city}, ${element.address.street}</span>
                `
                kartochki.appendChild(card)
            });
        }
        generator(data)

        searched.addEventListener('input', () => {
            const searchValue = searched.value.toLowerCase().trim();
            const searchedData = data.filter(dats =>
                dats.name.toLowerCase().includes(searchValue)
            );
        
            generator(searchedData);
        
            const kart = Array.from(document.querySelectorAll('.kartochka'));
            if (btn.textContent === '☀️ Light Mode') {
                kart.forEach(card => {
                    card.style.backgroundColor = 'rgb(41, 40, 40)';
                    card.style.color = 'white';
                    card.style.boxShadow = 'none';
                });
            } else {
                kart.forEach(card => {
                    card.style.backgroundColor = 'white';
                    card.style.color = 'black';
                    card.style.boxShadow = '';
                });
            }
        });
        
        
    });



function daynight() {
    const kart = Array.from(document.querySelectorAll('.kartochka')); // Нужно получить актуальные карточки
    if (btn.textContent === '🌙 Dark Mode') {
        body.style.backgroundColor = 'rgb(74, 74, 74)';
        btn.textContent = '☀️ Light Mode';
        btn.style.color = 'black';
        btn.style.backgroundColor = 'white';
        kart.forEach(card => {
            card.style.backgroundColor = 'rgb(41, 40, 40)';
            card.style.color = 'white';
            card.style.boxShadow = 'none';
        });
    } else {
        body.style.backgroundColor = 'white';
        btn.textContent = '🌙 Dark Mode';
        btn.style.color = 'white';
        btn.style.backgroundColor = 'black';
        kart.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.color = 'black';
            card.style.boxShadow = '';
        });
    }
}

btn.addEventListener('click', daynight);