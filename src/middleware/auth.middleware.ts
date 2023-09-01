import {Injectable, NestMiddleware} from "@nestjs/common";
import * as firebase from "firebase-admin";
import {Request, Response} from "express";
import {FirebaseApp} from "./firebase-app";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	private auth: firebase.auth.Auth;

	constructor(private firebaseApp: FirebaseApp) {
		this.auth = firebaseApp.getAuth();
	}

	use(req: Request, res: Response, next: () => void) {
		const token = req.headers.authorization;
		if (token) {
			this.auth
				.verifyIdToken(token.replace("Bearer ", ""))
				.then(async decodedToken => {
					req["user"] = decodedToken;
					console.log("token", token);
					next();
				})
				.catch(error => {
					console.log("error", error);
					if (error instanceof Error) {
						AuthMiddleware.accessDenied(req.url, res, error);
					}
				});
		} else {
			req["user"] = {
				uid: "4bNzbQ5A5ugbgn9yV1YQSX23zNg2",
				email: "test@gmail.com",
			};
			next();
			// AuthMiddleware.accessDenied(req.url, res, new Error("No token provided"));
		}
	}

	private static accessDenied(url: string, res: Response, error?: Error) {
		res.status(403).json({
			statusCode: 403,
			timestamp: new Date().toISOString(),
			path: url,
			name: "acces denied",
			message: error.message,
			stack: error.stack,
			error: error.name,
		});
	}
}
