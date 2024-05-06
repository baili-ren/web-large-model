<template>
    <div class="tabs-box">
        <div
            class="tab-item"
            :class="{ 'tab-item-selected': tabKey === item.value }"
            v-for="item in tabConfig"
            :key="item.value"
            @click="handleTabsChange(item.value)"
        >
            <div class="tab-item-label" :ref="`tab-${item.value}`">
                {{ item.label }}
            </div>
            <div
                :style="{ width: lineWidth }"
                v-show="tabKey === item.value"
                class="tab-item-line"
            ></div>
        </div>
    </div>
</template>

<script>
import { ModelType } from "@/constants/enums";
export default {
    name: "PageTabs",
    props: {
        tabConfig: {
            type: Array,
        },
        defaultKey: {
            type: String,
            default: ModelType.senmantics,
        },
    },
    data() {
        return {
            tabKey: null,
            lineWidth: null,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.tabKey = this.defaultKey;
            this.lineWidth =
                this.$refs[`tab-${this.defaultKey}`][0].offsetWidth + "px" ||
                "64px";
        });
    },
    methods: {
        handleTabsChange(v) {
            this.tabKey = v;
            this.lineWidth = this.$refs[`tab-${v}`][0].offsetWidth + "px";
            this.$emit("tabChange", this.tabKey);
        },
    },
};
</script>
<style lang="scss" scoped>
.tabs-box {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;

    .tab-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 30px;
        margin-right: 40px;
        font-size: 16px;
        font-weight: 500;

        &:hover {
            cursor: pointer;
            color: #3373ea;
        }

        &-label {
            font-size: 16px;
            font-weight: 500;
            white-space: nowrap;
        }

        &-line {
            position: absolute;
            bottom: 0;
            width: 64px;
            height: 2px;
            background-color: #3373ea;
            border-radius: 2px;
        }
    }
    .tab-item-selected {
        color: #3373ea;
    }
}
</style>
