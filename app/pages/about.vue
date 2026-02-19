<template>
  <div class="about-page">
    <HeaderSection class="fixed-header" />
    
    <!-- Hero Banner -->
    <section class="about-hero">
      <div class="hero-overlay"></div>
      <div class="container-width relative z-10 text-center">
        <h1 class="hero-title animate-fade-up">WHO WE ARE</h1>
        <p class="hero-subtitle animate-fade-up delay-1">
          A Rwandan construction and building materials supplier founded in 2014, bridging infrastructure and imagination.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="content-section bg-black text-white py-20 px-6">
      <div class="container-width grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left: Image Grid -->
        <div class="image-composition relative">
           <div class="img-box img-1">
             <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="Construction" />
           </div>
           <div class="img-box img-2">
             <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" alt="Cinema" />
           </div>
           <div class="decorative-border"></div>
        </div>

        <!-- Right: Text Content -->
        <div class="text-content">
           <h2 class="section-heading mb-6">Our Vision</h2>
           <p class="text-gray-300 text-lg leading-relaxed mb-6">
             The Reborn Company Ltd was founded in <strong class="text-white">2014</strong> by <strong class="text-gold">Eng. Olivier Ishimwe</strong> with a mission to provide affordable housing solutions across Rwanda. We have since evolved into a multifaceted conglomerate operating at the intersection of infrastructure and creativity.
           </p>
           <p class="text-gray-300 text-lg leading-relaxed mb-8">
             Headquartered in <strong class="text-white">Rwamagana, Eastern Province</strong>, with operations extending to Kigali and Bugesera, we are dedicated to reshaping the physical and cultural landscape of the nation. Whether supplying top-tier building materials or producing cinematic masterpieces, our core value remains: <strong class="text-gold">Quality without Compromise.</strong>
           </p>

           <div class="stats-grid grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-gray-800 pt-8">
              <div class="stat-item">
                 <span class="block text-4xl font-display text-gold">2014</span>
                 <span class="text-sm text-gray-500 uppercase tracking-widest">Founded</span>
              </div>
              <div class="stat-item">
                 <span class="block text-4xl font-display text-gold">50+</span>
                 <span class="text-sm text-gray-500 uppercase tracking-widest">Projects</span>
              </div>
              <div class="stat-item">
                 <span class="block text-4xl font-display text-gold">100%</span>
                 <span class="text-sm text-gray-500 uppercase tracking-widest">Client Satisfaction</span>
              </div>
           </div>
        </div>

      </div>
    </section>

    <!-- Leadership / Team Section (Optional placeholder) -->
    <section class="team-section bg-[#0a0a0a] py-20 px-6 border-t border-gray-900">
       <div class="container-width text-center">
          <h2 class="section-heading mb-12">Our Leadership</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             <!-- Placeholder Manager Card -->
             <div class="team-card group flex flex-col items-center">
                <div class="mb-6 relative">
                   <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-gold transition-colors duration-300">
                      <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1769214121/Screenshot_2026-01-24_at_02.21.39_y350ba.png" alt="Eng. Olivier Ishimwe" class="w-full h-full object-cover" />
                   </div>
                </div>
                <h3 class="text-white font-display text-xl uppercase">Eng. Olivier Ishimwe</h3>
                <p class="text-gray-500 text-sm mt-1">Founder & CEO</p>
             </div>
             <!-- Add more team members as needed -->
          </div>
       </div>
    </section>

    <!-- Contact Us Section -->
    <section id="contact" class="contact-section py-20 px-6 bg-black border-t border-gray-900">
      <div class="container-width">
        <div class="text-center mb-16">
          <h2 class="section-heading mb-4">Get In Touch</h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Reach out to our specific divisions for tailored support and expert guidance.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- General Card -->
          <div class="contact-card group">
            <div class="card-icon">
              <Icon name="ri:customer-service-2-fill" class="text-3xl text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="card-title">General Inquiries</h3>
            <div class="contact-details">
              <a href="tel:+250788261877" class="contact-link">
                <Icon name="ri:phone-fill" class="mr-2" /> +250 788 261 877
              </a>
              <a href="https://wa.me/+250788261877" target="_blank" class="contact-link">
                <Icon name="ri:whatsapp-fill" class="mr-2" /> WhatsApp Us
              </a>
              <a href="mailto:thereborn.limited@gmail.com" class="contact-link">
                <Icon name="ri:mail-send-fill" class="mr-2" /> thereborn.limited@gmail.com
              </a>
            </div>
          </div>

          <!-- Real Estate Card -->
          <div class="contact-card group">
            <div class="card-icon">
              <Icon name="ri:building-2-fill" class="text-3xl text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="card-title">Real Estate</h3>
            <div class="contact-details">
              <p class="text-sm text-gray-400 mb-2">For property sales, buying, and surveying.</p>
              <a href="mailto:thereborn.realestate@gmail.com" class="contact-link">
                thereborn.realestate@gmail.com
              </a>
            </div>
          </div>

          <!-- Construction Card -->
          <div class="contact-card group">
            <div class="card-icon">
              <Icon name="ri:hammer-fill" class="text-3xl text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="card-title">Construction</h3>
            <div class="contact-details">
              <p class="text-sm text-gray-400 mb-2">For engineering, materials, and projects.</p>
              <a href="mailto:thereborn.construction@gmail.com" class="contact-link">
               thereborn.construction@gmail.com
              </a>
            </div>
          </div>

          <!-- Entertainment Card -->
          <div class="contact-card group">
            <div class="card-icon">
              <Icon name="ri:movie-2-fill" class="text-3xl text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="card-title">Entertainment</h3>
            <div class="contact-details">
              <p class="text-sm text-gray-400 mb-2">For cinema, casting, and production.</p>
              <a href="mailto:thereborn.entertainment@gmail.com" class="contact-link">
              thereborn.entertainment@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
