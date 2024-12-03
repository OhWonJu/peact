import { createElement, render, fragment } from "./core";
import { useState } from "./useState";

const Peact = {
  render: render,
  createElement: createElement,
  fragment: fragment,
  useState: useState,
};

export { createElement, render, fragment, useState };

export default Peact;
