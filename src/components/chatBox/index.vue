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
                            v-if="message.type === 'image'"
                            :src="message.content"
                            class="message-image"
                            alt="Image"
                            @click="handleZoomImg(message.content)"
                        />
                        <div
                            v-if="message.type === 'imagesAndText'"
                            class="message-images-text"
                        >
                            <div class="images">
                                <img
                                    v-for="(image, index) in message.content
                                        .images"
                                    class="input-image"
                                    :key="index + 'img'"
                                    :src="image"
                                    alt=""
                                    @click="handleZoomImg(image)"
                                />
                            </div>
                            <div class="text">{{ message.content.text }}</div>
                        </div>
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

                        <div
                            v-if="message.type === 'loading'"
                            class="message-loading"
                        >
                            <span class="loading-text">
                                {{ message.content }}</span
                            >
                            <div class="loading-dots-box">
                                <span class="loading-dot"></span>
                                <span class="loading-dot"></span>
                                <span class="loading-dot"></span>
                            </div>
                        </div>
                        <img
                            v-if="message.type === 'image'"
                            :src="message.content"
                            class="message-image"
                            alt="Image"
                            @click="handleZoomImg(message.content)"
                        />

                        <div
                            v-if="message.type === 'imagesAndText'"
                            class="message-images-text"
                        >
                            <div
                                class="image-text"
                                v-for="(item, index) in message.content"
                                :key="index + 'image-text'"
                            >
                                <img
                                    v-if="item.image"
                                    class="output-image"
                                    :src="item.image"
                                    alt=""
                                    @click="handleZoomImg(item.image)"
                                />
                                <div v-if="item.text" class="text">
                                    {{ item.text }}
                                </div>
                            </div>
                        </div>

                        <TemplateDatabase
                            :content="message.content"
                            v-if="message.type === 'database'"
                        />
                        <TemplateOnline
                            :content="message.content"
                            v-if="message.type === 'online'"
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
                multiple
            />
        </div>

        <div v-if="showImgMask" class="zoom-img-mask" @click="closeImgMask">
            <img
                class="close-icon"
                src="@/assets/close2.png"
                alt=""
                @click="closeImgMask"
            />
            <img class="zoom-img" :src="currZooImg" alt="" />
        </div>
    </div>
</template>

<script>
import TemplateDatabase from "./components/templateDatabase";
import TemplateOnline from "./components/templateOnline";
import { ModelType } from "@/constants/enums";
import structureImage from "@/assets/structureAnswer.png";

