// import { useKeybind } from "./KeyboardAction";

import { useKeybind } from "./KeybordAction";

// キー操作をまとめるカスタムフック
export const useKeyActions = (
  updateNumber: (x: number) => void,
) => {
  useKeybind({
    key: "x",
    shiftKey: false,
    onKeyDown: () => updateNumber(1),
  });
  useKeybind({
    key: "c",
    shiftKey: false,
    onKeyDown: () => updateNumber(2),
  });
  useKeybind({
    key: "v",
    shiftKey: false,
    onKeyDown: () => updateNumber(3),
  });
  useKeybind({
    key: "s",
    shiftKey: false,
    onKeyDown: () => updateNumber(4),
  });
  useKeybind({
    key: "d",
    shiftKey: false,
    onKeyDown: () => updateNumber(5),
  });
  useKeybind({
    key: "f",
    shiftKey: false,
    onKeyDown: () => updateNumber(6),
  });
  useKeybind({
    key: "w",
    shiftKey: false,
    onKeyDown: () => updateNumber(7),
  });
  useKeybind({
    key: "e",
    shiftKey: false,
    onKeyDown: () => updateNumber(8),
  });
  useKeybind({
    key: "r",
    shiftKey: false,
    onKeyDown: () => updateNumber(9),
  });
};
