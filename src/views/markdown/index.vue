<script setup lang="ts">
import { ref } from "vue";
import Vditor from "./components/Vditor.vue";
// 引入 PlusForm 相关依赖
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";

// 定义表单状态
const promptState = ref<FieldValues>({
  prompt: ""
});

// 定义 Markdown 展示状态
const text = ref(`
# 教案将于此处生成
`);

// 定义表单校验规则
const rules = {
  prompt: [
    {
      required: true,
      message: "请输入 Prompt"
    }
  ]
};

// 定义表单列配置
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

// 处理表单提交事件，将 Prompt 更新到 Markdown
const handleSubmit = (values: FieldValues) => {
  console.log("提交的 Prompt:", values.prompt);
  text.value = `# 用户输入的 Prompt\n\n${values.prompt}`; // 更新 Vditor 内容
  promptState.value.prompt = ""; // 清空表单
};

// 处理提交失败事件
const handleSubmitError = (err: any) => {
  console.log("提交失败:", err);
};

// 处理重置事件
const handleReset = () => {
  console.log("表单已重置");
  promptState.value.prompt = "";
};

defineOptions({
  name: "Markdown"
});
</script>

<template>
  <el-card shadow="never" class="max-w-4xl mx-auto">
    <!-- <template #header>
      <div class="card-header">
        <span class="font-medium">
          Markdown组件，采用开源的
          <el-link
            href="https://b3log.org/vditor/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Vditor
          </el-link>
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/markdown"
        target="_blank"
      >
        代码位置 src/views/markdown
      </el-link>
    </template> -->

    <!-- 表单部分 -->
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

    <!-- Markdown 展示部分 -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Markdown 展示</h2>
      <Vditor
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
/* 调整布局样式 */
.max-w-4xl {
  max-width: 64rem; /* 限制最大宽度 */
}

.mx-auto {
  margin-right: auto;
  margin-left: auto;
}

.mb-6 {
  margin-bottom: 1.5rem; /* 表单与 Markdown 之间的间距 */
}
</style>
