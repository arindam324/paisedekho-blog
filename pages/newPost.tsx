import { toast, Toaster } from "react-hot-toast";
import RichTextEditor from "../components/admin/RichTextEditor";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import useInput from "../hooks/useInput";
import Sidebar from "../components/admin/Sidebar";
import axios from "axios";

const newPost = () => {
  const [title, setTitle] = useInput({ initialValue: "" });
  const [image, setImage] = useInput({ initialValue: "" });
  const [content, setContent] = useInput({ initialValue: "" });
  const [metaDescription, setMetaDescription] = useInput({ initialValue: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (title.length === 0) {
        throw new Error("Title cannot be empty");
      }
      if (image.length === 0) {
        throw new Error("Image URL cannot be empty");
      }
      if (content.length === 0) {
        throw new Error("Content cannot be empty");
      }
      if (metaDescription.length === 0) {
        throw new Error("Meta description cannot be empty");
      }

      const response = await axios.post("/api/create", {
        title,
        image,
        content,
        metaDescription,
      });

      console.log(response);

      setTitle("");
      setImage("");
      setContent("");
      setMetaDescription("");
      toast.success("Post Created");
    } catch (error) {
      console.error(error);
      // toast.error("Error creating post");
    }
  };

  return (
    <div className={"flex w-full min-h-screen"}>
      <Sidebar />
      <div className="flex-1 grid gap-5  grid-cols-2 ml-72  p-10">
        <div>
          <Toaster />
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
              required
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
              required
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
              required
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full form-select rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="meta_Tags"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Meta Tags
            </label>
            <MultiValueInput delimiter="," />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Content
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
          <div>
            <button
              // onKeyDown={handleKeyDown}
              onClick={handleSubmit}
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  delimiter: string;
}

const MultiValueInput: React.FC<Props> = ({ delimiter }) => {
  const [values, setValues] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setValues([...values, currentValue]);
      setCurrentValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="w-full form-select rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default newPost;
