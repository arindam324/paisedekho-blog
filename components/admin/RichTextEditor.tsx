import dynamic from "next/dynamic";
import React from "react";

const QuillSnowWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>
})

export default QuillSnowWrapper

const RichTextEditor: React.FC<{ value: string, setValue: (value: string) => void }> = ({value, setValue}) => {
    return (
        <QuillSnowWrapper value={value} onChange={setValue}/>
    )
}