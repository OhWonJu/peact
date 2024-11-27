import { RequestIdleCallbackDeadline } from "./Global";
import { PeactValueUI } from "./PeactValueUI";
import { DomNode } from "./types/DomNode";
import { Fiber } from "./types/Fiber";
import { FiberEffectTag } from "./types/FiberEffectTag";
import { FiberType } from "./types/FiberType";
import { isEvent, isOld, isNew, isProperty } from "./utils";

type PeactElementProps = {
  [key: string]: string | number;
};

function fragment(props: any) {
  return props.children;
}

function toChildArray(children: any, out: any[]) {
  out = out || [];
  if (children == null || typeof children == "boolean") {
  } else if (Array.isArray(children)) {
    children.some((child) => {
      toChildArray(child, out);
    });
  } else {
    out.push(children);
  }
  return out;
}

function createElement(type: string, props: any, ...children: any[]) {
  const propsValue: PeactElementProps = {};
  let refValue = null;
  let keyValue = null;

  if (props !== null) {
    Object.keys(props).forEach((key) => {
      if (key === "ref") refValue = props[key];
      else if (key === "key") keyValue = props[key];
      else propsValue[key] = props[key];
    });
  }

  const flattenChildren = toChildArray(children, []);

  return {
    type,
    ref: refValue,
    key: keyValue,
    props: {
      ...propsValue,
      children: flattenChildren.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: string) {
  return {
    type: FiberType.TextElement,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber: Fiber): DomNode | undefined {
  // fragment 처리
  if (!fiber.type) return undefined;

  const dom =
    fiber.type == FiberType.TextElement
      ? document.createTextNode("")
      : document.createElement(fiber.type as unknown as FiberType);

  updateDom(dom, {}, fiber.props);
  return dom;
}

function updateDom(dom: DomNode, prevProps: any, nextProps: any) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key)) // 새로운 이벤트에 없거나, 새롭게 이벤트가 새롭게 변경된 경우
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2); // on"C"lick
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isOld(prevProps, nextProps))
    .forEach((name: string) => {
      (dom as any)[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      (dom as any)[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  // 기존 노드 제거
  PeactValueUI.deletions.forEach(commitWork);
  // work in progress 와 current sub tree 교체
  if (PeactValueUI.wipRoot && PeactValueUI.wipRoot.child) {
    commitWork(PeactValueUI.wipRoot.child);
    PeactValueUI.currentRoot = PeactValueUI.wipRoot;
  }
  // work in progress tree 초기화
  PeactValueUI.wipRoot = undefined;
}

function commitWork(fiber?: Fiber) {
  if (!fiber) {
    return;
  }

  // 실제 대상이 되는 부모 DOM 노드 탐색
  let domParentFiber = fiber.parent;
  while (domParentFiber && !domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  let domParent: DomNode | undefined = undefined;

  if (domParentFiber) domParent = domParentFiber.dom;

  // fiber 배치
  if (
    fiber.effectTag === FiberEffectTag.Placement &&
    fiber.dom != null &&
    domParent
  ) {
    domParent.appendChild(fiber.dom);
  }
  // fiber 갱신
  else if (
    fiber.effectTag === FiberEffectTag.Update &&
    fiber.dom != null &&
    fiber.alternate
  ) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  // fiber 제거
  else if (fiber.effectTag === FiberEffectTag.Deletion && domParent) {
    commitDeletion(domParent, fiber);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(domParent: DomNode, fiber?: Fiber) {
  if (fiber && fiber.dom) domParent.removeChild(fiber.dom);
  else if (fiber && fiber.child) commitDeletion(domParent, fiber.child);
}

function render(element: any, container: DomNode) {
  PeactValueUI.wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // parent = undefined
    alternate: PeactValueUI.currentRoot,
  };

  PeactValueUI.deletions = [];
  PeactValueUI.nextUnitOfWork = PeactValueUI.wipRoot;
}

function workLoop(deadline: RequestIdleCallbackDeadline) {
  // performnUnitOfWork 를 반복적으로 실행
  // 제너레이터의 yield 개념을 사용 - 동시성
  let shouldYield = false;
  // nextUnitOfWork 에 대한 컴포넌트 객체화
  while (PeactValueUI.nextUnitOfWork && !shouldYield) {
    PeactValueUI.nextUnitOfWork = performUnitOfWork(
      PeactValueUI.nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 모든 fiber 를 순회하며 컴포넌트화가 끝난 경우 commit phase 로 전환
  if (!PeactValueUI.nextUnitOfWork && PeactValueUI.wipFiber) commitRoot();

  window.requestIdleCallback(workLoop);
}

window.requestIdleCallback(workLoop);

function performUnitOfWork(unitOfWork: Fiber): Fiber | undefined {
  // unitOfWork 에 대한 업데이트 작업
  // 함수형 컴포넌트 처리 unitOfWork.type = function
  // 함수형 컴포넌트는 즉시 element 로 치환할 수 있는 요소가 아님
  if (unitOfWork.type instanceof Function) updateFunctionComponent(unitOfWork);
  else updateHostComponent(unitOfWork);

  // 다음 unitOfWork 를 지정
  // fiber 는 부모 - 자식 - 형제 - 부모 순으로 처리되어야함
  // 자식 fiber 처리
  if (unitOfWork.child) return unitOfWork.child;

  // 형제/부모 fiber 처리 - 트라 순회
  let nextUnitOfWork = unitOfWork;
  // 최종 적으로는 root 로 이동 하게 됨 - nextUnitOfWork 가 존재하지 않게 됨
  while (nextUnitOfWork) {
    // 형제 fiber 가 존재하는 경우
    if (nextUnitOfWork.sibling) return nextUnitOfWork.sibling;
    // 형제 fiber 처리가 끝난 경우 - 부모로 거슬러 올라가야함
    nextUnitOfWork = nextUnitOfWork.parent as Fiber;
  }
  return;
}

function updateFunctionComponent(fiber: Fiber) {
  // 함수형 컴포넌트는 fiber.dom 만 존재하는 것이 아닌 추가적인 기능을 내포하고 있음 (state, hook 등)
  // 함수형 fiber 는 로직과 자식 fiber 를 가지고 있음
  PeactValueUI.wipFiber = fiber; // work in progress 상태인 fiber 지정
  PeactValueUI.wipFiber.hooks = [];
  PeactValueUI.hookIndex = 0; // 해당 fiber hook 목록 인덱스

  // type 이 함수라는 것은 해당 fiber 는 host 혹은 function fiber 만을 가지고 있다는 것. (즉 자신이 host 가 될 수 없다는 것)
  let childrenComponents = undefined;
  if (fiber.type instanceof Function)
    childrenComponents = fiber.type(fiber.props);

  let children = [];
  children = [childrenComponents];

  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: Fiber) {
  // 실제 Fiber node -> Host

  if (!fiber.dom) fiber.dom = createDom(fiber);
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber: Fiber, elements: any) {
  // 다시 LCRS Tree 의 노드들을 엮어주는 과정
  // index = 0 - wipFiber child
  // index over 0 - wipFiber child's sibling
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child; // child or undefind
  let prevSibling: Fiber | undefined = undefined;

  while (index < elements.length || oldFiber != undefined) {
    const element = elements[index];
    let newFiber: Fiber | undefined = undefined;

    const sameFiber = oldFiber && element && element.type === oldFiber.type;

    // 업데이트
    if (oldFiber && sameFiber) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: FiberEffectTag.Update,
      };
    }
    // 배치
    else if (!oldFiber && element && !sameFiber) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: undefined,
        parent: wipFiber,
        alternate: undefined,
        effectTag: FiberEffectTag.Placement,
      };
    }
    // element 가 없는 경우이므로 해당 child 제거
    else if (oldFiber && !element && !sameFiber) {
      oldFiber.effectTag = FiberEffectTag.Deletion;
      PeactValueUI.deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // wipFiber 의 첫 자식
    if (index === 0) wipFiber.child = newFiber;
    // wipFiber 의 다른 자식이므로 현재 자식의 sibling 이 됨 (형제에서의 렌더링 우선순위가 표현됨)
    else if (element && prevSibling) prevSibling.sibling = newFiber;

    prevSibling = newFiber;
    index++;
  }
}

export { createElement, render, fragment };
