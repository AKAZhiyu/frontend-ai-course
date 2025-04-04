import { ppt } from "@/router/enums";
const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/checkHw",
  redirect: "/checkHw/index",
  meta: {
    icon: "ri:file-check-line",
    title: "作业批改",
    rank: ppt
  },
  children: [
    {
      path: "/checkHw/index",
      name: "checkHw",
      component: IFrame,
      meta: {
        title: "作业批改",
        keepAlive: true,
        // frameSrc: "http://127.0.0.1:5173/",
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
