type FileMeta = {
  filename: string;
  type: string;
};

type FilesPayload = {
  files: FileMeta[];
};

export type { FileMeta, FilesPayload };
