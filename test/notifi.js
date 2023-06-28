const button = document.querySelector("button")

button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            const notifi = new Notification("test! test! test!", {
                body: "this is more text",
                data: {hallo: "world"},
                icon: "logob.svg"
            })
        }
    })
})