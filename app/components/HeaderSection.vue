<template>
  <header class="header-section">
    <div class="header-left">
      <LogoBox />
    </div>
    <div class="header-right">
      <NavLinks />
      <PhoneNumber phone="+250788347428" />
      <SocialIcons />
    </div>
  </header>
</template>

<style scoped>
.header-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

@media (max-width: 768px) {
  .header-section {
    position: relative;
    padding: 20px 20px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: #0a0a0a; /* Match background color */
  }
  
  .header-left {
    width: 100%;
    justify-content: center;
  }
  
  .header-right {
    width: 100%;
    align-items: center;
    gap: 10px;
  }
}
</style>
