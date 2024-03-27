import { createApp } from "vue";
import MessageOne from "./messageOne.vue";
export function showMessageOne(message: string, onClick: any, color?: string) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const app = createApp(MessageOne, {
    message,
    color,
    onClick() {
      onClick(() => {
        app.unmount();
        div.remove();
      });
    },
  });
  app.mount(div);
}
