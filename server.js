import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let latestData = null;

app.post("/api/data", (req, res) => {
  const { mq135, temperature, humidity } = req.body;
  if (
    mq135 === undefined ||
    temperature === undefined ||
    humidity === undefined
  ) {
    return res.status(400).json({ error: "Invalid sensor data" });
  }

  latestData = {
    mq135,
    temperature,
    humidity,
    timestamp: new Date().toISOString()
  };

  console.log("📡 Data received from ESP8266:", latestData);

  res.json({ status: "ok" });
});

app.get("/api/data", (req, res) => {
  if (!latestData) {
    return res.status(404).json({ error: "No data yet" });
  }

  res.json(latestData);
});

app.get("/", (req, res) => {
  res.send("HawaMitra backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
