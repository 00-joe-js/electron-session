window.addEventListener('DOMContentLoaded', () => {
    console.log(window);
    const h1 = document.createElement("h1");
    document.body.appendChild(h1);
    h1.innerText = typeof window.fetch;
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]) // <--
    }
})

// ELECTRON = DOM + Node.js