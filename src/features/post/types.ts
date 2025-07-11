type FileMeta = {
  filename: string;
  type: string;
  file: File;
};

type FilesPayload = {
  files: FileMeta[];
};

export type { FileMeta, FilesPayload };
