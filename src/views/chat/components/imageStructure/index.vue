<template>
    <div>
        <ChatBox class="chat-box" />
    </div>
</template>

<script>
import ChatBox from "@/components/chatBox";

export default {
    components: {
        ChatBox,
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
