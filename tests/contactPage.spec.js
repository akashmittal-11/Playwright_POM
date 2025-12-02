import{test,expect}from '@playwright/test';
import { ContactPage } from '../pages/contactPage';
import { LoginPage } from '../pages/loginPage';

test('Submit Contact Form',async({page})=>{

    const loginPage = new LoginPage(page);
    const contactPage = new ContactPage(page);
    const email = 'testuser@mail.com';
    const name = 'Test User';
    const message = 'This is the test message';
    await loginPage.openHomePage();
    await contactPage.clickOnContactLink();
    const head = await contactPage.getContactPopupHead();
    expect(head).toBe('New message');
    await contactPage.fillContactForm(email,name,message);
})

