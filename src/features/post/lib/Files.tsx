import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function FfmpegTest() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    console.log("▶️ load() start");
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
      console.log("FFmpeg log:", message);
      if (messageRef.current) messageRef.current.innerText = message;
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript",
      ), // ← this was missing
    });

    console.log("✅ ffmpeg.load() complete");
    setLoaded(true);
  };

  const transcode = async () => {
    console.log("▶️ transcode() start");
    const ffmpeg = ffmpegRef.current;

    await ffmpeg.writeFile(
      "input.webm",
      await fetchFile(
        "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm",
      ),
    );

    await ffmpeg.exec(["-i", "input.webm", "output.mp4"]);
    console.log("⌛ ffmpeg.exec() done");

    const data = await ffmpeg.readFile("output.mp4");
    console.log("📥 readFile()", data);

    if (videoRef.current) {
      // data should be a Uint8Array already
      videoRef.current.src = URL.createObjectURL(
        new Blob([data], { type: "video/mp4" }),
      );
      console.log("▶️ video.src set, should start playing");
    }
  };

  return loaded ? (
    <>
      <video ref={videoRef} controls style={{ width: 600 }} />
      <br />
      <button onClick={transcode}>Transcode webm → mp4</button>
      <p ref={messageRef}></p>
      <p>Open DevTools to watch the FFmpeg logs.</p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
  );
}
