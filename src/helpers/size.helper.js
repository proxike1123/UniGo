import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const vh = height / 100;
const vw = width / 100;

export const defaultWidth = width;

export const defaultHeight = height;

export const sizeWidth = size => {
  return (size / 412) * 100 * vw;
};

export const sizeHeight = size => {
  return (size / 684) * 100 * vh;
};

export const sizeFont = size => {
  return (size / 412) * 100 * vw;
};
