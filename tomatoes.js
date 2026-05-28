// Wrap in a function or block to prevent variable name conflicts
(function() {
    const buttons = document.querySelectorAll(".img-btn");
    const thumbsContainer = document.getElementById('veg-thumbs');
    let isClearing = false;
    let clearIntervalId = null;

    console.log('Tomatoes script initialized. Found buttons:', buttons.length);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const imgSrc = button.dataset.image;
            console.log('Button clicked:', button.id, 'Image:', imgSrc);

            // 1. Handle Poisonous Potato (Clearing logic)
            if (button.id === 'poison') {
                if (!thumbsContainer) return;
                if (isClearing) {
                    console.log('Already clearing, ignoring click');
                    return;
                }
                
                const totalItems = thumbsContainer.children.length;
                if (totalItems === 0) {
                    console.log('No thumbnails to clear');
                    return;
                }

                isClearing = true;
                const totalDuration = 6000; // 6 seconds
                const intervalMs = totalDuration / totalItems;
                
                let removedCount = 0;
                clearIntervalId = setInterval(() => {
                    if (thumbsContainer.children.length > 0) {
                        thumbsContainer.removeChild(thumbsContainer.children[0]);
                        removedCount++;
                    }
                    
                    if (removedCount >= totalItems) {
                        clearInterval(clearIntervalId);
                        clearIntervalId = null;
                        isClearing = false;
                        console.log('Finished clearing thumbnails');
                    }
                }, intervalMs);
                return; 
            }

            // 2. Handle Vegetable Buttons (Adding thumbnails)
            const vegIds = ['tom', 'corn', 'broco'];
            if (vegIds.includes(button.id)) {
                if (isClearing || !thumbsContainer) return;

                // Capacity logic: limit to 5 rows of 50px items
                const itemWidth = 50;
                const gap = 5;
                const containerWidth = Math.max(thumbsContainer.clientWidth, 200);
                let itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
                if (itemsPerRow < 1) itemsPerRow = 1;
                const maxItems = itemsPerRow * 5;

                if (thumbsContainer.children.length >= maxItems) {
                    console.log('Reached max vegetable capacity');
                    return;
                }

                // Create and add the thumbnail
                const thumb = document.createElement('img');
                thumb.className = 'veg-thumb';
                thumb.alt = button.id + ' thumbnail';
                // Path fix: goes up from 'html code' to 'moi game', then into 'images'
                thumb.src = `https://navygreenn.github.io/Gamehub/${imgSrc}`;
                thumbsContainer.appendChild(thumb);
            }
        });
    });
})();
