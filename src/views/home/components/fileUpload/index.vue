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
            type="secondary"
            icon="megui-add"
            @click="chooseFile"
            >选择文件</meg-button
        >
        <div class="file-info" v-show="showFileInfo">
            <div class="name" :title="fileInfo.name">
                {{ fileInfo.name }}
            </div>
            <span class="view-btn" @click="handleDownLoadFile">查看</span>
            <img
                class="close-btn"
                src="@/assets/close.png"
                alt=""
                @click="handleDeleteFile"
            />
            <a :href="fileUrl" ref="downloadRef" v-show="false"></a>
        </div>
        <div class="progress" v-show="showProgress">{{ progress }}%</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null,
            fileInfo: {
                name: null,
                size: null,
            },
            fileUrl: null,
            progress: null,
            action: "https://megdesign-static-dev.mcd.megvii-inc.com/v1/common/upload", //TODO: 记得换
        };
    },
    computed: {
        showFileInfo() {
            return this.fileInfo.name;
        },
        showProgress() {
            return this.progress && this.progress < 100;
        },
    },
    methods: {
        chooseFile() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.fileInfo = {
                name: this.file.name,
                size: (this.file.size / (1024 * 1024)).toFixed(2),
            };
            this.uploadFile();
        },
        uploadFile() {
            let formData = new FormData();
            formData.append("file", this.file);

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
                    this.fileUrl = responseData.data.url || null;
                    console.log("File uploaded successfully:", responseData);
                } else {
                    console.error("File upload failed");
                }
            };

            xhr.send(formData);
        },
        handleDownLoadFile() {
            this.$refs.downloadRef.dispatchEvent(new MouseEvent("click"));
        },
        handleDeleteFile() {
            this.fileInfo = {
                name: null,
                size: null,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
