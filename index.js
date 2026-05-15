// 1. Keep your initialization wrapped properly
function init() {
    console.log('initializing script');
    const buttons = document.querySelectorAll(".img-btn");
    const image = document.getElementById("displayImage");
    let isClearing = false;
    let clearIntervalId = null;

    // List of available images for the "random" button
    const imagesList = [
        'blob.jpeg',
        'froggit.jpeg',
        'sf.jpeg',
        'yoo_eel.jpeg',
        'poly.jpg',
        'tri.jpg'
    ];

    // Create video element once and add to DOM
    let video = document.createElement('video');
    video.id = "displayVideo";
    video.style.display = 'none';
    video.style.maxWidth = "360px";
    video.style.marginTop = "12px";
    video.controls = true;
    document.body.appendChild(video);

    if (image) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                let imgSrc = button.dataset.image;

                if (imgSrc === "random") {
                    imgSrc = imagesList[Math.floor(Math.random() * imagesList.length)];
                }

                // Handle the main creature display (Main.html logic)
                if (imgSrc.endsWith('.mov') || imgSrc.endsWith('.mp4')) {
                    image.style.display = 'none';
                    video.src = `../images/${imgSrc}`;
                    video.style.display = "block";
                } else {
                    video.style.display = 'none';
                    image.src = imgSrc ;
                    image.style.display = "block";
                }
            });
        });
    }
}

// 2. Keep your Dev Alignment Logic (This is what you likely want to save!)
function alignDevHorizWithH1() {
    const dev = document.getElementById('dev');
    const h1 = document.querySelector('h1');
    if (!dev || !h1) return;

    dev.style.transform = 'none';
    const devRect = dev.getBoundingClientRect();
    const h1Rect = h1.getBoundingClientRect();
    const dx = h1Rect.left - devRect.left;

    if (!dev.dataset.origMarginLeft) {
        const comp = window.getComputedStyle(dev);
        dev.dataset.origMarginLeft = parseFloat(comp.marginLeft) || 0;
    }

    const orig = parseFloat(dev.dataset.origMarginLeft) || 0;
    dev.style.marginLeft = `${orig + dx}px`;
}

// 3. Keep your Execution Listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.requestAnimationFrame(alignDevHorizWithH1);
window.addEventListener('resize', () => window.requestAnimationFrame(alignDevHorizWithH1));
