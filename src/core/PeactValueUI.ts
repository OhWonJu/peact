import { Fiber } from "./types/Fiber";

interface PeactValueUIProps {
  wipRoot?: Fiber;
  currentRoot: Fiber;
  deletions: Fiber[];
  wipFiber: Fiber;
  nextUnitOfWork?: Fiber;
  hookIndex: number;
}

export const PeactValueUI = {} as PeactValueUIProps;
