import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Football Shorts AI Backend is running"
  });
});

app.post("/generate", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "YouTube URL is required"
    });
  }

  console.log("Received:", url);

  return res.json({
    success: true,
    status: "processing",
    video: null,
    receivedUrl: url
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});          return res.json({
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
