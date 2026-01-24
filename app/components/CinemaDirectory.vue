<template>
  <section id="directory" class="directory-section">
    <div class="container-width">
      <div class="header-row">
        <div>
          <h2 class="section-title">People</h2>
        </div>
        
        <!-- Search and Sort -->
        <div class="filter-container">
          <div class="search-wrapper">
             <input 
               v-model="filters.search" 
               type="text" 
               placeholder="Search talent..." 
               class="search-input"
             />
             <div class="search-icon">
               <Icon name="ri:search-line" class="text-gray-500" />
             </div>
          </div>

          <!-- Province Filter -->
          <div class="sort-wrapper">
             <select v-model="filters.province" class="sort-select">
               <option value="">All Provinces</option>
               <option value="Kigali">Kigali City</option>
               <option value="Northern">Northern</option>
               <option value="Southern">Southern</option>
               <option value="Eastern">Eastern</option>
               <option value="Western">Western</option>
             </select>
             <div class="chevron-icon"><Icon name="ri:arrow-down-s-line" /></div>
          </div>

          <!-- Gender Filter -->
          <div class="sort-wrapper" style="width: 10rem;">
             <select v-model="filters.gender" class="sort-select">
               <option value="">All Genders</option>
               <option value="MALE">Male</option>
               <option value="FEMALE">Female</option>
             </select>
             <div class="chevron-icon"><Icon name="ri:arrow-down-s-line" /></div>
          </div>
          
          <div class="sort-wrapper">
            <select v-model="filters.sortBy" class="sort-select">
              <option value="featured">Featured</option>
              <option value="name">Name (A-Z)</option>
              <option value="age">Age (Asc)</option>
            </select>
            <div class="chevron-icon"><Icon name="ri:arrow-down-s-line" /></div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-20">
          <Icon name="ri:loader-4-line" class="animate-spin text-4xl text-white" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 text-red-500">
          Failed to load actors. Please try again later.
      </div>
      
      <!-- Grid -->
      <div v-else-if="filteredActors.length > 0" class="people-grid">
        <NuxtLink v-for="person in filteredActors" :key="person.id" :to="`/cinema-hub/actor/${person.id}`" class="person-card group">
           <!-- Image -->
           <div class="image-wrapper">
             <img v-if="person.profileAvatarUrl" :src="person.profileAvatarUrl" :alt="person.fullName" class="person-image" />
             <div v-else class="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                 <Icon name="ri:user-line" class="text-6xl" />
             </div>
           </div>
           
           <!-- Footer -->
           <div class="card-footer">
              <h3 class="person-name">{{ person.fullName }}</h3>
              <p class="person-work">{{ (person.cinemaRoles && person.cinemaRoles.length > 0) ? person.cinemaRoles[0] : (person.about || 'Actor') }}</p>
           </div>
        </NuxtLink>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <p class="empty-text">No profiles found matching your criteria.</p>
        <button @click="resetFilters" class="clear-btn">Clear filters</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const config = useRuntimeConfig()
const API = config.public.apiBase

const filters = reactive({
    search: '',
    province: '',
    gender: '',
    sortBy: 'featured'
})

const { data: actors, pending, error } = await useFetch<any[]>(`${API}/actors`, {
    server: false,
    lazy: true
})

const resetFilters = () => {
    filters.search = ''
    filters.province = ''
    filters.gender = ''
    filters.sortBy = 'featured'
}

const filteredActors = computed(() => {
    if (!actors.value) return []
    
    let result = actors.value.filter((actor: any) => {
        const matchesSearch = !filters.search || 
            (actor.fullName && actor.fullName.toLowerCase().includes(filters.search.toLowerCase())) ||
            (actor.about && actor.about.toLowerCase().includes(filters.search.toLowerCase()))
        
        const matchesProvince = !filters.province || (actor.province === filters.province)
        const matchesGender = !filters.gender || (actor.gender === filters.gender)

        return matchesSearch && matchesProvince && matchesGender
    })

    if (filters.sortBy === 'name') {
        result.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''))
    } else if (filters.sortBy === 'age') {
        result.sort((a, b) => (a.age || 0) - (b.age || 0))
    }
    
    return result
})
</script>

<style scoped>
.directory-section {
  min-height: 100vh;
  background-color: #050510; /* Dark navy/black */
  color: white;
  padding: 5rem 1.5rem;
  font-family: 'IBM Plex Sans', sans-serif;
  border-top: 1px solid #1f2937;
}

.container-width {
  max-width: 80rem; /* max-w-7xl */
  margin: 0 auto;
}

.header-row {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 3.75rem; /* 6xl */
  color: white;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin: 0;
  width: 100%;
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.search-wrapper, .sort-wrapper {
  position: relative;
  width: 100%;
}

.search-input, .sort-select {
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #4b5563; /* gray-600 */
  color: white;
  padding: 0.75rem 0;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  border-radius: 0;
}

.sort-select {
  appearance: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #d1d5db; /* gray-300 */
}

.sort-select option {
  background-color: #000;
}

.search-input:focus, .sort-select:focus {
  border-bottom-color: white;
}

.search-icon, .chevron-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280; /* gray-500 */
  pointer-events: none;
}

.people-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem 1.5rem;
}

.person-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
}

.image-wrapper {
  aspect-ratio: 4/5;
  background-color: #1f2937;
  overflow: hidden;
  position: relative;
}

.person-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-out;
}

.person-card:hover .person-image {
  transform: scale(1.05);
}

.card-footer {
  background-color: #050510; /* Match section bg or slightly darker */
  padding: 1.5rem 1.5rem 1rem 0; /* Reduced left padding to align with image edge visually if needed, but text usually needs padding. Design shows text aligned. */
  border-top: 2px solid transparent;
  transition: border-color 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.person-card:hover .card-footer {
  border-top-color: #F5B700; /* Gold */
}

.person-name {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 1.25rem;
  line-height: 1;
  color: white;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.person-work {
  font-size: 0.875rem;
  font-weight: 300;
  color: #9ca3af; /* gray-400 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  padding: 5rem 0;
  text-align: center;
  color: #6b7280;
}

.empty-text {
  font-size: 1.25rem;
}

.clear-btn {
  margin-top: 1rem;
  color: white;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}

.clear-btn:hover {
  color: #F5B700;
}

/* Responsive */
@media (min-width: 768px) {
  .header-row {
    flex-direction: row;
    align-items: flex-end;
  }
  
  .filter-container {
    flex-direction: row;
    width: auto;
    margin-top: 0;
    gap: 2rem;
  }
  
  .section-title {
    width: auto;
  }
  
  .search-wrapper {
    width: 16rem;
  }
  
  .sort-wrapper {
    width: 12rem;
  }
  
  .people-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .people-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
