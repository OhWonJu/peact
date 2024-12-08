import { PeactValueUI } from "./PeactValueUI";

export function useState<T>(
  initial: T
): [T, (action: T | ((prevState: T) => T)) => void] {
  const oldHook =
    PeactValueUI.wipFiber?.alternate &&
    PeactValueUI.wipFiber?.alternate.hooks &&
    PeactValueUI.wipFiber?.alternate.hooks[PeactValueUI.hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [] as any,
  };

  const actions = oldHook ? oldHook.queue : [];

  actions.forEach((action: any) => {
    // action이 함수인지 확인 후 처리
    hook.state =
      typeof action === "function"
        ? (action as (prevState: T) => T)(hook.state)
        : action;
  });

  if (PeactValueUI.wipFiber && PeactValueUI.wipFiber.hooks) {
    PeactValueUI.wipFiber.hooks.push(hook);
    PeactValueUI.hookIndex++;
  }

  const setState = (action: T | ((prevState: T) => T)) => {
    const newState =
      typeof action === "function"
        ? (action as (prevState: T) => T)(hook.state)
        : action;

    // 상태가 변경되었을 때만 큐에 추가하고 리렌더링
    if (newState !== hook.state) {
      hook.queue.push(action);

      PeactValueUI.wipRoot = {
        dom: PeactValueUI.currentRoot.dom,
        props: PeactValueUI.currentRoot.props,
        alternate: PeactValueUI.currentRoot,
      };

      PeactValueUI.nextUnitOfWork = PeactValueUI.wipRoot;
      PeactValueUI.deletions = [];
    }
  };

  return [hook.state, setState];
}
