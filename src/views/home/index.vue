<template>
    <div class="home-wrapper">
        <div class="home-header">
            <div class="left">
                <span class="title">明厨亮灶行业大模型</span>
                <span class="info">芯片：昇腾910B I 模型参数量：百亿</span>
            </div>
            <div class="right">
                <img class="user-img" src="@/assets/user.png" alt="" />
            </div>
        </div>
        <div class="home-body">
            <div class="left">
                <div class="title">我的对话</div>
                <meg-input placeholder="搜索历史记录">
                    <img slot="suffix" class="search-icon" src="@/assets/search.svg" alt="" />
                </meg-input>
                <div class="order-content">
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="right">
                <div class="upload-content">
                    <div class="title">选择监管文件</div>
                    <div></div>
                </div>
                <div class="chat-content">222</div>
            </div>
        </div>
    </div>
</template>
<script></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
