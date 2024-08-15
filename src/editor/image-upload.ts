import { createImageUpload } from "novel/plugins";

const onUpload = (file: File) => {
  const cloudName = "dio8jfh7f";
  const unsignedUploadPreset = "conversion_hive_unsigned";

  const fd = new FormData();
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
  fd.append("file", file);

  const promise = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: fd,
  });

  return new Promise((resolve) => {
    promise.then(async (res) => {
      // Successfully uploaded image
      if (res.status === 200) {
        const { url: secure_url } = await res.json();
        // preload the image
        const image = new Image();
        image.src = secure_url;
        image.onload = () => {
          resolve(secure_url);
        };
        // No blob store configured
      } else if (res.status === 401) {
        resolve(file);
        throw new Error(
          "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
        );
        // Unknown error
      } else {
        throw new Error(`Error uploading image. Please try again.`);
      }
    });
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
