import { PeactValueUI } from "./PeactValueUI";
import { isEqual } from "./utils";

export function useEeffect(callback: () => void | (() => void), deps: any[]) {
  const oldHook =
    PeactValueUI.wipFiber.alternate &&
    PeactValueUI.wipFiber.alternate.hooks &&
    PeactValueUI.wipFiber.alternate.hooks[PeactValueUI.hookIndex];

  if (oldHook && oldHook.cleaner) {
    oldHook.cleaner();
  }

  const hook = {
    deps,
    cleaner: undefined as void | (() => void),
  };

  if (!oldHook || !isEqual(oldHook.deps, deps)) {
    hook.cleaner = callback() || undefined; // 클린업 함수 저장
  }

  if (PeactValueUI.wipFiber.hooks) {
    PeactValueUI.wipFiber.hooks.push(hook);
    PeactValueUI.hookIndex++;
  }
}
