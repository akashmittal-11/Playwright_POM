import{test,expect}from'@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { CartPage } from '../pages/cartPage';
import { exitCode } from 'process';


test('Verify added items to the cart',async({page})=>{

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const cartpage = new CartPage(page);
    const productName = 'Iphone 6 32gb';
    const username = 'akashmittal'
    const password = 'Hosting@123'
    await loginpage.openHomePage();
    await loginpage.login(username,password);
    await page.waitForTimeout(3999);
    const userDetails = await loginpage.getUserDetails(); 
    await expect(userDetails).toContain(username);

    await homepage.selectProduct(productName);
    await homepage.getProductDetails(productName);
    await homepage.addToCart();
    await cartpage.clickOnCartIcon();
    const rows = await cartpage.getRowCount();
    const columns = await cartpage.getColumnCount();
    // await expect(rows).toBe(1);
    await expect(columns).toBe(4);

})