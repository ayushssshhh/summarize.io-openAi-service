require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000; // Change if needed

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON requests

// Route to fetch OpenAI response
app.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body; // Get content from frontend
    
    console.log("Request hit on : ", new Date());

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a detailed bullet points summary for the mentioned content. Make sure while creating bullet points, don't create nested bullet points, and each bullet point should start with a hyphen and end with a full stop. \nContent: ${content}`,
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

    res.json(response.data); // Send OpenAI response to frontend
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// Start Server
app.listen(process.env.PORT || PORT, () => {
});
