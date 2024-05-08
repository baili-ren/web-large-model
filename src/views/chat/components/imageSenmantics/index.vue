<template>
    <div class="image-senmantics-wrapper">
        <ChatBox :firstMessage="firstMessage" class="chat-box" />
    </div>
</template>

<script>
import ChatBox from "@/components/chatBox";

export default {
    components: {
        ChatBox,
    },
    data() {
        return {
            firstMessage: "这里是语义识别，欢迎提问",
        };
    },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
