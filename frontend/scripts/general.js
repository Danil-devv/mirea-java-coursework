let data = []

function addToSessionStorageCart(id) {
    let product;
    if (sessionStorage.getItem(String(id)) === null) {
        product = {id: id, name: data[id].name, price: data[id].price, image: data[id].image, quantity: 1}
        sessionStorage.setItem(String(id), JSON.stringify(product))
    } else {
        product = JSON.parse(sessionStorage.getItem(String(id)))
        product.quantity++
        sessionStorage.setItem(String(id), JSON.stringify(product))
    }
}

function decrementFromSessionCart(id) {
    let product;
    if (sessionStorage.getItem(String(id)) === null) {
        return
    }
    product = JSON.parse(sessionStorage.getItem(String(id)))
    product.quantity--
    if (product.quantity <= 0) {
        sessionStorage.removeItem(String(id))
    } else {
        sessionStorage.setItem(String(id), JSON.stringify(product))
    }
}

function updateCountOfProductsInHeader() {
    let placeholder = document.querySelector("#header-product-count");
    let total = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        // set iteration key name
        let key = sessionStorage.key(i);
        if (key === "token" || key === "username" || key === "email") {
            continue;
        }

        // use key name to retrieve the corresponding value
        let product = JSON.parse(sessionStorage.getItem(key));
        total += product.quantity;
    }
    placeholder.innerHTML = `${total}`;
}

async function serviceDecrementFromCart(id) {
    await fetch("http://localhost:8080/api/cart/" + id.toString(), {
        method: "DELETE",
        headers: {
            "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
            "Accept-Encoding": "Access-Control-Request-Method",
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage["token"],
        },
    }).then(function (response) {
        if (response.status !== 200) {
            return "error"
        }
        return ""
    }).then(function (p) {
        if (p === "error") {
            alert("Не удалось добавить товар в корзину")
        } else {
            decrementFromSessionCart(id - 1);
            // updating count of products in header
            updateCountOfProductsInHeader();
            console.log("response: ", p.toString())
        }
    });
}

async function serviceAddToCart(id) {
    await fetch("http://localhost:8080/api/cart/" + id.toString(), {
        method: "PUT",
        headers: {
            "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
            "Accept-Encoding": "Access-Control-Request-Method",
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage["token"],
        },
    }).then(function (response) {
        if (response.status !== 200) {
            return "error"
        }
        return ""
    }).then(function (p) {
        if (p === "error") {
            alert("Не удалось добавить товар в корзину")
        } else {
            addToSessionStorageCart(id - 1);
            // updating count of products in header
            updateCountOfProductsInHeader();
            console.log("response: ", p.toString())
        }
    });
}

function clearSessionStorage() {
    let token = sessionStorage["token"]
    let username = sessionStorage["username"]
    let email = sessionStorage["email"]
    sessionStorage.clear();
    if (!(token == null)) {
        sessionStorage["token"] = token
    }
    if (!(username == null)) {
        sessionStorage["username"] = username
    }
    if (!(email == null)) {
        sessionStorage["email"] = email
    }
}

async function loadCart() {
    clearSessionStorage();
    if (sessionStorage["token"] == null) {
        return;
    }
    await fetch("http://localhost:8080/api/cart", {
        method: "GET",
        headers: {
            "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
            "Accept-Encoding": "Access-Control-Request-Method",
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage["token"],
        },
    }).then(function (response) {
        if (response.status !== 200) {
            return "error"
        }
        return response.json();
    }).then(function (p) {
        if (p === "error") {
            alert("Не удалось загрузить корзину")
        } else {
            for (let i = 0; i < p["cartResponses"].length; i++) {
                let id = p["cartResponses"][i]["productResponse"]["id"] - 1;
                let count = p["cartResponses"][i]["count"]
                console.log(id + ": " + count)
                for (let j = 0; j < count; j++) {
                    addToSessionStorageCart(id)
                }
            }
        }
    });
}

async function loadData() {
    data = []

    await fetch("http://localhost:8080/api/products", {
        method: "GET",
        headers: {
            "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
            "Accept-Encoding": "Access-Control-Request-Method",
            "Accept": "*/*",
            "content-length": 0,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (products) {
        let product;
        for (let i = 0; i < products.length; i++) {
            product = products[i];
            data.push(product);
        }
    })
}

function updateHeaderCart() {
    // updating count of products in header
    let placeholder = document.querySelector("#header-product-count");
    let total = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        // set iteration key name
        let key = sessionStorage.key(i);
        if (key === "token" || key === "username" || key === "email") {
            continue;
        }


        // use key name to retrieve the corresponding value
        let product = JSON.parse(sessionStorage.getItem(key));
        total += product.quantity;
    }
    placeholder.innerHTML = `${total}`;
}

window.addEventListener("load", async function () {
    await loadData();
    await loadCart();
    updateHeaderCart();
})