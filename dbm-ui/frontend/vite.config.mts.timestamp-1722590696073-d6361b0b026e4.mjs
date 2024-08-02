// vite.config.mts
import { resolve } from "path";
import AutoImport from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/vite/dist/node/index.js";
import ViteHTMLEnv from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/vite-plugin-html-env/lib/index.js";
import monacoEditorPlugin from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/vite-plugin-monaco-editor/dist/index.js";
import { viteStaticCopy } from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/vite-plugin-static-copy/dist/index.js";
import basicSsl from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import vue from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/projects/blueking-dbm/dbm-ui/frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\projects\\blueking-dbm\\dbm-ui\\frontend";
var uniqueKey = `${(/* @__PURE__ */ new Date()).getTime()}.1e78f18e-01c1-11ed-b939-0242ac120002`;
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isHttps = mode === "https";
  return {
    base: env.VITE_PUBLIC_PATH,
    define: {
      __RESOURCE_UNIQUE_KEY__: JSON.stringify(uniqueKey)
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@services": resolve(__vite_injected_original_dirname, "src/services"),
        "@hooks": resolve(__vite_injected_original_dirname, "src/hooks"),
        "@router": resolve(__vite_injected_original_dirname, "src/router"),
        "@stores": resolve(__vite_injected_original_dirname, "src/stores"),
        "@common": resolve(__vite_injected_original_dirname, "src/common"),
        "@components": resolve(__vite_injected_original_dirname, "src/components"),
        "@views": resolve(__vite_injected_original_dirname, "src/views"),
        "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
        "@helper": resolve(__vite_injected_original_dirname, "src/helper"),
        "@types": resolve(__vite_injected_original_dirname, "src/types"),
        "@styles": resolve(__vite_injected_original_dirname, "src/styles"),
        "@locales": resolve(__vite_injected_original_dirname, "src/locales"),
        "@images": resolve(__vite_injected_original_dirname, "src/images"),
        "@lib": resolve(__vite_injected_original_dirname, "lib"),
        "@patch": resolve(__vite_injected_original_dirname, "patch")
      },
      extensions: [".tsx", ".ts", ".js"]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "@styles/variables";'
          // 全局导入变量
        },
        css: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vueJsx(),
      vue({
        script: {
          defineModel: true
        }
      }),
      AutoImport({
        // 生成自动引入 eslintrc 配置
        eslintrc: {
          enabled: false,
          filepath: "./src/types/.eslintrc-auto-import.json"
        },
        imports: ["vue", "vue-router"],
        // 自动导入 vue、vue-router
        dts: "./src/types/auto-imports.d.ts"
        // 自动导出 ts types
      }),
      viteStaticCopy({
        targets: [
          {
            src: "src/images/monitoring.png",
            dest: "./",
            rename: uniqueKey
          },
          {
            src: "lib",
            dest: "./"
          }
        ]
      }),
      monacoEditorPlugin.default({}),
      ViteHTMLEnv({
        prefix: "{{",
        suffix: "}}",
        envPrefixes: ["VITE_"]
      })
    ].concat(isHttps ? [basicSsl()] : []),
    build: {
      sourcemap: true,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    },
    optimizeDeps: {
      exclude: ["@blueking/ip-selector/dist/vue3.x.js", "lib/"]
    },
    server: {
      strictPort: true,
      host: "127.0.0.1",
      port: 8088,
      proxy: {
        "/bkrepo_upload": {
          target: "",
          // 见获取bkrepo上传凭证接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bkrepo_upload/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcYmx1ZWtpbmctZGJtXFxcXGRibS11aVxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcYmx1ZWtpbmctZGJtXFxcXGRibS11aVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3RzL2JsdWVraW5nLWRibS9kYm0tdWkvZnJvbnRlbmQvdml0ZS5jb25maWcubXRzXCI7LypcbiAqIFRlbmNlbnRCbHVlS2luZyBpcyBwbGVhc2VkIHRvIHN1cHBvcnQgdGhlIG9wZW4gc291cmNlIGNvbW11bml0eSBieSBtYWtpbmcgXHU4NEREXHU5Q0I4XHU2NjdBXHU0RTkxLURCXHU3QkExXHU3NDA2XHU3Q0ZCXHU3RURGKEJsdWVLaW5nLUJLLURCTSkgYXZhaWxhYmxlLlxuICpcbiAqIENvcHlyaWdodCAoQykgMjAxNy0yMDIzIFRITCBBMjkgTGltaXRlZCwgYSBUZW5jZW50IGNvbXBhbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkXG4gKiBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yXG4gKiB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IFZpdGVIVE1MRW52IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwtZW52JztcbmltcG9ydCBtb25hY29FZGl0b3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcblxuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuXG4vLyBcdTc1MjhcdTRFOEVcdTUyMjRcdTY1QURcdTUyNERcdTdBRUZcdThENDRcdTZFOTBcdTY2RjRcdTY1QjBcbmNvbnN0IHVuaXF1ZUtleSA9IGAke25ldyBEYXRlKCkuZ2V0VGltZSgpfS4xZTc4ZjE4ZS0wMWMxLTExZWQtYjkzOS0wMjQyYWMxMjAwMDJgO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gIGNvbnN0IGlzSHR0cHMgPSBtb2RlID09PSAnaHR0cHMnO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEgsXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX1JFU09VUkNFX1VOSVFVRV9LRVlfXzogSlNPTi5zdHJpbmdpZnkodW5pcXVlS2V5KSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICAgJ0BzZXJ2aWNlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NlcnZpY2VzJyksXG4gICAgICAgICdAaG9va3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgICAnQHJvdXRlcic6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3JvdXRlcicpLFxuICAgICAgICAnQHN0b3Jlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlcycpLFxuICAgICAgICAnQGNvbW1vbic6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbW1vbicpLFxuICAgICAgICAnQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAgICdAdmlld3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy92aWV3cycpLFxuICAgICAgICAnQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcbiAgICAgICAgJ0BoZWxwZXInOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9oZWxwZXInKSxcbiAgICAgICAgJ0B0eXBlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3R5cGVzJyksXG4gICAgICAgICdAc3R5bGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3R5bGVzJyksXG4gICAgICAgICdAbG9jYWxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xvY2FsZXMnKSxcbiAgICAgICAgJ0BpbWFnZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbWFnZXMnKSxcbiAgICAgICAgJ0BsaWInOiByZXNvbHZlKF9fZGlybmFtZSwgJ2xpYicpLFxuICAgICAgICAnQHBhdGNoJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYXRjaCcpLFxuICAgICAgfSxcbiAgICAgIGV4dGVuc2lvbnM6IFsnLnRzeCcsICcudHMnLCAnLmpzJ10sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkBzdHlsZXMvdmFyaWFibGVzXCI7JywgLy8gXHU1MTY4XHU1QzQwXHU1QkZDXHU1MTY1XHU1M0Q4XHU5MUNGXG4gICAgICAgIH0sXG4gICAgICAgIGNzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgdnVlKHtcbiAgICAgICAgc2NyaXB0OiB7XG4gICAgICAgICAgZGVmaW5lTW9kZWw6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAvLyBcdTc1MUZcdTYyMTBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjUgZXNsaW50cmMgXHU5MTREXHU3RjZFXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgZmlsZXBhdGg6ICcuL3NyYy90eXBlcy8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IHZ1ZVx1MzAwMXZ1ZS1yb3V0ZXJcbiAgICAgICAgZHRzOiAnLi9zcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxRkEgdHMgdHlwZXNcbiAgICAgIH0pLFxuICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnc3JjL2ltYWdlcy9tb25pdG9yaW5nLnBuZycsXG4gICAgICAgICAgICBkZXN0OiAnLi8nLFxuICAgICAgICAgICAgcmVuYW1lOiB1bmlxdWVLZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdsaWInLFxuICAgICAgICAgICAgZGVzdDogJy4vJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICBtb25hY29FZGl0b3JQbHVnaW4uZGVmYXVsdCh7fSksXG4gICAgICBWaXRlSFRNTEVudih7XG4gICAgICAgIHByZWZpeDogJ3t7JyxcbiAgICAgICAgc3VmZml4OiAnfX0nLFxuICAgICAgICBlbnZQcmVmaXhlczogWydWSVRFXyddLFxuICAgICAgfSksXG4gICAgXS5jb25jYXQoaXNIdHRwcyA/IFtiYXNpY1NzbCgpXSA6IFtdKSxcbiAgICBidWlsZDoge1xuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICAgIGlnbm9yZVRyeUNhdGNoOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGV4Y2x1ZGU6IFsnQGJsdWVraW5nL2lwLXNlbGVjdG9yL2Rpc3QvdnVlMy54LmpzJywgJ2xpYi8nXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgIGhvc3Q6ICcxMjcuMC4wLjEnLFxuICAgICAgcG9ydDogODA4OCxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYmtyZXBvX3VwbG9hZCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICcnLCAvLyBcdTg5QzFcdTgzQjdcdTUzRDZia3JlcG9cdTRFMEFcdTRGMjBcdTUxRURcdThCQzFcdTYzQTVcdTUzRTNcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9ia3JlcG9fdXBsb2FkLywgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBYUEsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sd0JBQXdCO0FBQy9CLFNBQVMsc0JBQXNCO0FBRS9CLE9BQU8sY0FBYztBQUNyQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBdEJuQixJQUFNLG1DQUFtQztBQXlCekMsSUFBTSxZQUFZLElBQUcsb0JBQUksS0FBSyxHQUFFLFFBQVEsQ0FBQztBQUV6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFFBQU0sVUFBVSxTQUFTO0FBRXpCLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSTtBQUFBLElBQ1YsUUFBUTtBQUFBLE1BQ04seUJBQXlCLEtBQUssVUFBVSxTQUFTO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsUUFDN0IsYUFBYSxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUM5QyxVQUFVLFFBQVEsa0NBQVcsV0FBVztBQUFBLFFBQ3hDLFdBQVcsUUFBUSxrQ0FB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
