'use strict';

const {Builder, By, Key, until} = require('./node_modules/selenium-webdriver');
const {Options} = require('./node_modules/selenium-webdriver/chrome');
let settings = require('./settings.json'); 

function time(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function sleepPromise(time){
  return new Promise((resolve, reject)=>setTimeout(resolve, time));
}

const screen = {
  width: 1280,
  height: 960
};

(async function() {
  let driver;
  try {
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(
            new Options().windowSize(screen))
        .build();
    await driver.get('https://www.instagram.com/accounts/login/');
    await sleepPromise(time(4000, 7000));
    await driver.findElement(By.name('username')).sendKeys(settings.bot_login, /*Key.RETURN*/);
    await driver.findElement(By.name('password')).sendKeys(settings.bot_pass, /*Key.RETURN*/);
    await sleepPromise(time(4000, 7000));
    await driver.findElement(By.xpath('/html/body/span/section/main/div/article/div/div[1]/div/form/div[3]')).click(); //вход
    await sleepPromise(time(5000, 7000));
    await driver.findElement(By.xpath('/html/body/div[3]/div/div/div/div[3]/button[2]')).click(); //уведомления
    await sleepPromise(time(4000, 7000));

  
      await driver.get(settings.posts_to_copy_followers);
      await sleepPromise(time(4000, 7000));
      await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/section[2]/div/div/a')).click();
      await sleepPromise(time(4000, 7000)); 
      for(let j=1; j<10; j++){
        await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).click(); 
        await sleepPromise(time(1500, 2500))};
      

  
      await driver.get(settings.posts_to_unfollow);
      await sleepPromise(time(4000, 7000));
      await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/section[2]/div/div/a')).click();
      await sleepPromise(time(4000, 7000));
      for(let j=1; j<10; j++){
        await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div[2]/ul/div/li[' + j + ']/div/div[2]/button')).click(); 
        await driver.findElement(By.xpath('/html/body/div[4]/div/div/div/div[3]/button[1]')).click(); 
        await sleepPromise(time(1500, 2500));
      };
    

 
      await driver.get(settings.posts_to_like_comments);
      await sleepPromise(time(4000, 7000));
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/li[2]/button')).click(); 
        await sleepPromise(time(1500, 2500));
        for(let j=3; j<50; j++){
          await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/li[' + j + ']/div/span/button/span')).click(); 
          await sleepPromise(time(1500, 2500));
        };
      
     
  
    await driver.get('https://www.instagram.com/explore/tags/' + settings.tag);
    await sleepPromise(time(4000, 7000));
    await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/article/div[2]/div/div[1]/div[1]/a/div/div[2]')).click(); //first newest photo
    await sleepPromise(time(4000, 7000));
    for(let i = 0; i < settings.likes_quantity_for_tag; i++){
          await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/article/div[2]/section[1]/span[1]/button/span')).click(); 
          await sleepPromise(time(1500, 2500));
          await driver.findElement(By.xpath('/html/body/div[3]/div/div[1]/div/div/a[2]')).click(); 
          await sleepPromise(time(1500, 2500)); 
        };
    
  
  } finally {
    await driver && driver.quit();
  }
})().then(_ => console.log('SUCCESS'), err => console.error('ERROR: ' + err)); 


