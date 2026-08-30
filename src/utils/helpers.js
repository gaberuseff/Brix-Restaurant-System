import imageCompression from "browser-image-compression";

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const getLocationUrl = async () => {
  const {latitude, longitude} = await getCurrentPosition();
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
};

export async function compressImage(file) {
  if (!file) return null;

  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1200,
    useWebWorker: false,
    fileType: "image/webp",
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File(
      [compressedBlob],
      file.name.replace(/\.[^/.]+$/, "") + ".webp",
      {type: "image/webp"},
    );

    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    return file;
  }
}
