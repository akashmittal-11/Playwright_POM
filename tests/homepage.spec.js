import{test,expect}from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';



test('Read Categories',async({page})=>{
    const homepage = new HomePage(page);
    await page.goto('https://www.demoblaze.com/index.html#')
    await homepage.readCategory();
})

test('Select Category',async({page})=>{
    const homepage = new HomePage(page);
    await page.goto('https://www.demoblaze.com/index.html#')
    const status =  await homepage.selectCategory();
    await expect(status).toBe(true);
})

test('Read Products',async({page})=>{
    const homepage = new HomePage(page);
    await page.goto('https://www.demoblaze.com/index.html#')
    await homepage.readProducts();
})

test('Select Product',async({page})=>{
    const homepage = new HomePage(page);
    const productName = 'Iphone 6 32gb';
    await page.goto('https://www.demoblaze.com/index.html#')
    await homepage.selectProduct(productName);
    const head = await homepage.productPage(productName);
    await expect(head).toBe(productName);

})

test.only('Add Product to the Cart',async({page})=>{
    const homepage = new HomePage(page);
    const productName = 'Iphone 6 32gb';
    await page.goto('https://www.demoblaze.com/index.html#');
    await homepage.selectProduct(productName);
    const head = await homepage.getProductDetails(productName);
    await expect(head).toBe(productName);

    page.on('dialog',async dialog=>{
        const msg = dialog.message();
        await expect(msg).toBe('Product added.');
        await dialog.accept();
    })

    await homepage.addToCart();

})




