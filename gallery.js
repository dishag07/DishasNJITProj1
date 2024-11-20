let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // Start the timer for the slideshow
  startTimer();

  // Toggle details visibility and rotation classes
  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90').toggleClass('rot270');
    $('.details').slideToggle();
  });

  // Show the next photo on "Next Photo" button click
  $('#nextPhoto').on('click', function () {
    showNextPhoto();
  });

  // Show the previous photo on "Previous Photo" button click
  $('#prevPhoto').on('click', function () {
    showPrevPhoto();
  });

  // Fetch JSON data to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    type: "GET",
    url: mUrl,
    dataType: "json",
    success: function (data) {
      mImages = data.images;
      console.log(mImages); // Debugging: log fetched images
      swapPhoto();
    },
    error: function (err) {
      console.error("Failed to fetch JSON", err);
    },
  });
}

// Function to swap and display the current photo
function swapPhoto() {
  if (mImages.length === 0) return; // Exit if no images loaded

  // Update the #photo element's src attribute
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath);

  // Update details for the current image
  $('.name').text(`Name: ${mImages[mCurrentIndex].name}`);
  $('.uglvl').text(`Ugly Level: ${mImages[mCurrentIndex].uglvl || "N/A"}`);
  $('.actug').text(`Actually Ugly: ${mImages[mCurrentIndex].actug || "N/A"}`);
}

// Advances to the next photo, loops to the first photo if at the end
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0; // Loop back to the first image
  }
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if at the start
function showPrevPhoto() {
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1; // Loop to the last image
  }
  swapPhoto();
}

// Function to start the timer for automatic slideshow
function startTimer() {
  setInterval(function () {
    showNextPhoto();
    console.log("Timer tick!");
  }, mWaitTime);
}
