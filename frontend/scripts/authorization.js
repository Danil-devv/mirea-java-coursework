function authorizeUser() {
    // Получаем значения полей ввода
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(username);
    console.log(password);

    let user = {
        "username": username,
        "password": password,
    }

    fetch("http://localhost:8080/api/auth/sign-in", {
        method: "POST",
        headers: {
            "User-Agent": "IntelliJ HTTP Client/IntelliJ IDEA 2024.1",
            "Accept-Encoding": "Access-Control-Request-Method",
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function(response){
            if (response.status !== 200) {
                return "error"
            }
            return response.json();
        })
        .then(function (p) {
            if (p === "error") {
                alert("Неверный логин или пароль!")
            } else {
                sessionStorage.setItem("token", p["token"])
                sessionStorage.setItem("username", username)
                window.location.href = "home.html";
            }
        });
}
