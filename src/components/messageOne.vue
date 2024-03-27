<template>
  <div
    :class="yangshi == 0 ? 'message messageIn' : 'message messageOut'"
    v-show="meShow"
    :style="{
      backgroundColor: tranColor,
      color: getComplementColor(tranColor),
    }"
    @click="handleColse"
  >
    <div class="textBox">{{ message }}</div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  message: String,
  color: String,
});
const message = computed(() => props.message);
const emits = defineEmits(["click"]);
// 传输的颜色
const tranColor = computed(() => props.color);
const meShow = ref(true);
const yangshi = ref(0);
const changeShow = () => {
  setTimeout(() => {
    yangshi.value = 1;
  }, 2500);
  setTimeout(() => {
    meShow.value = false;
  }, 3000);
};
// 判断颜色格式
const isRgbColor = (color: string) => {
  // RGB格式的正则表达式
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  const rgbaRegex =
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1}|0\.\d+)\)$/;
  // 检查RGB或RGBA格式
  if (rgbRegex.test(color) || rgbaRegex.test(color)) {
    return "rgb";
  }

  // 十六进制格式的正则表达式
  const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  // 检查十六进制格式
  if (hexRegex.test(color)) {
    return "hex";
  }
  // 如果都不是，返回false
  return false;
};
// hex转rgb
const hexToRgb = (hex: string) => {
  // 去除字符串前面的 '#'
  hex = hex.replace("#", "");

  // 如果颜色代码只有三位（例如：#fff），则转换为六位（例如：#ffffff）
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // 将十六进制颜色拆分为RGB三个分量
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 返回RGB对象或字符串，根据需要调整
  // return {
  //     r: r,
  //     g: g,
  //     b: b
  // };
  // 如果需要返回字符串格式，可以使用以下代码
  return `rgb(${r}, ${g}, ${b})`;
};
// 获取补色
const getComplementColor = (rgbString: string | undefined) => {
  if (!rgbString) return;
  let a = isRgbColor(rgbString);
  if (a == "hex") {
    rgbString = hexToRgb(rgbString);
  }
  // 正则表达式用于匹配rgb格式中的数值
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const result = rgbString.match(rgbRegex);

  // 如果没有匹配到有效的rgb格式，则返回错误
  if (!result) {
    throw new Error(
      'Invalid RGB color format. Expected "rgb(R, G, B)" format.'
    );
  }

  // 提取红色、绿色和蓝色的数值
  const r = parseInt(result[1], 10);
  const g = parseInt(result[2], 10);
  const b = parseInt(result[3], 10);

  // 计算补色的RGB值
  const complementR = 255 - r;
  const complementG = 255 - g;
  const complementB = 255 - b;

  // 格式化补色为"rgb(R, G, B)"字符串
  const complementColor = `rgb(${complementR}, ${complementG}, ${complementB})`;
  return complementColor;
};
const handleColse = () => {
  emits("click");
};
changeShow();
</script>
<style scoped>
.message {
  color: rgb(36, 21, 40);
  min-width: 200px;
  width: auto;
  height: 70px;
  background-color: rgba(17, 153, 20, 0.9);
  position: absolute;
  top: 50px;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.messageIn {
  animation: mShow 0.5s;
}
.messageOut {
  animation: mNoShow 0.5s;
  animation-fill-mode: forwards;
}

@keyframes mShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes mNoShow {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
