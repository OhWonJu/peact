import { DomNode } from "./types/DomNode";

type SyntheticEvent = {
  nativeEvent: Event;
  type: string;
  target: EventTarget | null;
  preventDefault: () => void;
  stopPropagation: () => void;
  [key: string]: any;
};

export type SyntheticMouseEvent = SyntheticEvent & {
  clientX: number;
  clientY: number;
};

export type SyntheticOnChangeEvent = SyntheticEvent & {
  value: any;
};

type EventListenerRegistry = Map<DomNode, Map<string, EventListener>>;

const eventListenerRegistry: EventListenerRegistry = new Map();

type EventListener = {
  realType: string;
  listener: EventListenerOrEventListenerObject;
};

function createSyntheticEvent(event: Event): SyntheticEvent {
  return {
    nativeEvent: event,
    type: event.type,
    target: event.target,
    preventDefault: () => event.preventDefault(),
    stopPropagation: () => event.stopPropagation(),
  };
}

export function addSyntheticEventListener(
  dom: DomNode,
  eventType: string,
  listener: (e: SyntheticEvent) => void
) {
  const realEventType = eventType.toLowerCase().substring(2); // "onClick" -> "click"

  const syntheticListener = (event: Event) => {
    let syntheticEvent: SyntheticEvent;

    switch (realEventType) {
      case "click":
        syntheticEvent = createSyntheticMouseEvent(event as MouseEvent);
        break;
      case "change":
        syntheticEvent = createSyntheticOnChangeEvent(event);
        break;
      default:
        syntheticEvent = createSyntheticEvent(event);
    }

    listener(syntheticEvent);
  };

  dom.addEventListener(realEventType, syntheticListener);

  if (!eventListenerRegistry.has(dom)) {
    eventListenerRegistry.set(dom, new Map());
  }

  const domListeners = eventListenerRegistry.get(dom)!;
  domListeners.set(eventType, {
    realType: realEventType,
    listener: syntheticListener,
  });
}

export function removeSyntheticEventListener(dom: DomNode, eventType: string) {
  const domListeners = eventListenerRegistry.get(dom);

  if (!domListeners || !domListeners.has(eventType)) return;

  const { realType, listener } = domListeners.get(eventType)!;

  // Remove the event listener from the DOM
  dom.removeEventListener(realType, listener);

  // Remove from the registry
  domListeners.delete(eventType);

  // Cleanup the registry if empty
  if (domListeners.size === 0) {
    eventListenerRegistry.delete(dom);
  }
}

function createSyntheticMouseEvent(event: MouseEvent): SyntheticMouseEvent {
  const baseEvent = createSyntheticEvent(event);
  return {
    ...baseEvent,
    clientX: event.clientX,
    clientY: event.clientY,
  };
}

function createSyntheticOnChangeEvent(event: Event): SyntheticOnChangeEvent {
  const baseEvent = createSyntheticEvent(event);
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

  return {
    ...baseEvent,
    value: target?.value ?? null,
  };
}
