<template>
  <a :href="`tel:${phone}`" class="phone-number">
    {{ formattedPhone }}
  </a>
</template>

<script setup>
const props = defineProps({
  phone: {
    type: String,
    default: '+2400000000'
  }
})

const formattedPhone = computed(() => props.phone)
</script>

<style scoped>
.phone-number {
  font-family: 'Lexend', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.phone-number:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
