import { createImageUpload } from "novel/plugins";

const onUpload = (file: File) => {
  // const promise = fetch("/api/upload", {
  //   method: "POST",
  //   headers: {
  //     "content-type": file?.type || "application/octet-stream",
  //     "x-vercel-filename": file?.name || "image.png",
  //   },
  //   body: file,
  // });

  // return new Promise((resolve) => {
  //   promise.then(async (res) => {
  //     // Successfully uploaded image
  //     if (res.status === 200) {
  //       const { url } = await res.json();
  //       // preload the image
  //       const image = new Image();
  //       image.src = url;
  //       image.onload = () => {
  //         resolve(url);
  //       };
  //       // No blob store configured
  //     } else if (res.status === 401) {
  //       resolve(file);
  //       throw new Error(
  //         "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
  //       );
  //       // Unknown error
  //     } else {
  //       throw new Error(`Error uploading image. Please try again.`);
  //     }
  //   });
  // });

  return new Promise((resolve) => {
    const image = new Image();
    image.src =
      "https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    image.onload = () => {
      resolve(
        "https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    };
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      console.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      console.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
