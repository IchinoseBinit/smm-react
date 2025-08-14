import { toaster } from "@/components/ui/toaster";


const handleSuccess = (title: string, description: string) => {
  toaster.success({
    title: title,
    description: description,
  });
};
const handleError = (title: string, error?: Error) => {
  console.error(error);
  toaster.error({
    title: title,
    description: error?.message,
    closable: true,
  });
};

export {
  handleSuccess,
  handleError,

};
