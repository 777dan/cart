const wrapper = document.querySelector('#wrapper');

function loadGoods() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'goods.json', true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState != 4) return;
        if (xhttp.status != 200) {
            alert(xhttp.status + ': ' + xhttp.statusText);
        } else {
            let goods = JSON.parse(xhttp.responseText);
            for (let i = 0; i < goods.length; i++) {
                wrapper.innerHTML += `<div class="item_box">
<h3 class="item_title">${goods[i].name}</h3>
<p>Цена: <span class="item_price">${goods[i].price}</span>$</p>
<button class="add_item" data-id="${i}">+</button>
<button class="del_item" data-id="${i}">-</button>
</div>`;
            }
        }
    }
}

loadGoods();