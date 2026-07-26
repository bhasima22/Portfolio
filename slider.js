/*
    Image Slider Library
    Vanilla JavaScript
*/

class ImageSlider {

    constructor(slider) {

        this.slider = slider;

        this.track = slider.querySelector(".slider-track");

        this.slides = Array.from(
            slider.querySelectorAll(".slide")
        );

        this.nextButton =
            slider.querySelector(".next");

        this.previousButton =
            slider.querySelector(".previous");

        this.dotsContainer =
            slider.querySelector(".slider-dots");

        this.currentIndex = 0;

        this.slideWidth = 100;

        this.isAnimating = false;

        this.createDots();

        this.addEventListeners();

        this.updateSlider();
    }


    /*
        Dynamically create indicator dots
    */

    createDots() {

        this.slides.forEach((slide, index) => {

            const dot =
                document.createElement("button");

            dot.classList.add("dot");

            dot.setAttribute(
                "aria-label",
                `Go to slide ${index + 1}`
            );

            dot.addEventListener(
                "click",
                () => {

                    this.goToSlide(index);

                }
            );

            this.dotsContainer.appendChild(dot);

        });

        this.dots =
            Array.from(
                this.dotsContainer.querySelectorAll(".dot")
            );
    }


    /*
        Add event listeners
    */

    addEventListeners() {

        this.nextButton.addEventListener(
            "click",
            () => {

                this.nextSlide();

            }
        );


        this.previousButton.addEventListener(
            "click",
            () => {

                this.previousSlide();

            }
        );


        this.track.addEventListener(
            "transitionend",
            () => {

                this.handleBoundaryLoop();

            }
        );

    }


    /*
        Move to the next slide
    */

    nextSlide() {

        if (this.isAnimating) {
            return;
        }

        this.currentIndex++;

        this.updateSlider();

    }


    /*
        Move to the previous slide
    */

    previousSlide() {

        if (this.isAnimating) {
            return;
        }

        this.currentIndex--;

        this.updateSlider();

    }


    /*
        Move directly to a selected slide
    */

    goToSlide(index) {

        if (this.isAnimating) {
            return;
        }

        this.currentIndex = index;

        this.updateSlider();

    }


    /*
        Update slider position
    */

    updateSlider() {

        this.isAnimating = true;

        this.track.style.transform =
            `translateX(-${this.currentIndex * this.slideWidth}%)`;

        this.updateActiveDot();

    }


    /*
        Update active indicator dot
    */

    updateActiveDot() {

        const actualIndex =
            this.getActualIndex();

        this.dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === actualIndex
                );

            }
        );

    }


    /*
        Get the correct index for the active dot
    */

    getActualIndex() {

        if (
            this.currentIndex >=
            this.slides.length
        ) {

            return 0;

        }

        if (
            this.currentIndex < 0
        ) {

            return this.slides.length - 1;

        }

        return this.currentIndex;

    }


    /*
        Create seamless boundary looping
    */

    handleBoundaryLoop() {

        this.isAnimating = false;


        if (
            this.currentIndex >=
            this.slides.length
        ) {

            this.track.style.transition =
                "none";

            this.currentIndex = 0;

            this.track.style.transform =
                "translateX(0%)";

            this.updateActiveDot();

            requestAnimationFrame(
                () => {

                    this.track.style.transition =
                        "transform 0.5s ease-in-out";

                }
            );

        }


        if (
            this.currentIndex < 0
        ) {

            this.track.style.transition =
                "none";

            this.currentIndex =
                this.slides.length - 1;

            this.track.style.transform =
                `translateX(-${this.currentIndex * this.slideWidth}%)`;

            this.updateActiveDot();

            requestAnimationFrame(
                () => {

                    this.track.style.transition =
                        "transform 0.5s ease-in-out";

                }
            );

        }

    }

}


/*
    Initialise the slider after the page loads
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const slider =
            document.querySelector(".image-slider");

        if (slider) {

            new ImageSlider(slider);

        }

    }
);
