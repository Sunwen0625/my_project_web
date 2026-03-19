<template>
  <div class="login-container">
    <div class="login-card">
      <h2>登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">電子郵件</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>

        <button type="submit" class="login-btn">登入</button>

        <p class="register-link">
          還沒有帳號嗎？ <RouterLink to="/register">立即註冊</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"

const form = ref({
  email: "",
  password: ""
})

const handleLogin = () => {
  console.log("登入資料：", form.value)
  alert("登入成功！🎉")
}
</script>

<style scoped>
/* 背景 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: transparent; /* 🔹 主背景 */
}

/* 黑色卡片 */
.login-card {
  padding: 30px;
  width: 360px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  text-align: center;
  color: #eee; /* 🔹 文字顏色改亮 */
}

/* 標題 */
.login-card h2 {
  margin-bottom: 20px;
  color: #fff;
}

/* 表單輸入區 */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #ccc; /* 🔹 提示文字用灰色 */
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #555;
  background: #2a2a2a; /* 🔹 輸入框背景 */
  color: #fff; /* 🔹 輸入文字 */
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #2196f3; /* 🔹 聚焦時顯示藍色邊框 */
}

/* 登入按鈕（藍色） */
.login-btn {
  margin-top: 10px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #2196f3;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #42a5f5;
  transform: translateY(-2px);
}

/* 註冊連結 */
.register-link {
  margin-top: 15px;
  font-size: 14px;
  color: #bbb;
}

.register-link a {
  color: #ff9800;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
