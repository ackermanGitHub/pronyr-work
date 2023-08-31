import {Module, MiddlewareConsumer, NestModule} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UsersModule} from "./users/users.module";
import {DataSourceConfig} from "./config/data.source";
import {ProductsModule} from "./products/products.module";
import {AuthMiddleware} from "src/middleware/auth.middleware";
import {FirebaseApp} from "./middleware/firebase-app";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({...DataSourceConfig}),
		UsersModule,
		ProductsModule,
	],
	providers: [FirebaseApp],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes("*");
	}
}
