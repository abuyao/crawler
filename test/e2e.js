var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Key = webdriver.Key,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')//firefox //phantomjs
    .build();

// let home = driver.findElement(By.tagName("div"));
// home.then(data=>{
//     console.log('taobao',data.getText());
// });
async function getlistname() {
    try {
        await driver.sleep(1000);
        var el = await driver.findElement(By.id("mainsrp-itemlist")).findElements(By.className("item"));
        await el.map(async (item, index) => {
            let href = await item.findElement(By.className("title")).findElement(By.tagName("a")).getAttribute("href");
            console.log('detail href ' + index, href);
            return href;
        });
        // el.forEach(async href=>{
        //     await driver.navigate().to(href);
        //     await driver.sleep(2000);
        //     await driver.navigate().back();
        //     await driver.sleep(2000);
        // });
    } catch(err){
        getlistname();
    }
}
async function getlist() {
    await driver.get('https://www.taobao.com/');
    await driver.findElement(By.className("search-combobox-input")).sendKeys('钢', Key.RETURN);
    getlistname();
}

getlist();
// .then(data=>{
//     console.log("items", data.findElement(By.className("title")).findElement(By.tagName("a")));
// });
driver.getTitle().then((data) => {
    console.log(data);
});

driver.sleep(1000 * 100);
driver.quit();