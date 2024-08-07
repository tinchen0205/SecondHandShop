<script setup>
import headerComp from "../website_homepage/header.vue"; 
</script>
<template>
    <headerComp></headerComp>
    <h1 class="text-center bg-light py-3">租借專區</h1>
    <div class="container">
        <!-- Product 1 -->
        <div class="product-card row">
            <div class="col-md-2">
                <img src="https://www.rinnai.com.tw/storage/product/1664863587_RWP-R630V.png" alt="IRIS 自動給水織物清潔機 RNS-P10" class="product-img img-fluid">
            </div>
            <div class="col-md-8">
                <div class="product-title">IRIS 自動給水織物清潔機 RNS-P10</div>
                <div class="product-brand">IRIS OHYAMA RNS-P10</div>
                <div class="badge rounded-pill bg-warning text-dark">寵物專用電器用品</div>
                <div class="product-owner">
                    <span class="icon">👤</span> winnie Chen
                </div>
                <div class="product-details">
                    <span class="icon">✅</span> 已被租用
                    <span class="icon">❌</span> 尚未租用
                </div>
            </div>
            <div class="col-md-2 product-actions">
                <button class="btn btn-outline-info btn-block my-3">瞭解更多</button>
                <br>
                <button class="btn btn btn-outline-success btn-block">加入收藏</button>
            </div>
        </div>

        <!-- Product 2 -->
        <div class="product-card row">
            <div class="col-md-2">
                <img src="https://www.electrolux.com.tw/globalassets/appliances/air-purifier/air-purifier-energy-label/ep32-27swa-fr-el-1500x1500.png" alt="空氣淨化器" class="product-img img-fluid">
            </div>
            <div class="col-md-8">
                <div class="product-title">空氣淨化器</div>
                <div class="product-brand">Electrolux 伊萊克斯 Flow A4 UV</div>
                <div class="badge rounded-pill bg-warning text-dark">生活家電</div>
                <div class="product-owner">
                    <span class="icon">👤</span> 靜靜
                </div>
                <div class="product-details">
                    <span class="icon">✅</span> 已被租用
                    <span class="icon">❌</span> 尚未租用
                </div>
            </div>
            <div class="col-md-2 product-actions">
                <button class="btn btn-outline-info btn-block my-3">瞭解更多</button>
                <br>
                <button class="btn btn btn-outline-success btn-block">加入收藏</button>
            </div>
        </div>
    </div>
</template>
<style>
 .product-card {
            border: 1.5px solid #5acffe;
            border-radius: 10px;
            margin-bottom: 20px;
            padding: 20px;
        }
        .product-title {
            font-weight: bold;
        }
        .product-details {
            margin-top: 10px;
        }
        .product-img {
            max-width: 100px;
        }
        .product-actions {
            margin-top: 10px;
        }
</style>