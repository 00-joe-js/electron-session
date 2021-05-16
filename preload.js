const fs = require("fs").promises;
const exec = require('child_process').execSync;

const {desktopCapturer} = require('electron');

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

    {

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
    }

    // desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    //     console.log(sources);
    //     for (const source of sources) {
    //       if (source.name === 'Screen 2') {
    //         try {
    //           const stream = await navigator.mediaDevices.getUserMedia({
    //             audio: false,
    //             video: {
    //               mandatory: {
    //                 chromeMediaSource: 'desktop',
    //                 chromeMediaSourceId: source.id,
    //                 minWidth: 1280,
    //                 maxWidth: 1280,
    //                 minHeight: 720,
    //                 maxHeight: 720
    //               }
    //             }
    //           })
    //           handleStream(stream)
    //         } catch (e) {
    //           handleError(e)
    //         }
    //         return
    //       }
    //     }
    //   })
      
    //   function handleStream (stream) {
    //     const video = document.querySelector('video')
    //     video.srcObject = stream
    //     video.onloadedmetadata = (e) => video.play()
    //   }
      
    //   function handleError (e) {
    //     console.log(e)
    //   }

})

// ELECTRON = DOM + Node.js