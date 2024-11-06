// Select the element you want to observe
const targets = document.querySelectorAll('.image');

// handle load source of image
const loadImage = (img) => {
  const src = img.getAttribute('lazy-src');
  img.src = src;
  img.removeAttribute('lazy-src');
}

// Create a callback function to execute when the target is intersecting
const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // Perform actions when the element is in view
      console.log('Element is in view!', entry);
      loadImage(target);
      console.log('Unobserve!');
      observer.unobserve(target);
    } else {
      console.log('Element is out of view!');
      // Perform actions when the element is out of view
    }
  });
};

// Create an Intersection Observer instance with callback and options
// Change options to experience
const observer = new IntersectionObserver(callback, {
  root: null, // Default view port
  rootMargin: '0% 0% 50% 0%', // margin of root to calc threshold, default 0 (like css)
  threshold: 0.5 // Default 0
});

// Start observing the target element
targets.forEach(target => observer.observe(target));
