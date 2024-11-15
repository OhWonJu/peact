type DomNode = HTMLElement | Text;

function fragment(props: any) {
  return props.children;
}

/**
 * @description JSX 트랜스파일링 시 실행되는 함수
 */
function createElement(type: any, props: any, ...children: any[]) {
  // 함수형 컴포넌트인 경우
  if (typeof type === "function") {
    return type(props);
  }

  const propsValue = {};
  let refValue = null;
  let keyValue = null;

  if (props !== null) {
    Object.keys(props).forEach((key) => {
      if (key === "ref") refValue = props[key];
      if (key === "key") keyValue = props[key];
      //@ts-ignore
      else propsValue[key] = props[key];
    });
  }

  const element = {
    type,
    ref: refValue,
    key: keyValue,
    props: {
      ...propsValue,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };

  if (Object.freeze) {
    Object.freeze(element.props);
    Object.freeze(element);
  }

  console.log(element);

  return element;
}

/**
 * @description Create leaf Element - 리프 노드의 경우 최종적으로 TEXT 만을 가지는 경우이므로
 * @param text
 * @returns
 */
function createTextElement(text: string) {
  const element = {
    type: "TEXT_ELEMENT", // div, span 과 같은 HTML 타입이 아닌 순수 text 임을 명시
    props: {
      nodeValue: text, // 실제 text 출력을 위한 prop -> Node.prototype.nodeValue
      children: [],
    },
  };

  if (Object.freeze) {
    Object.freeze(element.props);
    Object.freeze(element);
  }

  return element;
}

export { createElement, fragment };
