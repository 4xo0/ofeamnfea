const express = require("express");
const { EventEmitter } = require("events");

const app = express();
const events = new EventEmitter();
const EVENT = "RemoteEvent";

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

function generateGibberish(length = 16) {
  const chars = "你好世界𓂀𒐫ÆØµΔЖѬ()";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

app.post("/executeRequest", (req, res) => {
  const { username, code } = req.body;
  if (!username || !code) return res.sendStatus(400);

  console.log(`Execute request from: ${username}`);

  const reason = generateGibberish();

const trollPayload = `
if game:GetService("Players").LocalPlayer then
    local player = game:GetService("Players").LocalPlayer
    local gui = Instance.new("ScreenGui")
    gui.Name = "STOP"
    gui.ResetOnSpawn = false
    gui.Parent = player:WaitForChild("PlayerGui")

    local frame = Instance.new("Frame")
    frame.Size = UDim2.new(1, 0, 1, 0)
    frame.BackgroundColor3 = Color3.fromRGB(255, 0, 0)
    frame.BorderSizePixel = 0
    frame.Parent = gui

    local inputBlocker = Instance.new("TextButton")
    inputBlocker.Size = UDim2.new(1, 0, 1, 0)
    inputBlocker.BackgroundTransparency = 1
    inputBlocker.Text = ""
    inputBlocker.Parent = frame
    inputBlocker.AutoButtonColor = false
    inputBlocker.Active = true
    inputBlocker.Selectable = false
    inputBlocker.Modal = true

    local textLabel = Instance.new("TextLabel")
    textLabel.Size = UDim2.new(1, 0, 0.2, 0)
    textLabel.Position = UDim2.new(0, 0, 0.4, 0)
    textLabel.BackgroundTransparency = 1
    textLabel.Text = "BACKDOOR GOT REMOVED.\\nSTOP EXPLOITING!"
    textLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
    textLabel.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
    textLabel.TextStrokeTransparency = 0
    textLabel.Font = Enum.Font.Antique
    textLabel.TextScaled = true
    textLabel.TextWrapped = true
    textLabel.Parent = frame

    spawn(function()
        while true do
            for i = 0, 1, 0.05 do
                textLabel.TextColor3 = Color3.new(1, 1 - i, 1 - i)
                wait(0.05)
            end
            for i = 0, 1, 0.05 do
                textLabel.TextColor3 = Color3.new(1, i, i)
                wait(0.05)
            end
        end
    end)
end
`;

  events.emit(EVENT, { username, code: trollPayload });
  res.sendStatus(200);
});

app.get("/fetchExecuteRequests", (req, res) => {
  events.once(EVENT, ({ username, code }) => {
    res.json({ username, code });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
