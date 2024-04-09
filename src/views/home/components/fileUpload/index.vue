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
        <div class="file-content">
            <div
                v-for="(item, index) in fileList"
                :key="index + 'file'"
                class="file-info"
            >
                <div class="name" :title="item.fileName">
                    {{ item.fileName }}
                </div>
                <span class="view-btn" @click="handleDownLoadFile">查看</span>
                <img
                    class="close-btn"
                    src="@/assets/close.png"
                    alt=""
                    @click="handleDeleteFile(index)"
                />
                <a
                    :href="item.fileUrl"
                    ref="downloadRef"
                    target="_blank"
                    v-show="false"
                ></a>
            </div>
            <div class="progress" v-show="showProgress">{{ progress }}%</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null,
            fileList: [],
            fileUrl: null,
            progress: null,
            action: "https://megdesign-static-dev.mcd.megvii-inc.com/v1/common/upload", //TODO: 记得换
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
            this.file = event.target.files[0];
            this.fileList.push({
                fileName: this.file.name,
                fileSize: (this.file.size / (1024 * 1024)).toFixed(2),
            });
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
                    const index = this.fileList.length - 1;
                    this.fileList[index]["fileUrl"] =
                        responseData.data.url || null;
                    console.log("File uploaded successfully:", responseData);
                    console.log(this.fileList, "fileList");
                } else {
                    console.error("File upload failed");
                }
            };

            xhr.send(formData);
        },
        handleDownLoadFile() {
            this.$refs.downloadRef.dispatchEvent(new MouseEvent("click"));
        },
        handleDeleteFile(index) {
            this.fileList.splice(index, 1);
            console.log(this.fileList, "fileList");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
