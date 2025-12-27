// Gallery Slider
let currentSlide = 0
const slides = document.querySelectorAll(".gallery-slide")
const totalSlides = slides.length

// Create dots
const dotsContainer = document.getElementById("galleryDots")
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div")
  dot.classList.add("dot")
  if (i === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(i))
  dotsContainer.appendChild(dot)
}

function updateSlider() {
  const track = document.getElementById("galleryTrack")
  track.style.transform = `translateX(-${currentSlide * 100}%)`

  // Update dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  updateSlider()
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateSlider()
}

function goToSlide(index) {
  currentSlide = index
  updateSlider()
}

// Auto-play gallery
setInterval(nextSlide, 5000)

// Copy IP function
function copyIP() {
  const ip = "nox.lat"
  navigator.clipboard
    .writeText(ip)
    .then(() => {
      showNotification()
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = ip
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      showNotification()
    })
}

function showNotification() {
  const notification = document.getElementById("notification")
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 2000)
}

// Smooth scroll for navigation
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" })

      // Update active link
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    }
  })
})

// Update active nav on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute("id")

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active")
        }
      })
    }
  })
})
