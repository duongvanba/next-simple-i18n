import { createContextFromHook } from "./createContextFromHook.js";

export const createConstContext = <T>(ctx: T) => createContextFromHook(() => ctx)