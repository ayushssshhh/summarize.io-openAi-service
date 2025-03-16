require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS Configuration (Allow Any Origin)
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// ✅ Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Explicitly Handle Preflight OPTIONS Requests
app.options("*", (req, res) => {
  res.status(204).end(); // Respond with HTTP 204 No Content
});

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Route to fetch OpenAI response
app.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a detailed bullet points summary for the mentioned content. 
            - Each bullet point should start with a hyphen and end with a full stop.
            - No nested bullet points.
            
            Content: ${content}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} and accepting requests from any client.`);
});
