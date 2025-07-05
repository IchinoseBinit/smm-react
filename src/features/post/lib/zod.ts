import { z } from "zod";

const fileSchema = z.object({
  type: z.string(),
});

const filesSchema = z.array(fileSchema).refine(
  (files) => {
    if (files.length === 0) return true; // allow empty
    const firstType = files[0].type.split("/")[0];
    return files.every((f) => f.type.startsWith(firstType));
  },
  {
    message: "All files must be of the same type",
  },
);

export { filesSchema };
