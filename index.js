document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'image'
    const slides = document.querySelectorAll('.image');

    // Select the element with the class 'serial-no' and 'imageText' to display slide number and Image text
    const slNo = document.querySelector('.serial-no');
    const imageText = document.querySelector('.imageText');

    // Initialize variables
    let slidesIndex = 0; // Current index of the displayed slide
    let length = 1; // Direction of automatic sliding (1 for next, -1 for previous)
    let interValid = null; // Interval ID for controlling automatic sliding

    // Initialize the slider
    initialSlide();

    // Start automatic sliding
    autoNextSlide();

    // Function to handle automatic sliding
    function autoNextSlide() {
        interValid = setInterval(() => {
            // Check if automatic sliding is within the bounds of slides
            if (length > 0 && length < slides.length) {
                showSlide(1); // Show the next slide
            } else {
                showSlide(-1); // Reset to the first slide
            }
        }, 3400); // Set interval to 3.4 seconds
    }

    function getImageTitle(index) {
        // Check if the slide at the given index is defined
        if (slides[index]) {
            // Check if the title attribute exists
            let text = slides[index].getAttribute('title');
            imageText.textContent = text ? text : ""; // If the title exists, set it; otherwise, set an empty string
        }
    }

    // Function to set up the initial state of the slider
    function initialSlide() {
        slides[slidesIndex].classList.add('displaySlide'); // Show the first slide
        slNo.textContent = `${slidesIndex + 1} / ${slides.length}`; // Update slide number display
        getImageTitle(slidesIndex);
    }

    // Event listener for the left button (previous slide)
    document.querySelector('.left').addEventListener('click', function() {
        clearInterval(interValid); // Stop automatic sliding
        showSlide(-1); // Show the previous slide
    });

    // Event listener for the right button (next slide)
    document.querySelector('.right').addEventListener('click', function() {
        showSlide(1); // Show the next slide
    });

    // Function to update the displayed slide
    function showSlide(nextIndex) {
        slides[slidesIndex].classList.remove('displaySlide'); // Hide the current slide
        slidesIndex = (slidesIndex + nextIndex + slides.length) % slides.length; // Update the index
        slides[slidesIndex].classList.add('displaySlide'); // Show the new slide
        slNo.textContent = `${slidesIndex + 1} / ${slides.length}`; // Update slide number display
        getImageTitle(slidesIndex); // Fetch the title for the updated index
    }
});
