import useInput from "../../hooks/useInput";
import React, {ChangeEvent, useEffect} from "react";
import {PostType} from './Post'
import {toast, Toaster} from 'react-hot-toast'
import RichTextEditor from "./RichTextEditor";
import axios from "axios";

const EmailForm: React.FC<{ selectedPost: PostType | null }> = ({selectedPost}) => {

    const [title, setTitle] = useInput({initialValue: ''})
    const [image, setImage] = useInput({initialValue: ''})
    const [content, setContent] = useInput({initialValue: ''})

    useEffect(() => {
        if (selectedPost) {
            setTitle(selectedPost.title)
            setImage(selectedPost.image)
            setContent(selectedPost.content)
        }
    }, [selectedPost])

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('/api/posts', {
            title,
            image,
            content
        })

        toast.success("Content Updated")
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <Toaster/>
            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Title
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="Image"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Image
                </label>
                <input
                    id={"image"}
                    type="text"
                    placeholder="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full form-select rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="message"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Content
                </label>
                <RichTextEditor value={content} onChange={setContent}/>
            </div>
            <div>
                <button
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EmailForm