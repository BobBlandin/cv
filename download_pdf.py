import chromedriver_autoinstaller
import logging
import os
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.remote_connection import LOGGER

LOGGER.setLevel(logging.DEBUG)

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
    "--ignore-certificate-errors",
    # log level to debug
    "--log-level=0",
    "--enable-logging",
    "--headless",
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
chrome_options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=chrome_options)

driver.get('http://localhost:4200/')
print(driver.title)

driver.implicitly_wait(5)

# click on the screen at 100, 100
# driver.execute_script("document.elementFromPoint(100, 100).click();")
driver.find_element(By.ID, 'downloadButton').click()

driver.implicitly_wait(5)

# display if root exist always
elt = driver.find_element(By.ID, 'root')
print("Element found: ", elt)

logs = driver.get_log('browser')
print("Logs: ", logs)

for entry in logs:
    print(entry)

driver.quit()
