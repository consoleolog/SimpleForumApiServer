import catchAsync from "../utils/catchAsync";
import {AccountDto} from "../model/account.dto";
import { authService } from "../services/";
import {ApiResponse} from "../model/apiResponse";


export const register = catchAsync(async (req, res) => {
    const account = req.body as AccountDto;

    const result = await authService.register(account) as ApiResponse;

    res.status(result.statusCode).json(result);
})