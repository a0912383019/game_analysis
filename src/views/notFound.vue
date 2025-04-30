<template>
  <div class="not-found">
    <h1>404</h1>
    <p>SYSTEM FAILURE: PAGE NOT FOUND</p>
    <router-link to="/">RETURN TO HOME</router-link>
  </div>
</template>
<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-size: 6rem;
  margin: 0;
  color: #ff4d4f;
}
p {
  font-size: 1.5rem;
  color: #666;
  margin: 1rem 0;
}
button {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}
button:hover {
  background-color: #40a9ff;
}
</style>
