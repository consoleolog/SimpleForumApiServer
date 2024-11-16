import { connectDB } from "../config/database";
import { AuthService } from "./auth.service";

// export * as authService from "./auth.service";
export const authService = new AuthService(connectDB);