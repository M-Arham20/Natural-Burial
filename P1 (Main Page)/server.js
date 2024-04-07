const http = require("http");
const fs = require("fs");

// Initialize server data variable
let serverData = null;

// Function to handle incoming requests
const server = http.createServer((req, res) => {
  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Handle POST requests to /upload
  if (req.method === "POST" && url.pathname === "/upload") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { data } = JSON.parse(body);
        serverData = data;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data uploaded successfully.");
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Error parsing JSON data.");
      }
    });
  }
  // Handle GET requests to /download
  else if (req.method === "GET" && url.pathname === "/download") {
    if (serverData) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(serverData));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("No data available for download.");
    }
  }
  // Handle other requests
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found.");
  }
});

// Set the server to listen on port 3050
const PORT = process.env.PORT || 3050;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
