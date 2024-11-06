let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold gallery images
const mUrl = 'https://your-json-url.com'; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // Call fetchJSON to load the initial set of images
  fetchJSON();

  // Event handler for the next photo button
  $('#nextPhoto').click(showNextPhoto);

  // Event handler for the previous photo button
  $('#prevPhoto').click(showPrevPhoto);

  // Event handler for toggling the details section
  $('.moreIndicator').click(function() {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle();
  });

  // Start the slideshow timer
  startTimer();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function(data) {
      mImages = data.images; // Store the images array in mImages
      const image = mImages[mCurrentIndex];
      $('#photo').attr('src', image.imgPath);
      $('.location').text(`Location: ${image.imgLocation}`);
      $('.description').text(`Description: ${image.description}`);
      $('.date').text(`Date: ${image.date}`);
    },
    error: function() {
      alert("Failed to load JSON file!");
    }
  });
}
