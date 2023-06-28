const button = document.querySelector("button");

button.addEventListener("click", () => {
    if ("Notification" in window) {
        // Ondersteuning voor desktopmeldingen (Mac)
        Notification.requestPermission().then(perm => {
            if (perm === "granted") {
                const notifi = new Notification("test! test! test!", {
                    body: "this is more text",
                    data: {hallo: "world"},
                    icon: "logob.svg"
                });
            }
        });
    } else if ("PushManager" in window) {
        // Ondersteuning voor web-pushmeldingen (iPhone)
        // Implementeer hier het Web Push-protocol en gebruik een service worker
        // om meldingen naar iPhones te sturen.
    } else {
        // Meldingen worden niet ondersteund
        console.log("Meldingen worden niet ondersteund in deze browser.");
    }
});
