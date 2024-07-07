<script setup>
    import headerComp from "@/website_homepage/header.vue"; 
</script>
<script>
    export default {
        name : 'profile',       
    }
</script>
<template>
<headerComp></headerComp>
<hr>
<h3 class="text-center pt-3">會員中心</h3>
<div class="container pt-5 text-bg-light">
    <div class="row">
        <div class="col-4 text-center">
            <div class="font-30">基本資料
            </div>
        </div>
        <div class="col-8">
            <div class="font-20">姓名：陳奕廷</div>
            <div class="font-20">帳號：s1101726@gm.pu.edu.tw</div>
            <div class="py-3 ">
                <button class=" btn-custom">密碼更改</button>
                <button class="btn-custom">購物車</button>
                <button class=" btn-custom">訂單明細</button>
                <button class=" btn-custom">我的評價</button>
            </div>
        </div>
    </div>
</div>
<div class="container py-3">
    <div class="row ">
        <div class="col-8 text-bg-light pt-3">
            <div class="font-20">
                喜愛項目
                <hr>
            </div>
            <div class="container">
                <div class="row">
                <span class="col">商品編號</span>
                <span class="col">商品名稱</span>
                <span class="col">價格</span>
                </div>
            </div>
        </div>
        <div class="col-4 text-bg-dark">

        </div>
    </div>
    <div class="row">
        <div class="col-8 text-bg-light pt-3">
            <div class="container">
                <div class="row">
                <span class="col">0123</span>
                <span class="col">管理學</span>
                <span class="col" style="color:	#FF5151">300</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style>
.font-20 {
    font-size:20px;
}
.font-30{
    font-size:30px;
}
.btn-custom {
  font-size: 15px;
  border: 1.5px solid #f0a830;
  color: #f0a830;
  margin: 10px;
  padding: 5px 15px;
  text-align: center;
  background-color: transparent;
  transition: color 0.3s;
  width: 120px; /* 固定宽度 */
  display: inline-block; /* 确保按钮按块级元素显示 */
}
.btn-custom:hover {
  color: black;
}
</style>