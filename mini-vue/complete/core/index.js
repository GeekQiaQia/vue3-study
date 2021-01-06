// 入口
import { watchEffect } from "./reactivity/index.js";
import { mountElement, diff } from "./renderer.js";

export function createApp(rootComponent) {
  const app = {
    mount(rootContainer) {
      const setupResult = rootComponent.setup();
      let isMounted = false;
      let prevSubTree;
      watchEffect(() => {
        if (!isMounted) {
          // mount
          const subTree = rootComponent.render(setupResult);
          prevSubTree = subTree;
          mountElement(subTree, rootContainer);
          isMounted = true;

        } else {
          // update
          const subTree = rootComponent.render(setupResult);
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
  return app;
}
