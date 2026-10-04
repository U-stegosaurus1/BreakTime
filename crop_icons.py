import os
from PIL import Image

designs_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\designs"
assets_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\BreakTime\frontend\assets\illustrations"
icons_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\BreakTime\frontend\assets\icons"

os.makedirs(assets_dir, exist_ok=True)
os.makedirs(icons_dir, exist_ok=True)

def crop_image(filename, box, output_name, target_dir):
    img_path = os.path.join(designs_dir, filename)
    if not os.path.exists(img_path):
        return
    img = Image.open(img_path)
    cropped = img.crop(box)
    cropped.save(os.path.join(target_dir, output_name))
    print(f"Saved {output_name}")

img = Image.open(os.path.join(designs_dir, "01_Splash_Screen.png"))
w, h = img.size

# Badges (08_Badges.png) - 3 top badges, 3 bottom badges
# Rough coordinates based on 307x512 standard sizing, 
# First row (earned)
crop_image("08_Badges.png", (int(w*0.05), int(h*0.25), int(w*0.3), int(h*0.38)), "badge_1.png", icons_dir)
crop_image("08_Badges.png", (int(w*0.38), int(h*0.25), int(w*0.63), int(h*0.38)), "badge_2.png", icons_dir)
crop_image("08_Badges.png", (int(w*0.7), int(h*0.25), int(w*0.95), int(h*0.38)), "badge_3.png", icons_dir)

# Challenges (06_Challenges.png) - The 4 icons
crop_image("06_Challenges.png", (int(w*0.05), int(h*0.25), int(w*0.2), int(h*0.33)), "chal_1.png", icons_dir)
crop_image("06_Challenges.png", (int(w*0.05), int(h*0.35), int(w*0.2), int(h*0.43)), "chal_2.png", icons_dir)
crop_image("06_Challenges.png", (int(w*0.05), int(h*0.46), int(w*0.2), int(h*0.54)), "chal_3.png", icons_dir)
crop_image("06_Challenges.png", (int(w*0.05), int(h*0.58), int(w*0.2), int(h*0.66)), "chal_4.png", icons_dir)

print("Done cropping extra icons.")
