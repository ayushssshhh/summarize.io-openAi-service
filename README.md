# Summarize.io Backend Service

This is the backend service for the **Summarize.io Chrome Extension**. It acts as a **middleware** between the frontend and **OpenAI's API**, allowing secure communication without exposing sensitive information like the **API key**.

---

## 🚀 **Business Requirement**
- This backend service is designed for the **Summarize.io Chrome Extension**.
- The service **receives text content** from the frontend **via a POST request**.
- It processes the request and sends it to **OpenAI's Chat API (`gpt-3.5-turbo`)** for summarization.
- The response from OpenAI is **returned back to the frontend** securely.

---

## 🔐 **Why is this Backend Service Needed?**
If the frontend directly calls OpenAI's API, the **API key** must be included in the JavaScript code. This poses a **security risk** because:
- **API keys can be stolen** from browser developer tools.
- **Users can misuse the API** and exceed rate limits.
- **It violates OpenAI’s best practices** for API security.

### **Solution: Backend as Middleware**
This backend acts as a **middleware**:
1. The frontend **sends a request** to this service with the content to be summarized.
2. The backend **forwards the request** to OpenAI’s API **(with the API key securely stored in `.env`)**.
3. OpenAI returns a **response**, which is sent back to the frontend.

✅ **Advantage**: The frontend never **sees or exposes** the API key, keeping it secure.

 Summarize.io Backend Service

This is the backend service for the **Summarize.io Chrome Extension**. It acts as a **middleware** between the frontend and **OpenAI's API**, allowing secure communication without exposing sensitive information like the **API key**.

---

## 🚀 **Business Requirement**
- This backend service is designed for the **Summarize.io Chrome Extension**.
- The service **receives text content** from the frontend **via a POST request**.
- It processes the request and sends it to **OpenAI's Chat API (`gpt-3.5-turbo`)** for summarization.
- The response from OpenAI is **returned back to the frontend** securely.

---

## 🔐 **Why is this Backend Service Needed?**
If the frontend directly calls OpenAI's API, the **API key** must be included in the JavaScript code. This poses a **security risk** because:
- **API keys can be stolen** from browser developer tools.
- **Users can misuse the API** and exceed rate limits.
- **It violates OpenAI’s best practices** for API security.

### **Solution: Backend as Middleware**
This backend acts as a **middleware**:
1. The frontend **sends a request** to this service with the content to be summarized.
2. The backend **forwards the request** to OpenAI’s API **(with the API key securely stored in `.env`)**.
3. OpenAI returns a **response**, which is sent back to the frontend.

✅ **Advantage**: The frontend never **sees or exposes** the API key, keeping it secure.

🔥 How the Backend Works as Middleware
✅ Step 1: Frontend Request
The frontend sends a request to to this backend service with the text content.

✅ Step 2: Backend Processing

The backend receives the request.
It forwards the content to OpenAI’s API.
The API key is never exposed to the frontend.
✅ Step 3: OpenAI Response

OpenAI processes the request and returns the summarized response.
The backend forwards the response back to the frontend.
✅ Step 4: Secure Data Flow

Frontend never sees the API key.
The backend protects OpenAI's API usage.
The service can monitor API requests and prevent abuse.

🏗️ Code Flow & Logic
1️⃣ Express Server Initialization
The server is created using Express.js.
CORS is enabled to allow communication between the Chrome extension and the backend.
The server listens on port 5000 (can be changed if needed).

2️⃣ API Route: /summarize
Receives a POST request from the frontend with the text content.
Calls OpenAI’s Chat API using the stored API key.
The API request includes:
gpt-3.5-turbo model.
A structured prompt to ensure bullet points start with hyphem and end with fullstop.
The response is then returned to the frontend.

📜 License
This project is open-source under the MIT License.
