import time
import pytest
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options


@pytest.fixture
def driver():
    options = Options()
    
    # Configuration for headless mode in CI environments
    if os.environ.get('CI') == 'true':
        options.add_argument('--headless')
    
    # Additional options to prevent authentication errors and improve CI compatibility
    options.add_argument('--inprivate')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-default-apps')
    options.add_argument('--no-first-run')
    options.add_argument('--no-default-browser-check')
    options.add_argument('--window-size=1920,1080')
    
    # Suppress the DevTools listening message
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    # Use this approach for GitHub Actions to avoid the browser driver installation issue
    if os.environ.get('CI') == 'true':
        # For CI, use a predefined driver path or let GitHub Actions manage it
        driver = webdriver.Edge(options=options)
    else:
        # For local development, use WebDriver Manager
        service = Service(EdgeChromiumDriverManager().install())
        driver = webdriver.Edge(service=service, options=options)
    
    # No need to maximize in headless mode
    if not os.environ.get('CI') == 'true':
        driver.maximize_window()
    
    yield driver
    driver.quit()


# TC-01: Verify Landing Page Loads Correctly
def test_landing_page_loads(driver):
    driver.get("http://localhost:3000")  # Update with actual URL
    assert "Welcome" in driver.page_source  # Adjust based on text in LandingPage
    assert driver.find_element(By.TAG_NAME, "nav")  # Ensure navigation bar is present

# TC-02: Validate Responsive Design (Basic Test)
def test_responsive_design(driver):
    driver.set_window_size(375, 812)  # Simulate mobile screen
    driver.get("http://localhost:3000")
    assert driver.find_element(By.TAG_NAME, "nav").is_displayed()

# TC-03: Negative Login - Invalid Password
def test_invalid_password(driver):
    driver.get("http://localhost:3000/login")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))

    driver.find_element(By.ID, "username").send_keys("testuser")
    driver.find_element(By.ID, "password").send_keys("wrongpass")
    driver.find_element(By.XPATH, "//button[text()='Login']").click()
    time.sleep(1)
    assert "Invalid username or password" in driver.page_source  # Ensure error message appears

# TC-04: Negative Login - Empty Fields
def test_empty_fields(driver):
    driver.get("http://localhost:3000/login")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))

    login_button = driver.find_element(By.XPATH, "//button[text()='Login']")
    login_button.click()

    username_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")

    assert driver.execute_script("return arguments[0].validationMessage;", username_field) != ""
    assert driver.execute_script("return arguments[0].validationMessage;", password_field) != ""

# TC-05: Positive Login Test
def test_valid_login(driver):
    driver.get("http://localhost:3000/login")  # Update with actual login route
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
    driver.find_element(By.ID, "username").send_keys("user")
    driver.find_element(By.ID,"password").send_keys("password")
    driver.find_element(By.XPATH, "//button[text()='Login']").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/home"))
    assert "/home" in driver.current_url  # Ensure redirection

# TC-06: Navigation Verification
def test_navigation(driver):
    # First, log in to ensure the navigation bar is visible
    driver.get("http://localhost:3000/login")
    
    # Assuming a test user
    driver.find_element(By.ID, "username").send_keys("user")
    driver.find_element(By.ID, "password").send_keys("password")
    driver.find_element(By.XPATH, "//button[text()='Login']").click()
    
    # Wait until redirected to home
    WebDriverWait(driver, 10).until(EC.url_contains("/home"))

    # perform navigation tests
    driver.find_element(By.LINK_TEXT, "Users").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/users"))
    assert "/users" in driver.current_url

    driver.find_element(By.LINK_TEXT, "Albums").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/albums"))
    assert "/albums" in driver.current_url

    search_box = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
    search_box.clear()
    search_box.send_keys("quidem")
    search_box.send_keys(Keys.RETURN)

    # Wait until search results are populated
    WebDriverWait(driver, 10).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "li")) > 0)

    # Retrieve all search results
    results = driver.find_elements(By.CSS_SELECTOR, "li")

    # Print results for debugging (optional)
    for result in results:
        print(result.text)

    # Ensure at least one result contains the search term
    assert any("quidem" in result.text.lower() for result in results), "No search results contain the term 'quidem'."

