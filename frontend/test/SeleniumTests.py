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

# Test About page
link = driver.find_element_by_link_text("About")
link.click()
print(driver.current_url)
try:
    assert driver.current_url == "https://www.conservocean.me/about"
except:
    print("Assert failed, url = " + driver.current_url)
    driver.quit()
driver.back()
#About Page Tests End


# Test Bodies of Water Page
link = driver.find_element_by_link_text("Bodies of Water")
link.click()
print(driver.current_url)
try:
    assert driver.current_url == "https://www.conservocean.me/water-bodies"
except:
    print("Assert failed, url = " + driver.current_url)
    driver.quit()

#Test Pagination (Does it exist?)
link = driver.find_element_by_link_text("2")
link.click()
# Test to see if the page is different, somehow
#testElem = driver.find_element_by_class_name("page-item active")
try:
    print(testElem)
except:
    print("Assert failed, url = " + driver.current_url)
    driver.quit()

driver.back()
# Water Bodies Page Tests End



# Test Species Page
link = driver.find_element_by_link_text("Species")
link.click()
print(driver.current_url)
try:
    assert driver.current_url == "https://www.conservocean.me/species"
except:
    print("Assert failed, url = " + driver.current_url)
    driver.quit()

#Test Pagination (Does it exist?)
link = driver.find_element_by_link_text("2")
link.click()
# Test to see if the page is different, somehow

driver.back()
# Species Page Tests End



# Test Human Impacts Page
link = driver.find_element_by_link_text("Human Impacts")
link.click()
print(driver.current_url)
try:
    assert driver.current_url == "https://www.conservocean.me/impacts"
except:
    print("Assert failed, url = " + driver.current_url)
    driver.quit()

#Test Pagination (Does it exist?)
link = driver.find_element_by_link_text("2")
link.click()
# Test to see if the page is different, somehow

driver.back()
# Human Impacts Page Tests End



time.sleep(5) #Before searching for elements, wait for the page to load

buttons = driver.find_elements_by_class_name("button")
for button in buttons:
    print(button.text)
    #button.click() Don't do this, it invalidates the buttons selenium stores
    #driver.back()

driver.close()
driver.quit()