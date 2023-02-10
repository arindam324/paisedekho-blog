import {toast, Toaster} from "react-hot-toast";
import RichTextEditor from "../components/admin/RichTextEditor";
import {FormEvent} from "react";
import useInput from "../hooks/useInput";
import Sidebar from "../components/admin/Sidebar";
import axios from "axios";

const newPost = () => {

    const [title, setTitle] = useInput({initialValue: ''});
    const [image, setImage] = useInput({initialValue: ''})
    const [content, setContent] = useInput({initialValue: ''})
    const [metaDescription, setMetaDescription] = useInput({initialValue: ''})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post('/api/create', {
            title,
            image,
            content,
            metaDescription
        })
        toast.success("Post Created")
    }

    return (
        <div className={"flex w-full min-h-screen"}>
            <Sidebar/>
            <div className="flex-1 grid gap-5  grid-cols-2 ml-72  p-10">
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
                            htmlFor="meta_description"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Meta Description
                        </label>
                        <input
                            id={"meta_description"}
                            type="text"
                            placeholder="meta_description"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
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
            </div>
        </div>
    )
}

export default newPost