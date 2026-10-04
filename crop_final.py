import os
from PIL import Image

designs_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\designs"
icons_dir = r"c:\Users\LENOVO\Desktop\L400\PROJECT WORK\BreakTime\BreakTime\frontend\assets\icons"
os.makedirs(icons_dir, exist_ok=True)

def crop_image(filename, box, output_name):
    img_path = os.path.join(designs_dir, filename)
    if not os.path.exists(img_path): return
    img = Image.open(img_path)
    cropped = img.crop(box)
    cropped.save(os.path.join(icons_dir, output_name))
    print(f"Saved {output_name}")

img = Image.open(os.path.join(designs_dir, "01_Splash_Screen.png"))
w, h = img.size

# 04_Home_Dashboard.png
# Activity row icons (4 of them, circles)
crop_image("04_Home_Dashboard.png", (int(w*0.1), int(h*0.37), int(w*0.25), int(h*0.45)), "home_icon_1.png")
crop_image("04_Home_Dashboard.png", (int(w*0.3), int(h*0.37), int(w*0.45), int(h*0.45)), "home_icon_2.png")
crop_image("04_Home_Dashboard.png", (int(w*0.55), int(h*0.37), int(w*0.7), int(h*0.45)), "home_icon_3.png")
crop_image("04_Home_Dashboard.png", (int(w*0.75), int(h*0.37), int(w*0.9), int(h*0.45)), "home_icon_4.png")
# Coin icon inside Points card
crop_image("04_Home_Dashboard.png", (int(w*0.55), int(h*0.52), int(w*0.75), int(h*0.62)), "home_coin.png")
# Fire icon inside Streak card
crop_image("04_Home_Dashboard.png", (int(w*0.1), int(h*0.52), int(w*0.3), int(h*0.62)), "home_fire.png")

# 09_Stats_Progress.png
# 4 stats cards icons
crop_image("09_Stats_Progress.png", (int(w*0.08), int(h*0.28), int(w*0.18), int(h*0.33)), "stat_icon_1.png")
crop_image("09_Stats_Progress.png", (int(w*0.52), int(h*0.28), int(w*0.62), int(h*0.33)), "stat_icon_2.png")
crop_image("09_Stats_Progress.png", (int(w*0.08), int(h*0.39), int(w*0.18), int(h*0.44)), "stat_icon_3.png")
crop_image("09_Stats_Progress.png", (int(w*0.52), int(h*0.39), int(w*0.62), int(h*0.44)), "stat_icon_4.png")

# 10_Profile.png
# Profile Avatar
crop_image("10_Profile.png", (int(w*0.05), int(h*0.15), int(w*0.3), int(h*0.25)), "profile_avatar.png")

print("Final assets cropped.")
