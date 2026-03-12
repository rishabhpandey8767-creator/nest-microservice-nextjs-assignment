import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

@Controller('products')
export class ProductController {
  private products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
  ];

  // Get all products
  @Get()
  getProducts() {
    return this.products;
  }

  // Get product by id
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.products.find((p) => p.id === Number(id));
  }

  // Create product
  @Post()
  createProduct(@Body() body: any) {
    const newProduct = {
      id: this.products.length + 1,
      name: body.name,
      price: body.price,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // Delete product
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.products = this.products.filter((p) => p.id !== Number(id));
    return { message: 'Product deleted successfully' };
  }
}
