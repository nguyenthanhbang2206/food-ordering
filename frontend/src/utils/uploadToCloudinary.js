const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;

export const uploadToCloudinary = async (file, fileType = "image") => {
  if (file && fileType) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const fileData = await res.json();
    return fileData.secure_url;
  } else {
    console.log("error");
    return null;
  }
};
