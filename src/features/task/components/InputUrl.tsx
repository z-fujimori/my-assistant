// import React from 'react'

import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

const InputUrl = (props:{
  id: number|null,
  val: string,
  setStateUpdate: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [inputUrl, setInputUrl] = useState(props.val);
  function changeInputUrl (e) {
    console.log(e.target.value);
    setInputUrl(e.target.value);
  }
  async function updateButton () {
    await invoke<void>("update_url", {"data": {"id": props.id, "url": inputUrl}});
    props.setStateUpdate(true);
  }

  return (
    <div className="flex items-center my-2">
      <input 
        className="w-96 p-1 text-sm" 
        type="text" 
        style={{ textTransform: "none" }} // 文字の先頭を大文字にしない
        value={inputUrl} 
        onChange={changeInputUrl}
      />
      <button className="bg-darkGreen px-1 ml-2 font-bold" onClick={updateButton}>＞</button>
    </div>
  )
}

export default InputUrl