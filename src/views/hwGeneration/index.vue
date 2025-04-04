<script setup lang="ts">
import { ref, nextTick } from "vue";
import Vditor from "./components/Vditor.vue";
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";
import TypeIt from "typeit";

const promptState = ref<FieldValues>({
  prompt: ""
});

const text = ref(`
# 作业将于此处生成
`);

const rules = {
  prompt: [
    {
      required: true,
      message: "请输入 Prompt",
      trigger: "blur" // 在输入框失去焦点时触发校验
    }
  ]
};

const columns: PlusColumn[] = [
  {
    label: "Prompt",
    prop: "prompt",
    valueType: "textarea",
    fieldProps: {
      placeholder: "请输入你的 Prompt",
      autosize: { minRows: 3, maxRows: 6 },
      maxlength: 200,
      showWordLimit: true
    }
  }
];

const handleSubmitError = (err: any) => {
  console.log("提交失败:", err);
};

const handleSubmit = async (values: FieldValues) => {
  console.log("提交的 Prompt:", values.prompt);
  text.value = `# 用户输入的 Prompt\n\n${values.prompt}`;

  // 清空输入并重置表单状态
  promptState.value.prompt = ""; // 清空绑定值
  await nextTick();
};

const handleReset = () => {
  promptState.value.prompt = "";
};

defineOptions({
  name: "hwGen"
});
</script>

<template>
  <el-card shadow="never" class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">输入 Prompt</h2>
      <PlusForm
        v-model="promptState"
        class="w-full"
        :columns="columns"
        :rules="rules"
        label-position="top"
        has-footer
        submit-text="提交"
        reset-text="重置"
        @submit="handleSubmit"
        @submit-error="handleSubmitError"
        @reset="handleReset"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">Markdown 展示</h2>
      <Vditor
        id="formElement-type"
        v-model="text"
        :options="{
          height: 560,
          outline: { enable: true, position: 'right' }
        }"
      />
    </div>
  </el-card>
</template>

<style scoped>
.max-w-4xl {
  max-width: 64rem;
}
.mx-auto {
  margin-right: auto;
  margin-left: auto;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
</style>
