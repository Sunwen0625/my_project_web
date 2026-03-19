<template>
  <div class="register-container">
    <div class="register-card">
      <h2>註冊</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">使用者名稱</label>
          <input type="text" id="username" v-model="form.username" required />
        </div>

        <div class="form-group">
          <label for="email">電子郵件</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>

        <button type="submit" class="register-btn">註冊</button>

        <p class="login-link">
          已經有帳號了嗎？ <RouterLink to="/login">立即登入</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"

const form = ref({
  username: "",
  email: "",
  password: ""
})

const handleRegister = () => {
  console.log("註冊資料：", form.value)
  alert("註冊成功！🎉")
}
</script>

<style scoped>
/* 背景 */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent; /* 🔹 主背景 */
}

/* 黑色卡片 */
.register-card {
  padding: 30px;
  width: 360px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  text-align: center;
  color: #eee;
}

/* 標題 */
.register-card h2 {
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
  color: #ccc;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #555;
  background: #2a2a2a; /* 🔹 深色背景 */
  color: #fff;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #ff9800; /* 🔹 聚焦時顯示橘色邊框 */
}

/* 註冊按鈕（橘色） */
.register-btn {
  margin-top: 10px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #ff9800;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background: #ffa726;
  transform: translateY(-2px);
}

/* 登入連結 */
.login-link {
  margin-top: 15px;
  font-size: 14px;
  color: #bbb;
}

.login-link a {
  color: #2196f3; /* 🔹 藍色呼應登入 */
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
