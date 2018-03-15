import Chat from "./Chat.vue";

export default [
  {
    path: "/chat/:receptor?",
    name: "chat",
    component: Chat,
    meta: {
      titulo: "Chat",
      icono: "fal fa-fw fa-comments",
    },
  },
];
