const pw_1 = document.getElementById("pw-1")
const pw_2 = document.getElementById("pw-2")
const pw_3 = document.getElementById("pw-3")
const pw_4 = document.getElementById("pw-4")
const uuid = document.getElementById("qr-reader-results")
const uuid_fail = document.getElementById("fill-out-uuid")
const pin_fail = document.getElementById("fill-out-pin")
const btn = document.getElementById("submit-button")

let pin = []

pw_1.addEventListener("input", () => {
    if (/^\d{1}$/g.test(pw_1.value)) {
        pin[0] = pw_1.value
        pw_1.classList.replace("wrong-input", "focus:border-blue-600")
        pw_1.value = "*"
        pw_2.focus()
    } else {
        // TODO: CHANGE COLOR OF THE BOX
        pw_1.classList.replace("focus:border-blue-600", "wrong-input")
        pin[0] = ""
    }

})

pw_2.addEventListener("input", () => {
    if (/^\d{1}$/g.test(pw_2.value)) {
        pin[1] = pw_2.value
        pw_2.classList.replace("wrong-input", "focus:border-blue-600")
        pw_2.value = "*"
        pw_3.focus()
    } else {
        // TODO: CHANGE COLOR OF THE BOX
        pw_2.classList.replace("focus:border-blue-600", "wrong-input")
        pin[1] = ""
    }

})

pw_3.addEventListener("input", () => {
    if (/^\d{1}$/g.test(pw_3.value)) {
        pin[2] = pw_3.value
        pw_3.classList.replace("wrong-input", "focus:border-blue-600")
        pw_3.value = "*"
        pw_4.focus()
    } else {
        console.log("wrong")
        pw_3.classList.replace("focus:border-blue-600", "wrong-input")
        pin[2] = ""
    }

})

pw_4.addEventListener("input", () => {
    if (/^\d{1}$/g.test(pw_4.value)) {
        pin[3] = pw_4.value
        pw_4.classList.replace("wrong-input", "focus:border-blue-600")
        pw_4.value = "*"
        btn.focus()
    } else {
        // TODO: CHANGE COLOR OF THE BOX
        pw_4.classList.replace("focus:border-blue-600", "wrong-input")
        pin[3] = "-"
    }

})


btn.addEventListener("click", async () => {
    if (!uuid_fail.classList.contains("hidden")) {
        uuid_fail.classList.add("hidden")
    }
    if (!pin_fail.classList.contains("hidden")) {
        pin_fail.classList.add("hidden")
    }

    if (/^\d{4}$/.test(pin.join("")) && !(uuid.value.trim() == "")) {
        await fetch('/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: uuid.value.toString(),
                pin: pin.join('').toString()
            })
        })
            .then(response => response.text())
            .then(html => {
                // Replace the current page with the new HTML
                document.open();
                document.write(html);
                document.close();
            })
            .catch(error => console.error(error))
    }

    if (uuid.value.trim() == "" && uuid_fail.classList.contains("hidden")) {
        uuid_fail.classList.remove("hidden")
    }
    // TODO: show that the pin is wrong
    if (!(/^\d{4}$/.test(pin.join(""))) && pin_fail.classList.contains("hidden")) {
        pin_fail.classList.remove("hidden")
    }


})

