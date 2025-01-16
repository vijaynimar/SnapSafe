import {Router} from "express"
import {signup,login,getuser} from "../controller/user.js"
import { upload,profilePhoto } from "../controllerProfile/profile.js"
const userRouter=Router()



userRouter.post("/signup",signup)
userRouter.post("/login",login)

userRouter.get("/",getuser)
userRouter.post("/profilePhoto",upload.single("profile"),profilePhoto)
export {userRouter}