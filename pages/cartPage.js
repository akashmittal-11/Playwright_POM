exports.CartPage=
class CartPage{

    constructor(page){
        this.page = page;
        this.cart = "//a[normalize-space()='Cart']";
        this.table = '.table';
        this.row = 'tbody tr';
        this.column = 'thead th';
        this.delete = "//a[normalize-space()='Delete']";
    }


    async clickOnCartIcon(){
        await this.page.locator(this.cart).click();
    }
    async getRowCount(){
        await this.page.waitForTimeout(3999);
        const table = this.page.locator(this.table);
        const rows = table.locator(this.row);
        const rowCount = rows.count();
        console.log('Total Rows are: ',rowCount);
        return rowCount;
    }
    
    async getColumnCount(){
        const table = this.page.locator(this.table);
        const columns = table.locator(this.column);
        const columnCount = columns.count();
        console.log('Total Columns are: ',columnCount);
        return columnCount;
    }

}