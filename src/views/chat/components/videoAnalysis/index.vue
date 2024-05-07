<template>
    <div class="video-analysis-wrapper">
        <div class="left-sider">
            <div class="title">条例细则</div>
            <FileUpload @returnRules="returnRules" />
            <meg-input
                class="search-input"
                v-model="searchKey"
                placeholder="搜索条例"
                @pressEnter="handleSearchRules"
            >
                <img
                    slot="suffix"
                    class="search-icon"
                    src="@/assets/search.svg"
                    alt=""
                    @click="handleSearchRules"
                />
            </meg-input>
            <div class="rules-content">
                <div
                    v-for="(item, index) in filterRules"
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
        <ChatBox class="chat-box" :rules="ruleList" />
    </div>
</template>

<script>
import ChatBox from "@/components/chatBox";
import FileUpload from "@/components/fileUpload";

export default {
    components: {
        FileUpload,
        ChatBox,
    },
    data() {
        return {
            ruleList: [],
            searchKey: "",
        };
    },
    computed: {
        // TODO: 重新上传文件后，条例
        filterRules() {
            return this.ruleList.filter((str) => {
                return str.includes(this.searchKey);
            });
        },
    },
    mounted() {},
    methods: {
        returnRules(res) {
            this.ruleList = res;
        },
        handleRemoveRule(index) {
            this.ruleList.splice(index, 1);
        },

        handleSearchRules() {
            console.log(this.searchKey, "key===");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
