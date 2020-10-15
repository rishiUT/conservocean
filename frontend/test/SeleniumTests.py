import selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
PATH = ".\chromedriver.exe"

options = Options()
options.binary_location = "C:\Program Files (x86)\BraveSoftware\Brave-Browser\Application\\brave.exe"

driver = webdriver.Chrome(options=options, executable_path=PATH, )

driver.get("https://conservocean.me")
print(driver.title)
driver.close()