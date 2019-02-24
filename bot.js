const chrome = require('./node_modules/selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('./node_modules/selenium-webdriver');
let settings = require('./settings.json');

const width = 1280;
const height = 960;

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
        new chrome.Options()/*.addArguments("--proxy-server='direct://'")
    .addArguments("--proxy-bypass-list=*").headless()*/.windowSize({width, height}))
    .build();

    //.addArguments("--proxy-server='direct://'")
    //.addArguments("--proxy-bypass-list=*")
    //This two lines will make your headless chrome faster, if it's not fast enough.
    //I suppose you don`t need it completely working with the Linux or the MacOS. Principally
    //it may be necessary, if you try to run it on the Windows.

const time = (min, max) => Math.floor(Math.random() * (max - min) + min);

driver.get('https://www.instagram.com/accounts/login/')
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.name('username')).sendKeys(settings.bot_login))
    .then(_ => driver.findElement(By.name('password')).sendKeys(settings.bot_pass))
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('/html/body/span/section/main/div/article/div/div[1]/div/form/div[3]')).click())
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div/div[3]/button[2]')).click()) //stoped headless
    .then(_ => driver.sleep(time(3000,4000)))


//liking comment by post

    .then(_ => driver.get(settings.posts_to_like_comments))
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/article/div[2]/div[1]/ul/li[2]/button')).click()) //load more comments
    .then(_ => driver.sleep(time(3000,4000)))
.then(_ => {
    for(let j=3; j<50; j++){
        driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/li[' + j + ']/div/span/button/span')).getAttribute('aria-label')
        .then(_ =>{
            if(_ = "Не нравится"){
            console.log('Already done.');
            } else {
                driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/li[' + j + ']/div/span/button/span')).click()
                .then(_ => console.log('Liked!'));
            }
        })
    .then(_ => driver.sleep(time(3000,4000)))
    }
})


//liking tag

    .then(_ => driver.get('https://www.instagram.com/explore/tags/' + settings.tag))
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('//*[@id="react-root"]/section/main/article/div[2]/div/div[1]/div[1]/a/div/div[2]')).click())
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/article/div[2]/section[1]/span[1]/button/span')).getAttribute('aria-label'))
    .then(_ =>{
        if(_ = "Не нравится"){
            console.log('Already done.');
        } else {
            driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/article/div[2]/section[1]/span[1]/button/span')).click()
            .then(_ => console.log('Liked!'));
        }
    })

//following users by post

    .then(_ => driver.get(settings.posts_to_copy_followers))
    .then(_ => driver.sleep(time(3000,4000)))
    .then(_ => driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/section[2]/div/div/a')).click())
    .then(_ => driver.sleep(time(3000,4000)))
//comment the next one to use unfollow part
    .then(_ => {
        for(let j=1; j<=settings.users_to_follow; j++){
        driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).getText()
        .then(_ => {
            if(_ = "Подписаться"){
                    driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).click()
                    .then(_ => console.log('Followed!'));
                } else {
                    console.log('Already done.');
                }
            })
        .then(_ => driver.sleep(time(3000,4000)))
        }
    })

//unfollowing users by post
//comment the next one to use follow part
  .then(_ => {
        for(let j=1; j<=settings.users_to_unfollow; j++){
        driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).getText()
        .then(_ => {
            if (_ = "Подписаться"){
                    console.log('Already done.');
                }
                else {
                    driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).click()
                    .then(_ => driver.findElement(By.xpath('/html/body/div[4]/div/div/div/div[3]/button[1]')).click())
                    .then(_ => console.log('Unfollowed!'));
                }
            })
        .then(_ => driver.sleep(time(3000,4000)))
        }
    })


    .then(_ => console.log('Everything worked out!'),
        _ => driver.quit(),
        e => driver.quit().then(() => { throw e; }))
    .catch(err => console.error('ERROR: ' + err));
