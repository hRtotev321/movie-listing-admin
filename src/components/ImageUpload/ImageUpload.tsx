import React from "react";
import Dropzone from "react-dropzone";
import { StyledImage, StyledImageLabel, StyledPlusIcon } from "./Components";
import { uploadImage } from "../../firebase/firebase";
import compressImage from "nailit";
import { useLoading } from "../../app/hooks";

type ImageUploadType = {
  onChange: (url: string) => void;
  value?: string;
};

const ImageUpload: React.FC<ImageUploadType> = ({ onChange, value }) => {
  const { setLoadingState } = useLoading();

  const compress = async (file: string) => {
    const compressedFile = await compressImage(file, {
      maxSize: 700,
    });

    return compressedFile;
  };

  const onDrop = async (acceptedFiles: (Blob | MediaSource)[]) => {
    try {
      setLoadingState(true);
      const fileUrl = await compress(URL.createObjectURL(acceptedFiles[0]));
      const newUrl = await uploadImage(fileUrl);
      onChange(newUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Dropzone
      multiple={false}
      accept={{ "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] }}
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <section style={{ width: "70%", position: "relative" }}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledImageLabel>
               <StyledPlusIcon opacity={!value ? 1 :0.6} color="primary" />
            </StyledImageLabel>
            <StyledImage
              src={value || "https://placehold.co/600x670?text=Upload+Image"}
            />
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
