<script setup lang="ts">
import {useAuth} from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const {token} = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/admin`

interface Stats {
  totalActors: number;
  pendingApprovals: number;
  totalMovies: number;
  engagement: number;
  registrationTrend: number[];
  recentActivities: Array<{
    email: string;
    timeAgo: string;
    description: string;
  }>;
}

const {data: statsData, refresh, error} = await useFetch<Stats>(`${API}/dashboard`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const stats = computed(() => [
  {
    title: 'Total Actors',
    value: statsData.value?.totalActors || 0,
    extra: 'Registered actors',
    icon: 'ri:user-star-line'
  },
  {
    title: 'Pending Approval',
    value: statsData.value?.pendingApprovals || 0,
    extra: 'Requires attention',
    icon: 'ri:time-line'
  },
  {title: 'Movies', value: statsData.value?.totalMovies || 0, extra: 'Across all profiles', icon: 'ri:movie-2-line'},
  {
    title: 'Engagement',
    value: statsData.value?.engagement || 0,
    extra: 'Profile views',
    icon: 'ri:bar-chart-groupped-line'
  }
])

const maxTrendValue = computed(() => {
  if (!statsData.value?.registrationTrend) return 10;
  return Math.max(...statsData.value.registrationTrend, 10);
})
</script>

<template>
  <div class="space-y-8 px-4 lg:px-8">
    <!-- Header -->
    <header class="border-b border-gray-300 pb-6">
      <h1 class="text-5xl font-light text-gray-900 tracking-tighter">Dashboard</h1>
      <p class="text-gray-500 mt-2 text-lg font-light">Overview of system performance and activity.</p>
    </header>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
      <div v-for="stat in stats" :key="stat.title"
           class="p-6 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors group">
        <h3 class="text-gray-500 text-sm uppercase tracking-wider mb-2 font-medium">{{ stat.title }}</h3>
        <div class="flex items-baseline justify-between">
          <span class="text-4xl font-light text-gray-900 group-hover:text-blue-600 transition-colors">{{
              stat.value
            }}</span>
          <Icon :name="stat.icon" class="text-2xl text-gray-300 group-hover:text-blue-600 transition-colors"/>
        </div>
        <p class="text-xs text-gray-400 mt-4">{{ stat.extra }}</p>
      </div>
    </div>

    <!-- Content Area Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Chart Area -->
      <div class="lg:col-span-2 bg-white border border-gray-200 p-8 h-96 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-light text-gray-900">Registration Trend (Last 7 Days)</h3>
        </div>
        <div class="flex-1 flex items-end justify-between space-x-2 border-b border-gray-200 pb-2 px-4">
          <div v-if="statsData?.registrationTrend" v-for="(count, index) in statsData.registrationTrend" :key="index"
               class="relative flex-1 group">
            <div class="w-full bg-blue-100 hover:bg-blue-600 transition-all duration-300 rounded-t-sm relative"
                 :style="{ height: `${(count / maxTrendValue) * 100}%` }">
              <div
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {{ count }} registrations
              </div>
            </div>
            <div class="text-center mt-2 text-xs text-gray-400 font-mono">
              day {{ index + 1 }}
            </div>
          </div>
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            No data available
          </div>
        </div>
      </div>

      <!-- Side List -->
      <div class="bg-gray-900 text-white p-8 flex flex-col">
        <h3 class="text-xl font-light mb-6">Recent Activity</h3>
        <div class="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div v-if="statsData?.recentActivities?.length">
            <div v-for="(activity, i) in statsData.recentActivities" :key="i"
                 class="border-b border-gray-700 pb-4 last:border-0 hover:pl-2 transition-all cursor-pointer">
              <div class="flex justify-between items-start mb-1">
                <span class="text-sm font-bold text-white">{{ activity.description }}</span>
                <span class="text-xs text-gray-500">{{ activity.timeAgo }}</span>
              </div>
              <p class="text-xs text-gray-400">User <span class="text-gray-300">{{ activity.email }}</span> joined.</p>
            </div>
          </div>
          <div v-else class="text-gray-500 text-sm">
            No recent activity.
          </div>
        </div>
        <button class="w-full mt-6 py-3 border border-gray-600 hover:bg-gray-800 text-sm font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for activity feed */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
