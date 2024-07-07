import { App } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import defaults from "./defaults";
import themes from "./themes";

import { ru } from "vuetify/locale";
import uz from "./uz";

export function setupVuetify(app: App) {
  const vuetify = createVuetify({
    locale: {
      locale: "uz",
      fallback: "uz",
      messages: { ru, uz },
    },
    theme: {
      defaultTheme: "light",
      themes,
    },
    aliases: {
      IconBtn: components.VBtn,
    },
    defaults,
    ssr: false,
    components,
    directives,
  });

  app.use(vuetify);
}
