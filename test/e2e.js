var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

var driver = new webdriver.Builder()
.forBrowser('phantomjs')
.build();

driver.get('http://localhost:5008/account/expire');
driver.sleep(1000*100);
driver.quit();