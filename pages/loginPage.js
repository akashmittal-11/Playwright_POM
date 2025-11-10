exports.LoginPage = 
class LoginPage{

    constructor(page) {
        this.page = page;
        this.loginLink = '#login2';
        this.username = '#loginusername';
        this.password = '#loginpassword';
        this.loginBtn = "button[onclick='logIn()']";
        this.userDetails = "//a[@id='nameofuser']";
    }

    // Navigate to the demo site and wait for full load
    async openHomePage() {
        // await this.page.goto("https://demoblaze.com/");
        await this.page.goto('https://demoblaze.com/', { waitUntil: 'domcontentloaded' });
    }

async login(username,password){
    await this.page.locator(this.loginLink).click();
    await this.page.locator(this.username).fill(username);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginBtn).click();
}

async getUserDetails(){

    const user = await this.page.locator(this.userDetails).textContent();
    console.log('username is: ',user);
    return user;
}
}
 