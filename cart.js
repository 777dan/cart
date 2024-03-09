window.onload = () => {

    let itemBox = document.querySelectorAll(".item_box");
    let cartCont = document.getElementById("cart_content");

    function setCartData(o) {
        localStorage.setItem("cart", JSON.stringify(o));
    }
    function getCartData() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    function addToCart(e) {
        let button = e.target;
        button.disabled = true;
        let cartData = getCartData() || {};
        let parentBox = button.parentNode;
        let itemId = button.getAttribute("data-id");
        let itemTitle = parentBox.querySelector(".item_title").innerHTML;
        let itemPrice = parentBox.querySelector(".item_price").innerHTML;
        console.log(cartData);
        if (cartData.hasOwnProperty(itemId)) {
            cartData[itemId][2] += 1;
        } else {
            cartData[itemId] = [itemTitle, itemPrice, 1];
        }
        setCartData(cartData);
        button.disabled = false;
        // cartCont.innerHTML += "Product added to cart";
        openCart();
    }

    function delFromCart(e) {
        let button = e.target;
        button.disabled = true;
        let cartData = getCartData() || {};
        let itemId = button.getAttribute("data-id");
        console.log(cartData);
        if (cartData.hasOwnProperty(itemId)) {
            if (cartData[itemId][2] - 1 !== 0) {
                cartData[itemId][2] -= 1;
            } else {
                delete cartData[itemId];
            }
        }

        setCartData(cartData);
        button.disabled = false;
        // cartCont.innerHTML += "Product removed from cart";
        openCart();
    }

    function openCart(e) {
        let cartData = getCartData();
        if (cartData !== null) {
            let cardTable = "";
            cardTable =
                '<table class="shopping_list"><tr><th>Name</th><th>Price</th><th>Quantity</th></tr>';
            let totalCost = 0;
            for (let items in cartData) {
                cardTable += "<tr>";
                for (let i = 0; i < cartData[items].length; i++) {
                    if (i === 1) {
                        cardTable += "<td>" + Number(cartData[items][i]) * cartData[items][2] + "</td>";
                        totalCost += Number(cartData[items][i]) * cartData[items][2];
                    } else {
                        cardTable += "<td>" + cartData[items][i] + "</td>";
                    }
                }
                cardTable += "</tr>";
            }
            cardTable += "<table>";
            cartCont.innerHTML = cardTable;
            cartCont.innerHTML += `Total cost: ${totalCost}$`;
        } else {
            cartCont.innerHTML = "The cart is empty";
        }
    }

    openCart();

    function clearCart(e) {
        localStorage.removeItem("cart");
        cartCont.innerHTML = "The cart was emtied";
    }

    for (let i = 0; i < itemBox.length; i++) {
        itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
        itemBox[i].querySelector(".del_item").addEventListener("click", delFromCart);
    }

    document.getElementById("clear_cart").addEventListener("click", clearCart);

};