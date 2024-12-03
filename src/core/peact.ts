import { createElement, render, fragment } from "./core";
import { useEeffect } from "./useEffect";
import { useState } from "./useState";

const Peact = {
  render: render,
  createElement: createElement,
  fragment: fragment,
  useState: useState,
  useEeffect: useEeffect,
};

export { createElement, render, fragment, useState, useEeffect };

export default Peact;
