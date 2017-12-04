const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Builder = webdriver.Builder,
    Key = webdriver.Key,
    until = webdriver.until;

class TAOBAOCRAWLER {
    constructor(url){
        this.url = url;
        this.driver = null;
        this.init();
    }
    init(){
        this.initBuilder();
        this.initURL();
    }
    async serach(key) {
        return this.driver.findElement(By.xpath("//*[@class='search-combobox-input']")).sendKeys(key, Key.RETURN);
    }
    async getHrefText() {
        let items = await this.getItems();
        this.driver.findElement(items[0]).getTagName().then(result=>{
            console.log('result', result);
        }, err=>{
            console.log('yaoerr', err);
        });
        let link = await this.getLink(items[0]);
        console.log(link);

        // let list = items.map(async (item)=>{
        //     try{
        //         // console.log('item', item);
        //         let i = await this.getLink(item);
        //         // console.log('i', i);
        //         return i ;
        //     }catch(err){
        //         // console.log('err', err);
        //     }
        //     // return this.gethref(this.getLink(item));
        // });
        // return list;
    }
    async gethref(item) {
        if(!item) return '';
        console.log('item', item);
        let href = item.getAttribute("href");
        return href
    }
    async getLink(item) {
        item.then(result =>{
            console.log('result', result);
        });
        try{
            let cl = await item.getTagName();
            console.log('yaoxiongyu item.findElement', cl);
            var title = await item.findElement(By.className("title"));
            console.log('title', title);
            var a = await title.findElement(By.tagName("a"));
            console.log('a', a);
            var href = await a.getAttribute("href");
            console.log('href', href);

        }catch(err){console.log('yaoxiong error', err);}
        let link = await item.findElement(By.className("title")).findElement(By.tagName("a")).getAttribute("href");
        return link;
        // return item.findElement(By.xpath("//*[@class='title']//a[0]"));
    }
    async getItems() {
        return this.driver.findElement(By.id("mainsrp-itemlist")).findElements(By.className("item"));
        // return this.driver.findElements(By.xpath("//*[@id='mainsrp-itemlist']//*[@class='item']"));
    }
    sleep(time) {
        this.driver.sleep(time);
    }
    initURL(){
        this.driver.get(this.url);
    }
    initBuilder(){
        this.driver = new Builder()
        .forBrowser('phantomjs')//firefox //phantomjs
        .build();
    }
    quit(){
        this.driver.quit();
    }
}
const crawler = new TAOBAOCRAWLER('https://www.taobao.com/');
crawler.serach("钢");
crawler.sleep(2000);
crawler.getHrefText().then((list)=>{
    list.forEach(function(item){
        item.then(result=>{
            // console.log('result', result);
        }, err=>{
            // console.log('err', err);
        });
    });
});
crawler.quit();