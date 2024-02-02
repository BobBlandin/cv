import chromedriver_autoinstaller
import os
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By

display = Display(visible=0, size=(800, 800))
display.start()

chromedriver_autoinstaller.install()  # Check if the current version of chromedriver exists
# and if it doesn't exist, download it automatically,
# then add chromedriver to path

chrome_options = webdriver.ChromeOptions()
# Add your options as needed
options = [
    # Define window size here
    "--window-size=1200,1200",
    "--ignore-certificate-errors"

    # "--headless",
    # "--disable-gpu",
    # "--window-size=1920,1200",
    # "--ignore-certificate-errors",
    # "--disable-extensions",
    # "--no-sandbox",
    # "--disable-dev-shm-usage",
    # '--remote-debugging-port=9222'
]

for option in options:
    chrome_options.add_argument(option)

## set download directory as current executable path
prefs = {"download.default_directory": os.getcwd()}
options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=chrome_options)

driver.get('http://localhost:4200/')
print(driver.title)

# click on the screen
driver.find_element(By.ID, 'root').click()

# wait 2 seconds
driver.implicitly_wait(5)

driver.quit()
