<template>
    <div id="app">
        <div class="header">
            <div class="left">
                <span class="title">视联网监管大模型</span>
            </div>
            <div class="right">
                <img class="user-img" src="@/assets/user.png" alt="" />
            </div>
        </div>
        <router-view />
        <div class="footer">
            <img class="logo" src="@/assets/logo.png" alt="" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    .left {
        display: flex;
        align-items: center;

        .title {
            margin-left: 20px;
            font-size: 24px;
            font-family: DingTalk;
            color: #303133;
        }
    }

    .right {
        .user-img {
            width: 32px;
            height: 32px;
            padding: 6px;
            margin-right: 24px;
            background: #ffffff;
            border-radius: 8px;
        }
    }
}
.footer {
    .logo {
        position: absolute;
        left: 20px;
        bottom: 20px;
        width: 100px;
        height: 30px;
    }
}
</style>
