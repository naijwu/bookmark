'use client';

import { useState } from 'react'
import styles from './LinkField.module.css'

const LinkField = ({
    handleAddLink,
    loading
}: {
    handleAddLink: (arg0: string) => void;
    loading: boolean
}) => {

    const [input, setInput] = useState<string>('')

    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            const newInput = input
            e.preventDefault();
            handleAddLink(newInput)
            setInput('')
        }
    }

    return (
        <div className={styles.inputContainer}>
            <input placeholder="Paste a link to bookmark..." type="text" disabled={loading} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
    )
}

export default LinkField