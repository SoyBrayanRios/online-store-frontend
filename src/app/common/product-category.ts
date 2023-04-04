export class ProductCategory {

    id!: number;
    categoryName!: string;
    categoryImage!: string;

    constructor(id: number, categoryName: string, categoryImage: string) {
            this.id = id;
            this.categoryName = categoryName;
            this.categoryImage = categoryImage;
    }
}