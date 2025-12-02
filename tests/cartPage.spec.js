import{test,expect}from'@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { CartPage } from '../pages/cartPage';
import { exitCode } from 'process';


test.beforeEach('Login to the application',async({page})=>{
    const loginpage = new LoginPage(page);
    const username = 'akashmittal'
    const password = 'Hosting@123'
    await loginpage.openHomePage();
    await loginpage.login(username,password);
    await page.waitForTimeout(3999);
    const userDetails = await loginpage.getUserDetails(); 
    await expect(userDetails).toContain(username);

})
test('Verify added items to the cart',async({page})=>{
    const homepage = new HomePage(page);
    const cartpage = new CartPage(page);
    const productName = 'Iphone 6 32gb';

    await homepage.selectProduct(productName);
    await homepage.getProductDetails(productName);
    await homepage.addToCart();
    await cartpage.clickOnCartIcon();
    const rows = await cartpage.getRowCount();
    const columns = await cartpage.getColumnCount();
    // await expect(rows).toBe(1);
    await expect(columns).toBe(4);

})

test('Delete Product from the cart',async({page})=>{
    const homepage = new HomePage(page);
    const cartpage = new CartPage(page);
    const productName = 'Samsung galaxy s6';

    await homepage.selectProduct(productName);
    await homepage.getProductDetails(productName);
    await homepage.addToCart();
    await cartpage.clickOnCartIcon();
    const diff = await cartpage.deleteProduct('Iphone 6 32gb')
    await expect(diff).toBe(1);
})

test.only('Purchase Order',async({page})=>{
    const homepage = new HomePage(page);
    const cartpage = new CartPage(page);
    const productName = 'Iphone 6 32gb';
    const name ='Akash Mittal';
    const country = 'India';
    const city = 'Chandigarh';
    const cardNumber = '8888888888888888'
    const month = 'October'
    const year = '2026'

    await homepage.selectProduct(productName);
    await homepage.getProductDetails(productName);
    await homepage.addToCart();
    await cartpage.clickOnCartIcon();
    await cartpage.clickOnPlaceOrderBtn();
    const head = await cartpage.getPlaceOrderPopup();
    await expect(head).toBe('Place order');
    await cartpage.fillPurchaseOrderDetails(name,country,city,cardNumber,month,year);
    const msg = await cartpage.getSuccessPopup();
    await expect(msg).toBe('Thank you for your purchase!');

})

