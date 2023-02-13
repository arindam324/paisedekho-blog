import useInput from "../../hooks/useInput";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";
import Loader from "../Loader";

const EmailForm: React.FC<{ selectedPost: string | null }> = ({
  selectedPost,
}) => {
  const [title, setTitle] = useInput({ initialValue: "" });
  const [image, setImage] = useInput({ initialValue: "" });
  const [content, setContent] = useInput({ initialValue: "" });
  const [metaDescription, setMetaDescription] = useInput({ initialValue: "" });
  const [tags, setTags] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPost) {
      fetchPostDetails();
    }
  }, [selectedPost]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const post = await axios.get(`/api/getpostBySlug?slug=${selectedPost}`);
      setTitle(post.data.title);
      setContent(post.data.content);
      setImage(post.data.image);
      setMetaDescription(post.data.meta_description);
      setTags(post.data.tags);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPost) {
      await axios.post(`/api/posts?id=${selectedPost}`, {
        title,
        image,
        content,
      });
    }
    toast.success("Content Updated");
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Toaster />
      {loading && <Loader />}
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
          htmlFor="MetaDescription"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Meta Description
        </label>
        <input
          id={"MetaDescription"}
          type="text"
          placeholder="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full form-select rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="MetaTags"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Tags
        </label>
        <div>{tags && tags.map((item) => <li key={item}>{item}</li>)}</div>
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
        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