useHead({
  title: 'About Us | The Reborn Company',
  meta: [
    { name: 'description', content: 'Learn about The Reborn Company, our vision, and our work in Construction, Real Estate, and Cinema in Rwanda.' }
  ]
})
</script>

<style scoped>
.about-page {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: black;
  min-height: 100vh;
}

.fixed-header {
  position: absolute;
  width: 100%;
}

.about-hero {
  height: 60vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), #000000);
}

.container-width {
  max-width: 80rem;
  margin: 0 auto;
}

.hero-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 5rem;
  color: white;
  line-height: 1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.hero-subtitle {
  font-family: 'Lexend', sans-serif;
  font-size: 1.25rem;
  color: #e5e7eb;
  max-width: 600px;
  margin: 0 auto;
}

.font-display {
  font-family: 'Special Gothic Expanded One', sans-serif;
}

.text-gold {
  color: #F5B700;
}

.section-heading {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 3rem;
  color: white;
  text-transform: uppercase;
}

/* Image Composition Styles */
.image-composition {
  min-height: 500px;
}

.img-box {
  position: absolute;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  transition: transform 0.5s ease;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
}

.img-box:hover {
  transform: scale(1.02);
  z-index: 10;
}

.img-box:hover img {
  filter: grayscale(0%);
}

.img-1 {
  width: 70%;
  height: 350px;
  top: 0;
  left: 0;
  z-index: 2;
}

.img-2 {
  width: 60%;
  height: 300px;
  bottom: 0;
  right: 0;
  z-index: 3;
  border: 4px solid #000;
}

.decorative-border {
  position: absolute;
  width: 70%;
  height: 350px;
  border: 2px solid #F5B700;
  top: 40px;
  right: 40px;
  z-index: 1;
  opacity: 0.5;
}

/* Animations */
.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }
  
  .image-composition {
    display: none; /* Simplify on tablet for now or stack */
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .about-hero {
    height: 50vh;
  }
  
  .image-composition {
    display: none;
  }
}
/* Contact Section Styles */
.contact-card {
  background: rgba(255, 255, 255, 0.05); /* slightly lighter than black */
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact-card:hover {
  border-color: #F5B700;
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
}

.card-icon {
  width: 4rem;
  height: 4rem;
  background: #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
}

.contact-card:hover .card-icon {
  background: #F5B700;
}

.card-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}

.contact-link {
  color: #9ca3af;
  font-size: 0.9rem;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  word-break: break-all; /* Ensure emails enable wrapping if needed */
}

.contact-link:hover {
  color: #F5B700;
}
</style>
