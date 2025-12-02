exports.CartPage=
class CartPage{

    constructor(page){
        this.page = page;
        this.cart = "//a[normalize-space()='Cart']";
        this.table = '.table';
        this.row = 'table tbody tr';
        this.column = 'table thead tr th';
        this.delete = "//a[normalize-space()='Delete']";
        this.placeOrder = '.btn.btn-success';
        this.placeOrderHead = '#orderModalLabel';
        this.name = '#name';
        this.country = '#country';
        this.city = '#city';
        this.card = '#card';
        this.month = '#month';
        this.year = '#year';
        this.purchaseBtn = "//button[normalize-space()='Purchase']";
        this.thankYouMsg = "//h2[contains(.,'Thank you for your purchase!')]";
        this.okBtn = "//button[normalize-space()='OK']";
    }


    async clickOnCartIcon(){
        await this.page.locator(this.cart).click();
        await this.page.waitForTimeout(3999);

    }

    async getRowCount(){
        await this.page.waitForTimeout(3999);
        const rows = await this.page.$$(this.row);
        const rowCount = rows.length;
        console.log('Total Rows are: ',rowCount);
        return rowCount;
    }
    
    async getColumnCount(){
        const columns = await this.page.$$(this.column);
        const columnCount = columns.length;
        console.log('Total Columns are: ',columnCount);
        return columnCount;
    }

    async deleteProduct(productName){
        const rows = await this.page.locator(this.row);
            await this.page.waitForTimeout(2999);
           
            const matchedRows = rows.filter({
                has: this.page.locator('td'),
                hasText: productName
            })
                console.log('match founded')
                   const beforeCount = await matchedRows.count();
                   console.log('before delete matched rows are: ',beforeCount)
                
                
                   if(beforeCount ===0){
                    const count = 1;
                    console.log('No Product Founded')
                    return count;
                   }
                
                   else{

                    await matchedRows.nth(0).locator('a').click();
                    console.log('Product Deleted!!');
                    await this.page.waitForTimeout(2999);
                   const afterCount = await matchedRows.count();
                   console.log('after delete matched rows are: ',afterCount)
                    const countDiff = beforeCount - afterCount;
                    return countDiff;

                   }
       
        }

        async clickOnPlaceOrderBtn(){
            await this.page.locator(this.placeOrder).click();
        }

        async getPlaceOrderPopup(){
            await this.page.waitForSelector(this.placeOrderHead);
            const head = this.page.locator(this.placeOrderHead).textContent();
            return head;
        }

        async fillPurchaseOrderDetails(name,country,city,cardNumber,month,year){
            await this.page.locator(this.name).fill(name);
            await this.page.locator(this.country).fill(country);
            await this.page.locator(this.city).fill(city);
            await this.page.locator(this.card).fill(cardNumber);
            await this.page.locator(this.month).fill(month);
            await this.page.locator(this.year).fill(year);
            await this.page.locator(this.purchaseBtn).click();
        }

        async getSuccessPopup(){
            await this.page.waitForSelector(this.okBtn);
            const msg = await this.page.locator(this.thankYouMsg).textContent();
            return msg;
            await this.page.locator(this.okBtn).click();
        }
        
    }
