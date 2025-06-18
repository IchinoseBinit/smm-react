import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup display="flex" flexDirection="row">
      {files.map((file) =>
        file.type.startsWith("video/") ? (
          <FileUpload.Item
            w="auto"
            boxSize="52"
            p="2"
            file={file}
            key={file.name}
          >
            <video
              src={URL.createObjectURL(file)}
              controls
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="4"
                layerStyle="fill.solid"
                bg="red"
                borderRadius="full"
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ) : (
          <FileUpload.Item
            w="auto"
            boxSize="52"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="4"
                layerStyle="fill.solid"
                bg="red"
                borderRadius="full"
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ),
      )}
    </FileUpload.ItemGroup>
  );
};
