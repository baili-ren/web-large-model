<template>
    <div class="home-wrapper">
        <div class="home-header">
            <div class="left">
                <span class="title">视联网监管大模型</span>
                <span class="info">芯片：昇腾910B I 模型参数量：百亿</span>
            </div>
            <div class="right">
                <img class="user-img" src="@/assets/user.png" alt="" />
            </div>
        </div>
        <div class="home-body">
            <div class="left">
                <div class="title">监管条例细则展示</div>
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
                    <FileUpload />
                </div>
                <div class="chat-content">
                    <ChatBox />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileUpload from './components/fileUpload';
import ChatBox from './components/chatBox';

export default {
    components: {
        FileUpload,
        ChatBox
    },
    data() {
        return {
            file: null,
            progress: null
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
