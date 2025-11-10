exports.HomePage =
class HomePage{

    constructor(page){

        this.page = page;
        this.cards = '//a[@class="hrefch"]';
        this.category = '[id="itemc"]';
        this.productHead = '.name';
        this.addToCartBtn = "//a[normalize-space()='Add to cart']";
    }

    async readCategory(){

        let categories = await this.page.$$(this.category);
        for(let cat of categories){
            const category = await cat.textContent();
            console.log('Category name is: ',category.trim());
        }
    }

    async selectCategory(){
        let found = false;
        let categories = await this.page.$$(this.category);

        for(let cat of categories){

            const category = await cat.textContent();

            console.log('Category name is: ',category.trim());

                if (category.includes('Phones') || category.includes('Laptops') || category.includes('Monitors')) {

            await cat.click();
            await this.page.waitForTimeout(5000);

            let products = await this.page.$$(this.cards);
            console.log('length of the products is: ',products.length);
            for(let pro of products){

                const product = await pro.textContent();

                if (product.includes('Iphone 6 32gb') || product.includes('MacBook Pro') || product.includes('Apple monitor 24')) {
                    console.log('founded product is:' ,product);
                    console.log('product of the category ',category, ' is found')
                    found = true;
            }
            }
        }
    }
    return found;
}

async readProducts(){
    await this.page.waitForTimeout(3999);
            const products = await this.page.$$(this.cards)
            console.log('product length is: ',products.length);
            for(let pro of products){
                const product = await pro.textContent();
                    console.log('product name is: ',product)
}
}


async selectProduct(productName){
     await this.page.waitForTimeout(3999);
            const products = await this.page.$$(this.cards)
            console.log('product length is: ',products.length);
            for(let pro of products){
     await this.page.waitForTimeout(3999);
                const product = await pro.textContent();
                if(product.includes(productName)){
                    await pro.click();
                    break;
                }
}   
}

async getProductDetails(productName){

    await this.page.waitForSelector(this.productHead);
    const head = await this.page.locator(this.productHead).textContent();
    return head;
}

async addToCart(){

    await this.page.locator(this.addToCartBtn).click();

}



}


