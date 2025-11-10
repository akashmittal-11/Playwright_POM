import{test,expect}from'@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.only('Login with valid inputs',async({page})=>{

    const loginPage = new LoginPage(page);
    const username = 'akashmittal'
    const password = 'Hosting@123'
    await loginPage.openHomePage();
    await loginPage.login(username,password);
    await page.waitForTimeout(3999);
    const userDetails = await loginPage.getUserDetails(); 
    await expect(userDetails).toContain(username);

})


test('Login with invalid details',async({page})=>{

    const loginpage = new LoginPage(page);
    await loginpage.openHomePage();

    await page.on('dialog',async dialog =>{

        const msg = dialog.message();

        console.log(msg);
        await expect(msg).toBe('Please fill out Username and Password.')
        dialog.accept();

    })
    await loginpage.login('akash','');


})