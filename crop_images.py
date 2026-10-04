import os
from PIL import Image

designs_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\designs"
assets_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\BreakTime\frontend\assets\illustrations"

os.makedirs(assets_dir, exist_ok=True)

# Helper function to crop
def crop_image(filename, box, output_name):
    img_path = os.path.join(designs_dir, filename)
    if not os.path.exists(img_path):
        print(f"Skipping {filename}, not found.")
        return
    img = Image.open(img_path)
    cropped = img.crop(box)
    cropped.save(os.path.join(assets_dir, output_name))
    print(f"Saved {output_name}")

# Crop coordinates need to be guessed/refined based on standard mobile mockup sizes.
# The mockups are likely around 1284x2778 or 1170x2532.
# Wait, let's just open one and get its size to calculate relative coordinates.
img = Image.open(os.path.join(designs_dir, "01_Splash_Screen.png"))
w, h = img.size
print(f"Mockup size: {w}x{h}")

# Assuming width is around 300 (it's actually probably more like 1200 or 1080)
# Let's crop relative to width and height
# Splash screen illustration: top half, excluding the header (0-15%)
crop_image("01_Splash_Screen.png", (int(w*0.05), int(h*0.1), int(w*0.95), int(h*0.6)), "splash_char.png")

# Onboarding illustration: centered
crop_image("02_Onboarding.png", (int(w*0.1), int(h*0.35), int(w*0.9), int(h*0.75)), "onboarding_trophy.png")

# Active Break illustration:
crop_image("05_Active_Break.png", (int(w*0.1), int(h*0.2), int(w*0.9), int(h*0.65)), "active_break_char.png")

# Leaderboard avatars (Alex is 1st place, Sarah 2nd, Mike 3rd)
crop_image("07_Leaderboard.png", (int(w*0.35), int(h*0.25), int(w*0.65), int(h*0.4)), "avatar_1.png")
crop_image("07_Leaderboard.png", (int(w*0.1), int(h*0.28), int(w*0.33), int(h*0.4)), "avatar_2.png")
crop_image("07_Leaderboard.png", (int(w*0.65), int(h*0.28), int(w*0.88), int(h*0.4)), "avatar_3.png")

print("Done cropping.")
