// import { useKeybind } from "./KeyboardAction";

import { useKeybind } from "./KeybordAction";

// キー操作をまとめるカスタムフック
export const useNumActions = (
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
  useKeybind({
    key: " ",
    shiftKey: false,
    onKeyDown: () => updateNumber(0),
  });
  useKeybind({
    key: "1",
    shiftKey: false,
    onKeyDown: () => updateNumber(1),
  });
  useKeybind({
    key: "2",
    shiftKey: false,
    onKeyDown: () => updateNumber(2),
  });
  useKeybind({
    key: "3",
    shiftKey: false,
    onKeyDown: () => updateNumber(3),
  });
  useKeybind({
    key: "4",
    shiftKey: false,
    onKeyDown: () => updateNumber(4),
  });
  useKeybind({
    key: "5",
    shiftKey: false,
    onKeyDown: () => updateNumber(5),
  });
  useKeybind({
    key: "6",
    shiftKey: false,
    onKeyDown: () => updateNumber(6),
  });
  useKeybind({
    key: "7",
    shiftKey: false,
    onKeyDown: () => updateNumber(7),
  });
  useKeybind({
    key: "8",
    shiftKey: false,
    onKeyDown: () => updateNumber(8),
  });
  useKeybind({
    key: "9",
    shiftKey: false,
    onKeyDown: () => updateNumber(9),
  });
  useKeybind({
    key: "0",
    shiftKey: false,
    onKeyDown: () => updateNumber(0),
  });
};

export const useSymbolActions = (
  calcuFunction: (sym: string) => void,
  equal: () => number,
  resetOnlyNumber: () => void,
  resetNumber: () => void,
  num_mem_switch: (index: number) => void
) => {
  useKeybind({
    key: "+",
    shiftKey: false,
    onKeyDown: () => calcuFunction('+'),
  });
  useKeybind({
    key: "-",
    shiftKey: false,
    onKeyDown: () => calcuFunction('-'),
  });
  useKeybind({
    key: "*",
    shiftKey: false,
    onKeyDown: () => calcuFunction('*'),
  });
  useKeybind({
    key: "/",
    shiftKey: false,
    onKeyDown: () => calcuFunction('/'),
  });
  useKeybind({
    key: "%",
    shiftKey: false,
    onKeyDown: () => calcuFunction('%'),
  });
  useKeybind({
    key: "^",
    shiftKey: false,
    onKeyDown: () => calcuFunction('^'),
  });
  useKeybind({
    key: "Enter",
    onKeyDown: () => equal(),
  });
  useKeybind({
    key: "Backspace",
    shiftKey: false,
    onKeyDown: () => resetOnlyNumber(),
  });
  useKeybind({
    key: "Escape",
    shiftKey: false,
    onKeyDown: () => resetNumber(),
  });

  useKeybind({
    key: "x",        // キー「1」を指定
    ctrlKey: true,   // Controlキーを有効化
    metaKey: true, // commandキー
    onKeyDown: () => num_mem_switch(1)
  });
  useKeybind({
    key: "X",        // キー「1」を指定
    onKeyDown: () => num_mem_switch(1)
  });
  useKeybind({
    key: "C",        // キー「1」を指定
    onKeyDown: () => num_mem_switch(2)
  });
}
