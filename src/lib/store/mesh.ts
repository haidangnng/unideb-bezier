import { proxy } from "valtio";
export const modes = ["translate", "rotate", "scale"];
export const state = proxy<{ current: null | number; mode: number }>({
  current: null,
  mode: 0,
});
