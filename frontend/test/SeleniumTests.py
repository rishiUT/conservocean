import selenium
from selenium import webdriver

from selenium.webdriver.chrome.options import Options

from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
PATH = ".\chromedriver.exe"

options = Options()
options.binary_location = "C:\Program Files (x86)\BraveSoftware\Brave-Browser\Application\\brave.exe"

driver = webdriver.Chrome(options=options, executable_path=PATH, )

driver.get("https://conservocean.me")

#Start at homepage
#Ensure you can open about page
    #Perhaps open it in a separate tab?
    #Right now, that's all the model page does. If we implement anything else, like links to the tools we used, we can add to the tests.
#Ensure you can open each model page
    #On each model page, open several instances, just to make sure you can
    #On each model page, use pagination to turn to the next page, then to turn to the last page, then to turn to page 2
#That's all we have implemented, so close all the tabs and quit the browser


print(driver.title)
print(driver.current_url)

link = driver.find_element_by_link_text("Bodies of Water")
link.click()
print(driver.current_url)
driver.back()

link = driver.find_element_by_link_text("Aquatic Animals")
link.click()
print(driver.current_url)
driver.back()

link = driver.find_element_by_link_text("Human Impacts")
link.click()
print(driver.current_url)
driver.back()

time.sleep(5)

buttons = driver.find_elements_by_class_name("button")
for button in buttons:
    print(button.text)
    #button.click() Don't do this, it invalidates the buttons selenium stores
    #driver.back()
    
#Useful commands:
#driver.forward()
#driver.back()
#driver.refresh()
#Can use Try-Except Block to wait for a slow page

time.sleep(5)

driver.close()
driver.quit()