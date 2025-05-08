import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PgAdapter } from './pg-adapter';

/**
 * PrismaService provides a database interface compatible with the application
 * while bypassing Prisma's dependency on libssl.so.1.1 by using a direct 
 * PostgreSQL adapter.
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Add property for PrismaHealthIndicator compatibility
  $extends = { $metrics: { json: { parse: JSON.parse } } };
  private readonly logger = new Logger(PrismaService.name);
  
  // Use PgAdapter instead of PrismaClient
  private adapter: PgAdapter;
  private modelProxies: Record<string, any> = {};

  constructor() {
    this.adapter = new PgAdapter();
    this.logger.log('PrismaService initialized with PostgreSQL adapter');
    this.initializeModelProxies();
  }
  
  private initializeModelProxies() {
    // Create proxy objects for all models
    // These proxies will map Prisma-like methods to our PgAdapter methods
    const models = [
      'users', 'product', 'category', 'order', 'orderItem',
      'seller', 'productImage', 'productVariant', 'productVariantAttribute',
      'productAttribute', 'attribute', 'attributeValue', 'brand',
      'payment', 'shipping', 'address', 'review', 'wishlist',
      'cart', 'cartItem', 'notification', 'feedback', 'apiKey',
      'webhook', 'webhookLog', 'coupon', 'usedCoupon', 'couponUser',
      'pointTransaction', 'reportMetadata', 'statusTracking',
      'ticket', 'ticketReply'
    ];
    
    for (const modelName of models) {
      this.modelProxies[modelName] = this.createModelProxy(modelName);
    }
  }
  
  private createModelProxy(tableName: string) {
    // Create a model proxy object with methods compatible with Prisma client
    return {
      findMany: (args: any = {}) => {
        return this.adapter.findMany(tableName, {
          where: args.where,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined,
          orderBy: args.orderBy,
          limit: args.take,
          offset: args.skip
        });
      },
      
      findUnique: (args: any) => {
        return this.adapter.findUnique(tableName, {
          where: args.where,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined
        });
      },
      
      findFirst: (args: any) => {
        return this.adapter.findMany(tableName, {
          where: args.where,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined,
          orderBy: args.orderBy,
          limit: 1
        }).then(results => results[0] || null);
      },
      
      create: (args: any) => {
        return this.adapter.create(tableName, {
          data: args.data,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined
        });
      },
      
      update: (args: any) => {
        return this.adapter.update(tableName, {
          where: args.where,
          data: args.data,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined
        });
      },
      
      delete: (args: any) => {
        return this.adapter.delete(tableName, {
          where: args.where,
          select: args.select ? Object.keys(args.select).filter(k => args.select[k]) : undefined
        });
      },
      
      deleteMany: (args: any = {}) => {
        return this.adapter.transaction(async (client) => {
          // For deleteMany, we need to first get all records that match the criteria
          const records = await this.adapter.findMany(tableName, {
            where: args.where,
            select: ['id'] // Assuming all tables have an id
          });
          
          if (records.length === 0) {
            return { count: 0 };
          }
          
          // Then delete each one
          const deletePromises = records.map(record => 
            this.adapter.delete(tableName, { where: { id: record.id } })
          );
          
          await Promise.all(deletePromises);
          return { count: records.length };
        });
      },
      
      count: (args: any = {}) => {
        return this.adapter.count(tableName, {
          where: args.where
        });
      }
    };
  }
  
  // Provide access to model proxies
  get user() { return this.modelProxies.users; }
  get product() { return this.modelProxies.product; }
  get category() { return this.modelProxies.category; }
  get order() { return this.modelProxies.order; }
  get orderItem() { return this.modelProxies.orderItem; }
  get seller() { return this.modelProxies.seller; }
  get productImage() { return this.modelProxies.productImage; }
  get productVariant() { return this.modelProxies.productVariant; }
  get productVariantAttribute() { return this.modelProxies.productVariantAttribute; }
  get productAttribute() { return this.modelProxies.productAttribute; }
  get attribute() { return this.modelProxies.attribute; }
  get attributeValue() { return this.modelProxies.attributeValue; }
  get brand() { return this.modelProxies.brand; }
  get payment() { return this.modelProxies.payment; }
  get shipping() { return this.modelProxies.shipping; }
  get address() { return this.modelProxies.address; }
  get review() { return this.modelProxies.review; }
  get wishlist() { return this.modelProxies.wishlist; }
  get cart() { return this.modelProxies.cart; }
  get cartItem() { return this.modelProxies.cartItem; }
  get notification() { return this.modelProxies.notification; }
  get feedback() { return this.modelProxies.feedback; }
  get apiKey() { return this.modelProxies.apiKey; }
  get webhook() { return this.modelProxies.webhook; }
  get webhookLog() { return this.modelProxies.webhookLog; }
  get coupon() { return this.modelProxies.coupon; }
  get usedCoupon() { return this.modelProxies.usedCoupon; }
  get couponUser() { return this.modelProxies.couponUser; }
  get pointTransaction() { return this.modelProxies.pointTransaction; }
  get reportMetadata() { return this.modelProxies.reportMetadata; }
  get statusTracking() { return this.modelProxies.statusTracking; }
  get ticket() { return this.modelProxies.ticket; }
  get ticketReply() { return this.modelProxies.ticketReply; }
  
  // Raw query execution with support for both string queries and template literals
  async $queryRaw(...args: any[]): Promise<any> {
    // Check if first argument is a string or TemplateStringsArray
    const firstArg = args[0];
    
    // If it's a string, treat as regular query
    if (typeof firstArg === 'string') {
      const [sql, ...params] = args;
      return this.adapter.query(sql, params);
    }
    
    // If it's TemplateStringsArray, handle as tagged template
    if (firstArg && typeof firstArg.raw === 'object' && Array.isArray(firstArg.raw)) {
      const strings = Array.from(firstArg);
      const values = args.slice(1);
      
      // If there are no parameters, just return the raw SQL
      if (values.length === 0) {
        return this.adapter.query(strings.join(''), []);
      }
      
      // Otherwise join with placeholders and use parameters
      const rawSql = strings.join('?');
      return this.adapter.query(rawSql, values);
    }
    
    // Fallback for other cases
    throw new Error('Invalid arguments for $queryRaw');
  }
  
  // Transaction support
  async $transaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
    return this.adapter.transaction(callback);
  }
  
  // Required for PrismaHealthIndicator
  async $connect(): Promise<void> {
    return this.adapter.connect();
  }
  
  // Required for PrismaHealthIndicator
  async $disconnect(): Promise<void> {
    return this.adapter.disconnect();
  }
  
  // Required for PrismaHealthIndicator
  async isConnected(): Promise<boolean> {
    try {
      await this.adapter.query('SELECT 1', []);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Get model by name (for dynamic access)
  getModel(name: string) {
    return this.modelProxies[name] || null;
  }

  async onModuleInit() {
    try {
      this.logger.log('Attempting to connect to the database...');
      await this.adapter.connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error.message}`);
      // Don't rethrow the error to prevent app crash
      this.logger.warn('Application will continue without database connection');
    }
  }

  async onModuleDestroy() {
    try {
      await this.adapter.disconnect();
    } catch (error) {
      this.logger.error(`Error disconnecting from database: ${error.message}`);
    }
  }

  async cleanDatabase() {
    // Check environment variable safely
    const nodeEnv = process.env?.NODE_ENV || 'development';
    if (nodeEnv === 'production') {
      throw new Error('Database cleaning is not allowed in production');
    }

    const models = [
      'bank',
      'flash', 
      'notification',
      'orderSeller',
      'paymentTransaction',
      'pointTransaction',
      'refund',
      'refundable',
      'seller',
      'shippingMethod',
      'shippingZone',
      'tag',
      'ticketDepartment'
    ];

    return Promise.all(
      models.map(modelName => {
        try {
          const model = this.getModel(modelName);
          if (model) {
            return model.deleteMany();
          } else {
            this.logger.warn(`Model ${modelName} not found`);
            return Promise.resolve({ count: 0 });
          }
        } catch (error) {
          this.logger.error(`Error deleting from model ${modelName}: ${error.message}`);
          return Promise.resolve({ count: 0 });
        }
      })
    );
  }

  async softDelete(modelName: string, where: any) {
    const model = this.getModel(modelName);
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    
    return model.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(modelName: string, where: any) {
    const model = this.getModel(modelName);
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    
    return model.update({
      where,
      data: {
        deletedAt: null,
      },
    });
  }
}