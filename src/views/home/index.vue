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
                <meg-input
                    v-model="searchKey"
                    placeholder="搜索历史记录"
                    @pressEnter="handleSearch"
                >
                    <img
                        slot="suffix"
                        class="search-icon"
                        src="@/assets/search.svg"
                        alt=""
                        @click="handleSearch"
                    />
                </meg-input>
                <div class="rules-content">
                    <div
                        v-for="(item, index) in ruleList"
                        :key="index + 'rule'"
                        class="content-item"
                        :title="item"
                    >
                        <img class="pre-icon" src="@/assets/chat.png" alt="" />
                        <span class="label">{{ item }}</span>
                        <img
                            class="suffix-icon"
                            src="@/assets/close.png"
                            alt=""
                            @click="handleRemoveRule(index)"
                        />
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="upload-content">
                    <div class="title">选择监管文件</div>
                    <FileUpload @returnRules="returnRules" />
                </div>
                <div class="chat-content">
                    <ChatBox />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileUpload from "./components/fileUpload";
import ChatBox from "./components/chatBox";

export default {
    components: {
        FileUpload,
        ChatBox,
    },
    data() {
        return {
            ruleList: [],
            searchKey: [],
        };
    },
    computed: {
        // TODO: 重新上传文件后，条例
        fliterRules() {
            return this.ruleList;
        },
    },
    mounted() {
        this.$axios({
            method: "post",
            url: "/web-mock/question",
            data: {},
        }).then((res) => {
            console.log(res);
        });

        this.$axios({
            method: "post",
            url: "/api",
            data: {
                origin_rules: ["员工进入厨房工作时需佩戴厨师帽"],
                usr_question: "今天有没有人未佩戴厨师帽",
            },
        }).then((res) => {
            console.log(res);
        });
    },
    methods: {
        returnRules(res) {
            this.ruleList = res;
        },
        handleRemoveRule(index) {
            this.ruleList.splice(index, 1);
        },

        handleSearch() {
            console.log(this.searchKey, "key===");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
