const fs = require("fs").promises;
const exec = require('child_process').execSync;

window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]) // <--
    }


    // Image gallery code below.
    // -----

    const directoryInput = document.querySelector("#what-is-your-photo-directory");
    const imagesContainer = document.querySelector("#images-container");

    directoryInput.addEventListener("input", async (event) => {
        const possibleDirectoryPath = event.target.value;
        try {
            const directoryContents = await fs.readdir(possibleDirectoryPath);
            console.log(exec("ls").toString());
            const onlyImages = directoryContents.filter(path => {
                return path.includes(".jpg") || path.includes(".png");
            });
            imagesContainer.innerHTML = "";
            onlyImages.forEach((imagePath) => {
                const img = document.createElement("img");
                img.src = `${possibleDirectoryPath}/${imagePath}`;
                img.style.width = "200px";
                imagesContainer.appendChild(img);
            });
        } catch (e) {
            console.log(`${possibleDirectoryPath} not a directory?`);
            console.log(e);
        }
        
    });

})

// ELECTRON = DOM + Node.js