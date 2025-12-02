const { expect } = require("@playwright/test");

exports.ContactPage=
class ContactPage{

    constructor(page){

        this.page = page;
        this.contactLink = "//a[normalize-space()='Contact']";
        this.contactPopupHead = "#exampleModalLabel";
        this.email = "#recipient-email";
        this.name = "#recipient-name";
        this.message = "#message-text";
        this.submitBtn = "//button[normalize-space()='Send message']";

    }

    async clickOnContactLink(){
        await this.page.waitForSelector(this.contactLink);
        await this.page.locator(this.contactLink).click();
    }

    async getContactPopupHead(){
        await this.page.waitForSelector(this.contactPopupHead);
        const head = await this.page.locator(this.contactPopupHead).textContent();
        return head;
    }

    async fillContactForm(email,name,message){
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.name).fill(name);
        await this.page.locator(this.message).fill(message);
        this.page.once('dialog',async dialog=>{
            const msg = dialog.message();
            dialog.accept();
            console.log('message is: ',msg)
            expect(msg).toBe('Thanks for the message!!');
        })
        await this.page.locator(this.submitBtn).click();

    }
}