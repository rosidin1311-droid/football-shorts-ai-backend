import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    console.log("Downloading video...");

    // STEP 1: download video
    exec(`yt-dlp -f mp4 -o temp/input.mp4 "${url}"`, (err) => {
      if (err) {
        return res.status(500).json({ error: "Download failed" });
      }

      console.log("Cutting video...");

      // STEP 2: cut highlight (simple demo 60s)
      exec(
        `ffmpeg -y -ss 00:00:10 -t 30 -i temp/input.mp4 -vf "scale=1080:1920" output/final.mp4`,
        (err2) => {
          if (err2) {
            return res.status(500).json({ error: "FFmpeg failed" });
          }

          console.log("Done");

          return res.json({
            status: "done",
            video: "output/final.mp4"
          });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
