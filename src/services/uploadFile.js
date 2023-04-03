const cloudName = "drpc7v6x8";
const uploadPreset = "sprint4";
const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
export const fileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    try {
      const response = await fetch(urlCloudinary, {
        method: "POST",
        body: formData,
      });
       if (!response.ok) {
        return null;
      }
      const data= await response.json();
      return data.secure_url
    } catch (error) {
      console.log(error);
      return null;
    }
};