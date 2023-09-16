import { createContextFromHook } from "./createContextFromHook";

export const createConstContext = <T>(ctx: T) => createContextFromHook(() => ctx)