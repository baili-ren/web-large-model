<template>
    <div class="file-upload-wrapper">
        <input
            ref="fileInput"
            v-show="false"
            type="file"
            @change="handleFileUpload"
        />
        <meg-button
            class="upload-btn"
            type="primary"
            icon="upload"
            @click="chooseFile"
            v-show="!fileList.length"
            >上传文件</meg-button
        >
        <div class="file-content">
            <div
                v-for="(item, index) in fileList"
                :key="index + 'file'"
                class="file-info"
            >
                <div class="name" :title="item.fileName">
                    {{ item.fileName }}
                </div>
                <span class="view-btn" @click="handleDownLoadFile(index + 1)"
                    >查看</span
                >
                <img
                    class="close-btn"
                    src="@/assets/close.png"
                    alt=""
                    @click="handleDeleteFile(index)"
                />
                <a
                    :href="item.fileUrl"
                    :ref="`downloadRef-${index + 1}`"
                    target="_blank"
                    v-show="false"
                ></a>
            </div>
            <div class="progress" v-show="showProgress">{{ progress }}%</div>
        </div>
    </div>
</template>

<script>
import { fileNameMap } from "@/constants/enums";
export default {
    data() {
        return {
            // file: null,
            fileList: [],
            progress: null,
            action: "https://fakeuploadservice.com/upload", //TODO: 记得换
        };
    },
    computed: {
        showProgress() {
            return this.progress && this.progress < 100;
        },
    },
    methods: {
        chooseFile() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            event.target.value = "";
            this.fileList.push({
                fileName: file.name,
                fileSize: (file.size / (1024 * 1024)).toFixed(2),
            });
            setTimeout(() => {
                this.updateRules();
            }, 2000);

            // this.uploadFile(file);
        },
        uploadFile(file) {
            let formData = new FormData();
            formData.append("file", file);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.action, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    this.progress = Math.round(
                        (event.loaded / event.total) * 100
                    );
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    let responseData = JSON.parse(xhr.responseText);
                    const lastIndex = this.fileList.length - 1;
                    const fileName = this.fileList[lastIndex].fileName;
                    const fileSize = this.fileList[lastIndex].fileSize;
                    const fileUrl = responseData.data.url || null;
                    const newFile = {
                        fileName: fileName,
                        fileSize: fileSize,
                        fileUrl: fileUrl,
                    };

                    this.fileList.splice(lastIndex, 1, newFile);
                    console.log("File uploaded successfully:", responseData);
                    console.log("File list:", this.fileList);
                } else {
                    console.error("File upload failed");
                }
            };

            xhr.send(formData);
        },
        handleDownLoadFile(index) {
            console.log(11, this.$refs[`downloadRef-${index}`], "ref==");
            this.$refs[`downloadRef-${index}`][0].dispatchEvent(
                new MouseEvent("click")
            );
        },
        handleDeleteFile(index) {
            this.fileList.splice(index, 1);
            this.updateRules();
        },

        updateRules() {
            let rules = [];
            this.fileList.forEach((item) => {
                const arr = fileNameMap[item.fileName] || [];
                rules = rules.concat(arr);
            });
            this.$emit("returnRules", rules);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
