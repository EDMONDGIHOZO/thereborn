<template>
  <section class="directory-section">
    <div class="container-width">
      <div class="header-row">
        <div>
          <h2 class="section-title">People</h2>
        </div>
        
        <!-- Search and Sort -->
        <div class="filter-container">
          <div class="search-wrapper">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search talent..." 
              class="search-input"
            />
            <div class="search-icon">
              <!-- Magnifying glass icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 5.196 5.196Z" />
              </svg>
            </div>
          </div>
          
          <div class="sort-wrapper">
            <select v-model="sortBy" class="sort-select">
              <option value="featured">Sort By Featured</option>
              <option value="name">Sort By Name</option>
            </select>
            <div class="chevron-icon">
               <!-- Chevron down icon -->
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                 <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
               </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Grid -->
      <div v-if="filteredPeople.length > 0" class="people-grid">
        <div v-for="person in filteredPeople" :key="person.id" class="person-card group">
           <!-- Image -->
           <div class="image-wrapper">
             <img :src="person.image" :alt="person.name" class="person-image" />
           </div>
           
           <!-- Footer -->
           <div class="card-footer">
              <h3 class="person-name">{{ person.name }}</h3>
              <p class="person-work">{{ person.popularWork }}</p>
           </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <p class="empty-text">No profiles found matching "{{ searchQuery }}".</p>
        <button @click="resetFilters" class="clear-btn">Clear search</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const sortBy = ref('featured')

const resetFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'featured'
}

const people = [
  { id: 1, name: 'Keza M.', popularWork: 'The Mercy of the Jungle (2018)', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'John Doe', popularWork: 'Gahigiro (2024)', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Alice K.', popularWork: 'Nameless (2023)', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Eric T.', popularWork: 'Director of Photography', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Sarah B.', popularWork: 'Editor - 100 Days', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Mike J.', popularWork: 'Imbabazi (2013)', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { id: 7, name: 'Diana R.', popularWork: 'Makeup Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Paul K.', popularWork: 'Sound Department', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600' }
]

const filteredPeople = computed(() => {
  let result = people.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
           p.popularWork.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
  
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
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
