<script>
import axios from 'axios'; // 导入 axios
export default {
  name: 'register',
  data() {
    return {
      isSubmitting: false, // 防重複提交的標誌位
    };
  },
  methods: {
    async register() {
      if (this.isSubmitting) return; // 如果正在提交，直接返回
      this.isSubmitting = true; // 設置為提交中
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;

      try {
        await axios.post('http://localhost:3001/register/', { email, password, name });
        alert('User registered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user: ' + error.message);
      } finally {
        this.isSubmitting = false; // 請求結束後解除提交鎖定
      }
    }
  }
}

</script>

<template>
    <body class="text-center">
    
    <main class="form-signin">
      <form class="login col-6 mx-auto mt-5"   @submit.prevent = "register"> <!--這個我問chatgpt 的我忘了幹嘛用的-->
        
        <h1 class="h3 mb-3 fw-normal">註冊</h1>
        
        <div class="d-flex justify-content-center">
            <div class="form-floating mb-3 col-6">
            <input type="email" class="form-control" id="email" placeholder="name@example.com">
            <label for="floatingInput">輸入Email帳號</label>
            </div>
        
        </div>

        <div class="d-flex justify-content-center">
            <div class="form-floating mb-3 col-6">
            <input type="password" class="form-control" id="password" placeholder="Password">
            <label for="floatingInput">輸入密碼</label>
            </div>
        
        </div>
        <div class="d-flex justify-content-center">
            <div class="form-floating mb-3 col-6">
            <input type="password" class="form-control" id="PasswordComfirm" placeholder="Password">
            <label for="floatingPassword">確認密碼</label>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <div class="form-floating mb-3 col-6">
            <input type="text" class="form-control" id="name" placeholder="Password">
            <label for="floatingPassword">輸入你的暱稱</label>
            </div>
        </div>
        <div class="d-flex justify-content-center mb-3">
            <button class="btn btn-sm btn-outline-warning col-3 circle" type="submit">註冊</button>
        </div>
        <div>
            <button class="btn btn-sm btn btn-outline-secondary col-3 circle">
            <RouterLink to="/" class="nav-link px-3">首頁</RouterLink>
            </button>
        </div>
           
        
      </form>
    </main>
    
    </body>
</template>

<style >

.login{
    background-color:#FAEBD7;
    padding: 40px;
    box-shadow: 5px 5px 10px 	#D8D8EB;
}
.form-control{
    outline: none !important;
    box-shadow: none !important;
    border-color: #D8D8EB;
}
.circle{
    border-radius: 25px;
}

</style>