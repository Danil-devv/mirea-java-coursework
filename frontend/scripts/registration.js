function registerUser() {
    // Получаем значения полей ввода
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log(username);
    console.log(email);
    console.log(password);

    let user = {
        "username": username,
        "password": password,
        "email": email
    }

    fetch("http://localhost:8080/api/auth/sign-up", {
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
                alert("Ошибка регистрации! Возможно, неверный ввод")
            } else {
                sessionStorage.setItem("token", p["token"])
                sessionStorage.setItem("username", username)
                sessionStorage.setItem("email", email)
                window.location.href = "registration.html";
                console.log("response: ", p.toString())
            }
        });
}

function unloginUser() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("email")
    window.location.href = "registration.html";
}

window.onload = function () {
    let reg = document.querySelector("#registration-field");
    let profileData = document.querySelector("#profile-data");

    if (!!sessionStorage["token"] || !!sessionStorage["username"]) {
        profileData.innerHTML = `<div style="display: flex;align-items: center; justify-content: center;flex-direction: column">
        <h2>Профиль</h2>
        <br>
        <div>Логин аккаунта: ${sessionStorage.getItem("username")}</div>
        <br>
        <button type="button" onClick="unloginUser()">Выйти из аккаунта</button>
    </div>`
    } else {
        reg.innerHTML = `<div style="display: flex;align-items: center; justify-content: center;flex-direction: column">
        <h2>Регистрация</h2>
        <form>
            <label htmlFor="username">Имя пользователя:</label><br/>
            <input type="text" id="username" name="username"/><br/><br/>
            <label htmlFor="email">Email:</label><br/>
            <input type="email" id="email" name="email"/><br/><br/>
            <label htmlFor="password">Пароль:</label><br/>
            <input type="password" id="password" name="password"/><br/><br/>
            <button type="button" onClick="registerUser()">Зарегистрироваться</button>
        </form>
        <br/>
        <div>Уже есть аккаунт? <a href="authorization.html">Войти в аккаут</a></div>
    </div>`
    }
}