export default {
    components: {
        TemplateDatabase,
        TemplateOnline,
    },
    props: {
        rules: {
            type: Array,
            default: () => [],
        },
        firstMessage: {
            type: String,
            default: "hello",
        },
    },
    data() {
        return {
            currentMessage: "",
            minHeight: "50px", // 最小高度
            maxHeight: "150px", // 最大高度
            inputHeight: "50px", // 初始高度
            messages: [
                // type: text, image, database, online, imagesAndText
                // { content: "Hello", type: "text", sender: "me" },
                // { content: "Hi,there!", type: "text", sender: "other" },
                // { content: [], type: "database", sender: "other" },
                // { content: [], type: "online", sender: "other" },
                // { content: [], type: "imagesAndText", sender: "other" },
            ],
            historyMessages: {
                inputImgs: [],
                messages: [
                    // {content: "描述图片内容", sender: "me"},
                    // {content: "图片的描述", sender: "other"},
                    // {content: "问题1", sender: "me"},
                    // {content: "回答1", sender: "other"},
                    // {content: "问题2", sender: "me"},
                ],
            },
            currStructureImgs: [],
            editorOption: {
                theme: "bubble",
            },
            loading: false,
            loadingDots: "",
            showImgMask: false,
            currZooImg: null,
        };
    },
    computed: {
        modelType() {
            const { modelType = ModelType.senmantics } = this.$route.query;
            return modelType;
        },
    },
    mounted() {
        this.scrollToBottom();
        this.initMessages();
    },
    methods: {
        initMessages() {
            const message = {
                content: this.firstMessage,
                type: "text",
                sender: "other",
            };
            this.messages.push(message);
        },
        scrollToBottom() {
            this.$refs.messagesEnd.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        },
        adjustInputHeight() {
            const input = this.$refs.inputField;
            input.style.height = this.minHeight;
            input.style.height =
                Math.min(input.scrollHeight, parseInt(this.maxHeight)) + "px";
            this.inputHeight = input.style.height;
        },

        handleZoomImg(img) {
            this.showImgMask = true;
            this.currZooImg = img;
            console.log(this.currZooImg, "img");
        },
        closeImgMask() {
            this.showImgMask = false;
            this.currZooImg = "";
        },

        async sendMessage() {
            switch (this.modelType) {
                case ModelType.senmantics:
                    await this.senmanticsChat();
                    break;
                case ModelType.scene:
                    await this.fakeChat();
                    break;
                case ModelType.structure:
                    await this.structureChat();
                    break;
                case ModelType.video:
                    await this.videoChat();
                    break;
                default:
                    break;
            }
        },
        openFilePicker() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            if (this.loading) {
                return;
            }
            const files = event.target.files;
            if (files && files.length > 0) {
                const imagePromises = [];
                Array.from(files).forEach((file) => {
                    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                        const promise = new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                resolve(reader.result);
                            };
                            reader.readAsDataURL(file);
                        });
                        imagePromises.push(promise);
                    }
                });

                Promise.all(imagePromises).then((imageList) => {
                    switch (this.modelType) {
                        case ModelType.senmantics:
                            this.senmanticsChatImages(imageList);
                            break;
                        case ModelType.scene:
                            this.sceneChatImages(imageList);
                            break;
                        case ModelType.structure:
                            this.structureChatImages(imageList);
                            break;
                        case ModelType.video:
                            this.videoChatImages(imageList);
                            break;
                        default:
                            break;
                    }
                });
            }
        },

        // 语义识别
        async senmanticsChat() {
            if (this.currentMessage === "" || this.loading) {
                return;
            }

            if (this.historyMessages.inputImgs.length <= 0) {
                this.fakeChat();
                return;
            }

            const currentMessage = this.currentMessage.trim();
            this.currentMessage = "";
            this.inputHeight = "5rem";
            setTimeout(() => this.scrollToBottom(), 100);
            this.messages.push({
                content: currentMessage,
                type: "text",
                sender: "me",
            });

            this.historyMessages.messages.push({
                content: currentMessage,
                sender: "me",
            });

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            try {
                const res = await this.$axios({
                    method: "post",
                    url: "/description",
                    data: {
                        input_img: this.historyMessages.inputImgs,
                        messages: this.historyMessages.messages,
                    },
                });

                // mock test
                // const res = await this.$axios({
                //     method: "post",
                //     url: "/web-mock/description",
                //     data: {
                //         input_img: this.historyMessages.inputImgs,
                //         message: this.historyMessages.messages,
                //     },
                // });

                console.log(res.data, "res===");
                const answerText = res.data.answer || [];

                this.historyMessages.messages.push({
                    content: answerText,
                    sender: "other",
                });

                let answer = {};
                let content = [];
                for (let i = 0; i < answerText.length; i++) {
                    content.push({
                        // image: imageList[i],
                        text: answerText[i] || "",
                    });
                }
                answer = {
                    content: content,
                    type: "imagesAndText",
                    sender: "other",
                };

                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1, answer);
                }
            } catch (error) {
                console.error("失败：", error);
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }

                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
            } finally {
                this.loading = false;
            }
        },
        // 场景识别
        async sceneChat() {},
        // 结构化分析
        async structureChat() {
            if (this.currentMessage === "" || this.loading) {
                return;
            }

            if (this.currStructureImgs.length <= 0) {
                this.fakeChat();
                return;
            }

            const currentMessage = this.currentMessage.trim();
            this.currentMessage = "";
            this.inputHeight = "5rem";
            setTimeout(() => this.scrollToBottom(), 100);
            this.messages.push({
                content: currentMessage,
                type: "text",
                sender: "me",
            });

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            try {
                const res = await this.$axios({
                    method: "post",
                    url: "/detection",
                    data: {
                        input_img: this.currStructureImgs,
                        usr_question: currentMessage,
                    },
                });

                // mock test
                // const res = await this.$axios({
                //     method: "post",
                //     url: "/web-mock/structure",
                //     data: {
                //         input_img: this.currStructureImgs,
                //         usr_question: currentMessage,
                //     },
                // });

                console.log(res.data, "res===");

                let outImgs = [];
                if (Array.isArray(res.data.output_img)) {
                    outImgs = res.data.output_img;
                }
                if (typeof res.data.output_img == "string") {
                    outImgs.push(res.data.output_img);
                }

                let answer = {};
                let content = [];
                for (let i = 0; i < outImgs.length; i++) {
                    content.push({
                        image: outImgs[i],
                    });
                }
                answer = {
                    content: content,
                    type: "imagesAndText",
                    sender: "other",
                };

                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1, answer);
                }
            } catch (error) {
                console.error("失败：", error);
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }

                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
            } finally {
                this.loading = false;
            }
        },
        // 视频检索
        async videoChat() {
            if (this.currentMessage === "" || this.loading) {
                return;
            }
            const currentMessage = this.currentMessage.trim();
            this.currentMessage = "";
            this.inputHeight = "50px";
            setTimeout(() => this.scrollToBottom(), 100);
            this.messages.push({
                content: currentMessage,
                type: "text",
                sender: "me",
            });

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            try {
                const res = await this.$axios({
                    method: "post",
                    url: "/kitchen",
                    data: {
                        origin_rules: this.rules,
                        usr_question: currentMessage,
                    },
                });

                // mock test
                // const res = await this.$axios({
                //     method: "post",
                //     url: "/web-mock/question",
                //     data: {
                //         origin_rules: this.rules,
                //         usr_question: currentMessage,
                //     },
                // });

                console.log(res.data, "res===");

                const infos = res.data.infos || [];
                const template = res.data.template || "text";
                const answerText = res.data.answer || "";

                let answer = {};

                // 特殊场景兼容
                if (answerText && !infos.length) {
                    answer = {
                        content: answerText,
                        type: "text",
                        sender: "other",
                    };
                } else {
                    answer = {
                        content: infos,
                        type: template,
                        sender: "other",
                    };
                }

                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1, answer);
                }
            } catch (error) {
                console.error("失败：", error);
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }

                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
            } finally {
                this.loading = false;
            }
        },

        async fakeChat() {
            if (this.currentMessage === "" || this.loading) {
                return;
            }
            const currentMessage = this.currentMessage.trim();
            this.currentMessage = "";
            this.inputHeight = "50px";
            setTimeout(() => this.scrollToBottom(), 100);
            this.messages.push({
                content: currentMessage,
                type: "text",
                sender: "me",
            });

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            setTimeout(() => {
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }
                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
                this.loading = false;
            }, 2000);
        },

        async senmanticsChatImages(imageList) {
            if (imageList.length <= 0) {
                return;
            }
            this.messages.push({
                content: {
                    images: imageList,
                    text: "描述图片内容",
                },
                type: "imagesAndText",
                sender: "me",
            });
            this.scrollToBottom();

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            const inputImgs = imageList.map((item) => {
                return item.split(",")[1];
            });

            this.historyMessages = {
                inputImgs: inputImgs,
                messages: [],
            };

            try {
                const res = await this.$axios({
                    method: "post",
                    url: "/description",
                    data: {
                        input_img: this.historyMessages.inputImgs,
                        messages: this.historyMessages.messages,
                    },
                });

                // mock test
                // const res = await this.$axios({
                //     method: "post",
                //     url: "/web-mock/description",
                //     data: {
                //         input_img: this.historyMessages.inputImgs,
                //         message: this.historyMessages.messages,
                //     },
                // });

                console.log(res.data, "res===");
                const answerText = res.data.answer || [];

                this.historyMessages.messages.push({
                    content: answerText,
                    sender: "other",
                });

                let answer = {};
                let content = [];
                for (let i = 0; i < answerText.length; i++) {
                    content.push({
                        // image: imageList[i],
                        text: answerText[i] || "",
                    });
                }
                answer = {
                    content: content,
                    type: "imagesAndText",
                    sender: "other",
                };

                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1, answer);
                }
            } catch (error) {
                console.error("失败：", error);
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }

                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
            } finally {
                this.loading = false;
            }
        },

        async sceneChatImages(imageList) {
            if (imageList.length > 0) {
                this.messages.push({
                    content: {
                        images: imageList,
                        text: "描述上传图片场景",
                    },
                    type: "imagesAndText",
                    sender: "me",
                });
                this.scrollToBottom();
            }

            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            const inputImgs = imageList.map((item) => {
                return item.split(",")[1];
            });

            try {
                const res = await this.$axios({
                    method: "post",
                    url: "/scene",
                    data: {
                        input_img: inputImgs,
                    },
                });

                // mock test
                // const res = await this.$axios({
                //     method: "post",
                //     url: "/web-mock/scene",
                //     data: {
                //         input_img: inputImgs,
                //     },
                // });

                console.log(res.data, "res===");
                const answerText = res.data.answer || [];

                let answer = {};

                let content = [];
                for (let i = 0; i < imageList.length; i++) {
                    content.push({
                        image: imageList[i],
                        text: answerText[i] || "",
                    });
                }
                answer = {
                    content: content,
                    type: "imagesAndText",
                    sender: "other",
                };

                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1, answer);
                }
            } catch (error) {
                console.error("失败：", error);
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }

                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
            } finally {
                this.loading = false;
            }
        },

        async structureChatImages(imageList) {
            if (imageList.length > 0) {
                this.messages.push({
                    content: {
                        images: imageList,
                    },
                    type: "imagesAndText",
                    sender: "me",
                });
                this.scrollToBottom();
            }
            this.currStructureImgs = imageList;
        },

        async structureChatImages2(imageList) {
            if (imageList.length > 0) {
                this.messages.push({
                    content: {
                        images: imageList,
                        text: "上传图片，对图像进行结构化分析",
                    },
                    type: "imagesAndText",
                    sender: "me",
                });
                this.scrollToBottom();
            }
            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            setTimeout(() => {
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }
                this.messages.push({
                    content: [
                        {
                            image: structureImage,
                            text: "该图片展示了对应检测分割结果，请查看",
                        },
                    ],
                    type: "imagesAndText",
                    sender: "other",
                });
                this.loading = false;
            }, 6000);
        },

        videoChatImages(imageList) {
            if (imageList.length > 0) {
                this.messages.push({
                    content: {
                        images: imageList,
                        text: "",
                    },
                    type: "imagesAndText",
                    sender: "me",
                });
                this.scrollToBottom();
            }
            this.loading = true;
            this.messages.push({
                content: "分析中, 请稍后",
                type: "loading",
                sender: "other",
            });

            setTimeout(() => {
                const loadingIndex = this.messages.findIndex(
                    (msg) => msg.type === "loading"
                );
                if (loadingIndex !== -1) {
                    this.messages.splice(loadingIndex, 1);
                }
                this.messages.push({
                    content: "分析失败，请重试",
                    type: "text",
                    sender: "other",
                });
                this.loading = false;
            }, 2000);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
