import chromedriver_autoinstaller
import logging
import os
import time
# from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.remote_connection import LOGGER

LOGGER.setLevel(logging.DEBUG)

# Check if the current version of chromedriver exists
# and if it doesn't exist, download it automatically,
# then add chromedriver to path
chromedriver_autoinstaller.install()

chrome_options = webdriver.ChromeOptions()
options = [
    "--window-size=1200,1200",
    "--ignore-certificate-errors",
    "--log-level=0",
    "--enable-logging --v=1",
    "--verbose",
    "--headless",
]

for option in options:
    chrome_options.add_argument(option)

## set download directory as current executable path
prefs = {"download.default_directory": os.getcwd()}
chrome_options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=chrome_options)

print("Opening the website")
driver.get('http://localhost:4200/')

print("Waiting for the page to load")
time.sleep(5)

print("Clicking the download button")
driver.find_element(By.ID, 'downloadButton').click()

print("Waiting for the download to complete")
time.sleep(5)

driver.quit()
