<template>
  <div class="bg-black text-white min-h-screen font-sans">
    <div class="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none sticky-header">
       <NuxtLink to="/" class="pointer-events-auto flex items-center gap-2 group">
          <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform">
             <Icon name="ri:arrow-left-line" />
          </div>
          <span class="font-bold text-lg hidden md:block group-hover:text-gold transition-colors">Back to Home</span>
       </NuxtLink>
    </div>

    <!-- Hero Section -->
    <section class="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
             <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1769421202/THE_REBORN_REAL_ESTATE_FTO_acfycl.jpg" alt="Real Estate Hero" class="w-full h-full object-cover opacity-50" />
             <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center mt-12">
             <h1 class="font-display text-5xl md:text-8xl font-bold uppercase tracking-wider mb-6 leading-tight animate-fade-in-up">
                Reborn <span class="text-gold">Real Estate</span>
             </h1>
             <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 font-light leading-relaxed animate-fade-in-up delay-100">
                Find the right land, home, or estate and get precise, countrywide surveying (topographic, cadastral, construction) with trusted, transparent, and tailored service.
             </p>
            <div class="inline-flex items-center justify-center px-6 py-2 border border-gold/30 rounded-full bg-black/40 backdrop-blur-sm animate-fade-in-up delay-200">
                <span class="text-gold text-lg md:text-xl font-semibold tracking-wide">
                    Buy • Sell • Survey : trusted, transparent, and tailored to your needs.
                </span>
            </div>

            <div class="mt-12 animate-fade-in-up delay-300">
                <a href="#contact" class="bg-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 inline-flex items-center gap-2">
                    Get Free Consultation <Icon name="ri:arrow-right-line" />
                </a>
            </div>
        </div>
    </section>

    <!-- About Reborn Real Estate -->
    <section class="py-24 px-6 md:px-12 bg-zinc-900/30 relative">
        <div class="container mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                 <h2 class="text-4xl md:text-5xl font-bold mb-8 text-white font-display">About <span class="text-gold">Reborn</span> Real Estate</h2>
                 <p class="text-gray-300 leading-loose mb-6 text-lg">
                    Reborn Real Estate sources and vets high-quality plots, houses, and estates for purchase or sale and provides certified surveying to support transactions.
                 </p>
                 <p class="text-gray-300 leading-loose text-lg">
                    The firm emphasizes local market knowledge, technical expertise, and client-first service to simplify and secure property decisions.
                 </p>
            </div>
            <div class="order-1 md:order-2 relative">
                <div class="absolute -inset-4 bg-gold/20 rounded-2xl blur-xl transform rotate-3"></div>
                 <div class="rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-10 aspect-[4/3] group">
                    <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1769421202/THE_REBORN_REAL_ESTATE_FTO_acfycl.jpg" alt="About Reborn Real Estate" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                 </div>
            </div>
        </div>
    </section>

    <!-- Our Services -->
    <section class="py-24 px-6 md:px-12 container mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 font-display">Our Services</h2>
             <div class="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <div class="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-white/5 text-gold text-lg uppercase tracking-wider">
                        <th class="p-6 font-bold">Service</th>
                        <th class="p-6 font-bold hidden md:table-cell">What we do</th>
                        <th class="p-6 font-bold hidden md:table-cell">Ideal for</th>
                    </tr>
                </thead>
                <tbody class="text-gray-300 divide-y divide-white/10">
                     <!-- Service Item -->
                     <tr class="hover:bg-white/5 transition duration-200 group">
                        <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Property sourcing</span>
                            <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Locate and vet plots, houses, and estates for sale; present best matches</p>
                                <p class="text-gold/80 italic">Buyers seeking value and location fit</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Locate and vet plots, houses, and estates for sale; present best matches</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Buyers seeking value and location fit</td>
                     </tr>

                     <tr class="hover:bg-white/5 transition duration-200 group">
                        <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Sales & marketing</span>
                            <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Market your property, manage viewings, negotiate offers</p>
                                <p class="text-gold/80 italic">Sellers who want a fast, fair sale</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Market your property, manage viewings, negotiate offers</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Sellers who want a fast, fair sale</td>
                     </tr>

                     <tr class="hover:bg-white/5 transition duration-200 group">
                         <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Purchase support</span>
                             <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Negotiate purchase terms, coordinate due diligence</p>
                                <p class="text-gold/80 italic">Buyers needing end-to-end support</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Negotiate purchase terms, coordinate due diligence</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Buyers needing end-to-end support</td>
                     </tr>

                     <tr class="hover:bg-white/5 transition duration-200 group">
                        <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Topographic surveys</span>
                             <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Terrain mapping, contours, site planning data</p>
                                <p class="text-gold/80 italic">Developers, architects, engineers</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Terrain mapping, contours, site planning data</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Developers, architects, engineers</td>
                     </tr>

                      <tr class="hover:bg-white/5 transition duration-200 group">
                        <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Cadastral surveys</span>
                             <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Boundary definition, parcel registration support</p>
                                <p class="text-gold/80 italic">Landowners, buyers, legal processes</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Boundary definition, parcel registration support</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Landowners, buyers, legal processes</td>
                     </tr>

                      <tr class="hover:bg-white/5 transition duration-200 group">
                         <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Construction surveys</span>
                             <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">Setting out, as-built checks, construction control</p>
                                <p class="text-gold/80 italic">Contractors and project managers</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">Setting out, as-built checks, construction control</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Contractors and project managers</td>
                     </tr>

                      <tr class="hover:bg-white/5 transition duration-200 group">
                         <td class="p-6">
                            <span class="block text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">Countrywide coverage</span>
                             <div class="md:hidden mt-2 text-sm text-gray-400">
                                <p class="mb-1">All services available across Rwanda</p>
                                <p class="text-gold/80 italic">Clients anywhere in the country</p>
                            </div>
                        </td>
                        <td class="p-6 hidden md:table-cell">All services available across Rwanda</td>
                        <td class="p-6 hidden md:table-cell text-gray-400">Clients anywhere in the country</td>
                     </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- How We Work -->
    <section class="py-24 px-6 md:px-12 bg-zinc-900/30">
        <div class="container mx-auto">
             <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 font-display">How We Work</h2>
                <div class="w-24 h-1 bg-gold mx-auto rounded-full"></div>
            </div>

             <div class="grid md:grid-cols-5 gap-6">
                 <!-- Step 1 -->
                 <div class="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition duration-300 transform hover:-translate-y-2 group">
                     <div class="text-6xl font-bold text-white/5 mb-4 group-hover:text-gold/20 transition-colors">01</div>
                     <h3 class="text-xl font-bold text-gold mb-3 h-14">Tell us your goal</h3>
                     <p class="text-gray-400 text-sm leading-relaxed">Sell, buy, develop, or survey.</p>
                 </div>

                 <!-- Step 2 -->
                 <div class="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition duration-300 transform hover:-translate-y-2 group">
                     <div class="text-6xl font-bold text-white/5 mb-4 group-hover:text-gold/20 transition-colors">02</div>
                     <h3 class="text-xl font-bold text-gold mb-3 h-14">We shortlist options</h3>
                     <p class="text-gray-400 text-sm leading-relaxed">For buyers we present vetted properties; for sellers we prepare a market plan.</p>
                 </div>

                 <!-- Step 3 -->
                 <div class="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition duration-300 transform hover:-translate-y-2 group">
                     <div class="text-6xl font-bold text-white/5 mb-4 group-hover:text-gold/20 transition-colors">03</div>
                     <h3 class="text-xl font-bold text-gold mb-3 h-14">Technical checks</h3>
                     <p class="text-gray-400 text-sm leading-relaxed">Surveys and due diligence to remove surprises.</p>
                 </div>

                 <!-- Step 4 -->
                 <div class="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition duration-300 transform hover:-translate-y-2 group">
                     <div class="text-6xl font-bold text-white/5 mb-4 group-hover:text-gold/20 transition-colors">04</div>
                     <h3 class="text-xl font-bold text-gold mb-3 h-14">Negotiate and close</h3>
                     <p class="text-gray-400 text-sm leading-relaxed">We handle offers, paperwork, and coordination with authorities.</p>
                 </div>

                 <!-- Step 5 -->
                 <div class="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition duration-300 transform hover:-translate-y-2 group">
                     <div class="text-6xl font-bold text-white/5 mb-4 group-hover:text-gold/20 transition-colors">05</div>
                     <h3 class="text-xl font-bold text-gold mb-3 h-14">Aftercare</h3>
                     <p class="text-gray-400 text-sm leading-relaxed">Post-sale support and follow-up to ensure satisfaction.</p>
                 </div>
             </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-24 px-6 md:px-12 container mx-auto">
        <div class="bg-zinc-900 rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
             <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div class="relative z-10 flex flex-col md:flex-row gap-16">
                <div class="md:w-1/3">
                    <h2 class="text-4xl md:text-5xl font-bold mb-6 font-display">Why Choose Us</h2>
                    <p class="text-gray-400 leading-relaxed mb-8">
                        We don't just sell property; we build relationships and ensure peace of mind through every step of the process. Our unique combination of real estate and surveying expertise sets us apart.
                    </p>
                    <a href="#contact" class="text-gold font-bold uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2">
                        Get in Touch <Icon name="ri:arrow-right-line" />
                    </a>
                </div>

                <div class="md:w-2/3 grid md:grid-cols-2 gap-8">
                    <!-- Feature 1 -->
                    <div class="flex items-start gap-4">
                        <div class="bg-white/5 p-3 rounded-lg text-gold">
                             <Icon name="ri:map-pin-user-fill" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Local Expertise</h3>
                            <p class="text-sm text-gray-400">Deep knowledge of neighborhoods, land values, and regulatory requirements.</p>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="flex items-start gap-4">
                         <div class="bg-white/5 p-3 rounded-lg text-gold">
                             <Icon name="ri:shield-check-fill" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Technical Reliability</h3>
                            <p class="text-sm text-gray-400">Certified survey services that meet legal and construction standards.</p>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="flex items-start gap-4">
                         <div class="bg-white/5 p-3 rounded-lg text-gold">
                             <Icon name="ri:money-dollar-circle-fill" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Transparent Pricing</h3>
                            <p class="text-sm text-gray-400">Clear fees and no hidden costs.</p>
                        </div>
                    </div>

                    <!-- Feature 4 -->
                    <div class="flex items-start gap-4">
                         <div class="bg-white/5 p-3 rounded-lg text-gold">
                             <Icon name="ri:user-heart-fill" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Client-Centered Service</h3>
                            <p class="text-sm text-gray-400">Personalized recommendations and responsive communication.</p>
                        </div>
                    </div>

                    <!-- Feature 5 -->
                     <div class="flex items-start gap-4 col-span-full">
                         <div class="bg-white/5 p-3 rounded-lg text-gold">
                             <Icon name="ri:briefcase-4-fill" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">End-to-End Support</h3>
                            <p class="text-sm text-gray-400">From initial search to final registration and handover.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section id="contact" class="py-24 px-6 md:px-12 bg-gold text-black text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

        <div class="relative z-10 max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-bold mb-6 font-display">Ready to find the perfect property?</h2>
            <p class="text-xl md:text-2xl mb-12 font-medium opacity-90 max-w-2xl mx-auto">
                Contact Reborn Real Estate for a free consultation and a tailored plan to meet your property goals.
            </p>

             <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
                <!-- Phone -->
                <a href="tel:+250788261877" class="group bg-black text-white min-w-[200px] px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition shadow-xl flex items-center justify-center gap-3">
                    <Icon name="ri:phone-fill" class="text-gold group-hover:scale-110 transition-transform" />
                    <span>Call Us</span>
                </a>

                <!-- Email -->
                <a href="mailto:thereborn.realestate@gmail.com" class="group bg-white/90 backdrop-blur text-black min-w-[200px] px-8 py-4 rounded-xl font-bold hover:bg-white transition shadow-xl flex items-center justify-center gap-3">
                     <Icon name="ri:mail-send-fill" class="text-gold group-hover:scale-110 transition-transform" />
                     <span>Email Us</span>
                </a>

                <!-- WhatsApp -->
                 <a href="https://wa.me/+250788261877" target="_blank" class="group bg-[#25D366] text-white min-w-[200px] px-8 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition shadow-xl flex items-center justify-center gap-3">
                     <Icon name="ri:whatsapp-fill" class="text-white group-hover:scale-110 transition-transform" />
                     <span>WhatsApp</span>
                </a>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Reborn Real Estate - Buy, Sell, and Survey Properties in Rwanda',
  meta: [
    { name: 'description', content: 'The Reborn Real Estate is a full-service real estate consultancy and brokerage operating across Rwanda. We specialize in sourcing high-quality plots, houses, and estates.' }
  ]
})
</script>

<style scoped>
.text-gold {
    color: #F5B700;
}
.bg-gold {
    background-color: #F5B700;
}
.border-gold {
    border-color: #F5B700;
}
.font-display {
    font-family: 'Special Gothic Expanded One', sans-serif;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-300 {
    animation-delay: 0.3s;
}

.sticky-header {
    pointer-events: none;
}
.sticky-header a {
    pointer-events: auto;
}
</style>
