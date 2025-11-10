import{test,expect}from'@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('Login',async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.openHomePage();
    await loginPage.login('akashmittal','Hosting@123');
})