import{test,expect}from'@playwright/test';
import { SignUp } from '../pages/signUp';
import { LoginPage } from '../pages/loginPage';

test('Sign Up with Valid details',async({page})=>{

    const signUp = new SignUp(page);
    const login = new LoginPage(page);
    await login.openHomePage();

    page.on('dialog',async dialog=>{
        const msg = dialog.message();
        expect(msg).toBe('Sign up successful.')
        dialog.accept();

    })
    await signUp.userSignUp('testuser','Hosting@123');
})

test('Sign Up with invalid details',async({page})=>{

    const signUp = new SignUp(page);
    const login = new LoginPage(page);
    await login.openHomePage();

    page.on('dialog',async dialog=>{
        const msg = dialog.message();
        expect(msg).toBe('Please fill out Username and Password.')
        dialog.accept();

    })
    await signUp.userSignUp('','Hosting@123');
})

test('Sign Up with existed user',async({page})=>{

    const signUp = new SignUp(page);
    const login = new LoginPage(page);
    await login.openHomePage();

    page.on('dialog',async dialog=>{
        const msg = dialog.message();
        expect(msg).toBe('This user already exist.')
        dialog.accept();

    })
    await signUp.userSignUp('testuser','Hosting@123');
})



