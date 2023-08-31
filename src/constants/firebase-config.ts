import {ConfigService} from "@nestjs/config";

const configService = new ConfigService();

const firebaseConfig = {
	clientEmail: configService.get("FIREBASE_CLIENT_EMAIL"),
	projectId: configService.get("FIREBASE_PROJECT_ID"),
	privateKey: configService.get("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
	//databaseUrl: "",
};

export default firebaseConfig;
