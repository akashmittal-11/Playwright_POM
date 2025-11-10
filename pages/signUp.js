exports.SignUp =
class SignUp{

    constructor(page){
        this.page = page;
        this.signUp = '#signin2';
        this.username = '#sign-username';
        this.password = '#sign-password';
        this.signUpBtn = '[onclick="register()"]';
    }


    async userSignUp(username,password){

        await this.page.locator(this.signUp).click();
        await this.page.locator(this.username).fill(username)
        await this.page.locator(this.password).fill(password)
        await this.page.locator(this.signUpBtn).click()
    }

}