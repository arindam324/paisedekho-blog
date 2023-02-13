import dynamic from "next/dynamic";
import React from "react";

// Quill.register("moudles/magicUrl", MagicUrl);

const QuillSnowWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default QuillSnowWrapper;
