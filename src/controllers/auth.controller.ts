import catchAsync from "../utils/catchAsync";
import {AccountDto} from "../model/account.dto";
import {ApiResponse} from "../model/apiResponse";
import { AuthService } from "../services/auth.service";


export class AuthController {

    private readonly authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }

    register = catchAsync(async (req, res)=>{
        const account = req.body as AccountDto;

        const result = await this.authService.register(account) as ApiResponse;
    
        res.status(result.statusCode).json(result);
    });

}