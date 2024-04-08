<template>
    <div class="chat-box-wrapper">
        <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index">
                <div class="chat-messages-right" v-if="message.sender === 'me'">
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
                    <img src="@/assets/user.png" class="user-avatar" alt="" />
                </div>

                <div class="chat-messages-left" v-else>
                    <img
                        src="@/assets/robot-user.png"
                        class="robot-avatar"
                        alt=""
                    />
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
export default {
    data() {
        return {
            currentMessage: "",
            minHeight: "50px", // 最小高度
            maxHeight: "150px", // 最大高度
            inputHeight: "50px", // 初始高度
            messages: [
                { content: "Hello!", type: "text", sender: "other" },
                { content: "Hi there!", type: "text", sender: "me" },
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
                    content: this.currentMessage,
                    type: "text",
                    sender: "me",
                });
                this.messages.push({
                    content: "这是一个回答",
                    type: "text",
                    sender: "other",
                });

                this.currentMessage = "";
                setTimeout(() => this.scrollToBottom(), 100);
                this.adjustInputHeight();
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
