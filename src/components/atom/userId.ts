import { atomWithStorage } from "jotai/utils";

export const userIdAtom = atomWithStorage<number>("daedongmapId", 0);
