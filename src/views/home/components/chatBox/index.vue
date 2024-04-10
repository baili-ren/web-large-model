<template>
    <div class="chat-box-wrapper">
        <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index">
                <!-- 提问 -->
                <div class="chat-messages-user" v-if="message.sender === 'me'">
                    <img src="@/assets/user.png" class="user-avatar" alt="" />
                    <div class="message-content">
                        <div
                            v-if="message.type === 'text'"
                            class="message-text"
                        >
                            {{ message.content }}
                        </div>
                        <img
                            v-else
                            :src="message.content"
                            class="message-image"
                            alt="Image"
                        />
                    </div>
                </div>

                <!-- 回答 -->
                <div class="chat-messages-robot" v-else>
                    <img
                        src="@/assets/robot-user.png"
                        class="robot-avatar"
                        alt=""
                    />
                    <div
                        class="message-content"
                        :class="{
                            'message-content-full-width':
                                message.type === 'database' ||
                                message.type === 'online',
                        }"
                    >
                        <div
                            v-if="message.type === 'text'"
                            class="message-text"
                        >
                            {{ message.content }}
                        </div>
                        <img
                            v-if="message.type === 'image'"
                            :src="message.content"
                            class="message-image"
                            alt="Image"
                        />
                        <TemplateDatabase v-if="message.type === 'database'" />
                        <TemplateOnline v-if="message.type === 'online'" />
                    </div>
                </div>
            </div>
            <div ref="messagesEnd"></div>
            <!-- Auto scroll to bottom -->
        </div>
        <div class="input-box">
            <textarea
                class="input-field"
                :class="{ 'input-field-scroll': inputHeight === '150px' }"
                ref="inputField"
                :style="{ height: inputHeight }"
                v-model="currentMessage"
                @input="adjustInputHeight"
                @keyup.enter="sendMessage"
                placeholder="请输入问题"
            ></textarea>
            <div class="operation">
                <img
                    class="upload-btn"
                    src="@/assets/photo.png"
                    @click="openFilePicker"
                    alt=""
                />
                <img
                    class="send-btn"
                    src="@/assets/send.png"
                    @click="sendMessage"
                    alt=""
                />
            </div>

            <input
                ref="fileInput"
                type="file"
                style="display: none"
                @change="handleFileUpload"
            />
        </div>
    </div>
</template>

<script>
import TemplateDatabase from "../templateDatabase";
import TemplateOnline from "../templateOnline";

export default {
    components: {
        TemplateDatabase,
        TemplateOnline,
    },
    data() {
        return {
            currentMessage: "",
            minHeight: "50px", // 最小高度
            maxHeight: "150px", // 最大高度
            inputHeight: "50px", // 初始高度
            messages: [
                // type: text , image, chart
                { content: "Hello", type: "text", sender: "me" },
                { content: "Hi,there!", type: "text", sender: "other" },
                { content: "Hi,there!", type: "database", sender: "other" },
                { content: "Hi,there!", type: "online", sender: "other" },
            ],
            editorOption: {
                theme: "bubble",
            },
        };
    },
    methods: {
        adjustInputHeight() {
            const input = this.$refs.inputField;
            input.style.height = this.minHeight;
            input.style.height =
                Math.min(input.scrollHeight, parseInt(this.maxHeight)) + "px";
            this.inputHeight = input.style.height;
        },
        sendMessage() {
            if (this.currentMessage !== "") {
                this.messages.push({
                    content: this.currentMessage.trim(),
                    type: "text",
                    sender: "me",
                });
                // this.messages.push({
                //     content: "",
                //     type: "chart",
                //     sender: "other",
                // });

                this.messages.push({
                    content: "这是一个回答",
                    type: "text",
                    sender: "other",
                });

                this.currentMessage = "";
                this.inputHeight = "50px";
                setTimeout(() => this.scrollToBottom(), 100);
            }
        },
        openFilePicker() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.messages.push({
                        content: reader.result,
                        type: "image",
                        sender: "me",
                    });

                    console.log(reader.result, "reader.result===");
                    setTimeout(() => this.scrollToBottom(), 100);
                };
                reader.readAsDataURL(file);
            }
        },
        scrollToBottom() {
            this.$refs.messagesEnd.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        },
    },
    mounted() {
        this.scrollToBottom();
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
