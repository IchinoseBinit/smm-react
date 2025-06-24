import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export const useVideoPreview = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handlePreview = (file: File) => {
    setPreviewSrc(URL.createObjectURL(file));
    onOpen();
  };

  return { open, onClose, previewSrc, handlePreview };
};
