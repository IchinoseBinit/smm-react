import { z } from "zod";

const fileSchema = z.object({
  type: z.string(),
});

const filesSchema = z.array(fileSchema).refine(
  (files) => {
    if (files.length === 0) return true;

    const firstType = files[0].type?.split("/")[0];
    if (!firstType) return false;

    return files.every((f) => f.type?.startsWith(firstType));
  },
  {
    message:
      "All files must be of the same type (image or video).Please refresh and try again.",
  },
);

export { filesSchema };
