import { invoke } from '@tauri-apps/api/core';
import React, { useState } from 'react'
import { FaPenNib } from "react-icons/fa";

type InsertTitle = {
    title: string,
}

async function handleAddTitle(title: InsertTitle) {
    await invoke<void>("handle_add_title", {"title": title})
};

const AddTitleModal = (
        props: {
            closeModal: () => void, 
            setStateAddTitle: React.Dispatch<React.SetStateAction<boolean>>
        }
) => {
    const [inputValue, setInputValue] = useState<string>('');

    const insideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleConfirm = () => {
        if (inputValue.trim()) {
            props.setStateAddTitle(true);
            const insertData: InsertTitle = {title: inputValue};
            handleAddTitle(insertData);
            props.closeModal(); // モーダルを閉じる
        } else {
            console.log('入力がありません');
        }
    };
    
    
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={props.closeModal}
            // onClick={handleOutsideClick}
        >
            <div className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-md w-80"
                onClick={insideClick}
            >
                <div className='flex items-center space-x-2 mb-3'>
                    <FaPenNib color='gray' size={30} />
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
                        placeholder="ここに入力"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button 
                        onClick={props.closeModal} 
                        className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-gray-600"
                    >
                        キャンセル
                    </button>
                    <button 
                        onClick={handleConfirm} // 入力値がある場合に確認ボタンの処理を実行
                        disabled={!inputValue.trim()} // 入力がない場合はボタンを無効化
                        className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                    >
                        確認
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTitleModal
