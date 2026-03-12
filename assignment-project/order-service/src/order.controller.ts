import { Controller, Get, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('orders')
export class OrderController {
  private orders: any[] = [];

  @Get()
  getOrders() {
    return this.orders;
  }

  @Post()
  async createOrder(@Body() body: any) {
    const { productId, quantity } = body;

    try {
      // Call product service
      const response = await axios.get(
        `http://localhost:3001/products/${productId}`,
      );

      const product = response.data;

      if (!product) {
        return { message: 'Product not found' };
      }

      const order = {
        id: this.orders.length + 1,
        product,
        quantity,
      };

      this.orders.push(order);

      return order;
    } catch (error) {
      return { message: 'Error communicating with product service' };
    }
  }
}