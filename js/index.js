document.addEventListener('DOMContentLoaded', () => {
    main();
    // test();
});

function test() {
    let str = "gaitober";
    let newStr = decrypt(str);
    console.log({ input: str, output: newStr });
}

function encrypt(str) {
    let arrChars = str.split('');
    arrChars.forEach((item, index) => {
        if (item === 'a') arrChars[index] = 'ai';
        if (item === 'e') arrChars[index] = 'enter';
        if (item === 'i') arrChars[index] = 'imes';
        if (item === 'o') arrChars[index] = 'ober';
        if (item === 'u') arrChars[index] = 'ufat';
    });
    return arrChars.join('');
}

function decrypt(str) {
    return str.replaceAll('ai', 'a')
        .replaceAll('enter', 'e')
        .replaceAll('imes', 'i')
        .replaceAll('ober', 'o')
        .replaceAll('ufat', 'u');
}

function main() {
    let encryptBtn = document.getElementById("encrypt-btn");
    let decryptBtn = document.getElementById("decrypt-btn");
    let copyBtn = document.getElementById("copy-btn");
    let inputText = document.getElementById("inputTextarea");
    let outputText = document.getElementById("encrypted-message");
    let cautionMessageContainer = document.getElementById("caution-message-container");
    let encryptationAllowed = false;

    console.log(outputText);

    inputText.addEventListener('keyup', () => {
        let regex = /^[a-z\s]+$/;
        if (regex.test(inputText.value) || inputText.value === "") {
            document.getElementById("icon-color").style.fill = "#000";
            document.getElementById("warning").style.color = "#000";
            cautionMessageContainer.style.bottom = "0px";
            encryptationAllowed = true;
        } else {
            document.getElementById("icon-color").style.fill = "#f00";
            document.getElementById("warning").style.color = "#f00";
            cautionMessageContainer.style.bottom = "10px";
            encryptationAllowed = false;
        }
    });


    encryptBtn.addEventListener('click', () => {
        if (!encryptationAllowed) {
            cautionMessageContainer.classList.add("shake-animate");
            setTimeout(() => {
                cautionMessageContainer.classList.remove("shake-animate");
            }, 300)
            return;
        }
        if (inputText.value !== "") {
            document.getElementById("no-messages-found-container").classList.add("hide")
            document.getElementById("encrypted-message-container").classList.remove("hide");

            outputText.innerText = encrypt(inputText.value);
        } else {
            document.getElementById("no-messages-found-container").classList.remove("hide")
            document.getElementById("encrypted-message-container").classList.add("hide");
        }
    });

    decryptBtn.addEventListener('click', () => {
        if (!encryptationAllowed) {
            cautionMessageContainer.classList.add("shake-animate");
            setTimeout(() => {
                cautionMessageContainer.classList.remove("shake-animate");
            }, 300)
            return;
        }
        if (inputText.value !== "" && encryptationAllowed) {
            document.getElementById("no-messages-found-container").classList.add("hide")
            document.getElementById("encrypted-message-container").classList.remove("hide");

            outputText.innerHTML = decrypt(inputText.value);
        } else {
            document.getElementById("no-messages-found-container").classList.remove("hide")
            document.getElementById("encrypted-message-container").classList.add("hide");
        }
    });

    copyBtn.addEventListener('click', () => {
        let aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById("encrypted-message").innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    });
}