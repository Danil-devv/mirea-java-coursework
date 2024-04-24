let slideIndex = 1;

let products = []
let product_info = []

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

fetch("http://localhost:8080/api/products", {
    method: "GET",
    headers: {
        "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
        "Accept-Encoding": "Access-Control-Request-Method",
        "Accept": "*/*",
        "content-length": 0,
        // "Authorization": "Bearer " + authToken
    },
})
    .then(function (response) {
        return response.json();
    })
    .then(function (p) {

        // iterate localStorage
        for (let i = 0; i < p.length; i++) {
            let product = p[i]
            products.push(product)
        }

        // TODO: заменить на GET /api/products/descriptions
        fetch("http://localhost:8080/api/products/descriptions", {
            method: "GET",
            headers: {
                "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
                "Accept-Encoding": "Access-Control-Request-Method",
                "Accept": "*/*",
                "content-length": 0,
                // "Authorization": "Bearer " + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (p) {

                // iterate localStorage
                for (let i = 0; i < p.length; i++) {
                    p[i]["images"] = p[i]["images"].split(";");
                    product_info.push(p[i])
                }

                let search = location.search.substring(1);
                id = Number(JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
                    return key === "" ? value : decodeURIComponent(value)
                }).id)

                let placeholder = document.querySelector("#data-output");
                let out = "";


                out += `<div class="product-container">
                    <!-- carousel -->
                    <div class="carousel">
                
                        <!-- Slideshow container -->
                        <div class="slideshow-container">
                <!-- Full-width images with number and caption text -->`

                                for (let i = 0; i < product_info[id].images.length; i++) {
                                    out += `<div class="mySlides fade">
                                <img src="${product_info[id].images[i]}" class="carousel-image">
                            </div>`
                                }
                                out += `<!-- Full-width images with number and caption text -->`

                                out +=  `<!-- Next and previous buttons -->
                            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                            <a class="next" onclick="plusSlides(1)">&#10095;</a>
                            <!-- Next and previous buttons -->
                            </div>
                            <br>
                            <!-- Slideshow container -->`

                                out += `<!-- The dots/circles -->
                        <div style="text-align:center">`
                                for (let i = 0; i < product_info[id].images.length; i++) {
                                    out += `<span class="dot" onclick="currentSlide(${i+1})"></span>`
                                }
                                out += `</div>
                        <!-- The dots/circles -->`


                                out += `<!-- rating -->
                                    <div class="rating-result">`
                                for (let i = 1; i <= product_info[id].rating; i++) {
                                    out += `<span class="active"></span>`
                                }

                                for (let i = 0; i < 5 - product_info[id].rating; i++) {
                                    out += `<span></span>`
                                }

                                out += `
                            <div style="">${product_info[id].rating}</div>
                        </div>
                        <!-- rating -->
                    
                    </div>
                    <!-- carousel -->
                
                    <!-- carousel text -->
                    <div class="carousel-text">
                        <h3 class="card-titel text-center">${products[id].name}</h3>
                        <p class="card-text text-center">$${products[id].price}</p>
                        <div>${product_info[id].description}</div>
                    </div>
                    <!-- carousel text -->
                </div>`;

                placeholder.innerHTML = out;
                showSlides(slideIndex);
            });
    });

