<script setup>
import headerComp from "@/website_homepage/header.vue"; 
</script>
<script>
export default {
    name : "cart",
}
</script>

<template>
    <headerComp/>
    <hr>
    <h3 class="text-center pt-3">購物車</h3>
    <div class="container py-3 text-bg-light" >
        <table class="table mt-3" >
            <thead style="border: 1px solid #0F0F0F; padding: 25px;">
                <tr>
                    <th>產品</th>
                    <th>價格</th>
                    <th>數量</th>
                    <th>總價</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <div>
                            <img src="/bego.png" height="100px" width="100px"/>
                            <span>管理學</span>
                        </div>
                        
                    </th>
                    <td>$500</td>
                    <td>1</td>
                    <td>$500</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>