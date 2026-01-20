<template>
  <header class="header-section">
    <div class="header-left">
      <LogoBox />
    </div>
    <div class="header-right">
      <NavLinks />
      <PhoneNumber phone="+2400000000" />
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
  z-index: 100;
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
    padding: 20px 30px;
  }
}
</style>
