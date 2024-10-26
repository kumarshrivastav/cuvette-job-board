import ErrorHandler from "../utils/ErrorHandle.js"

export function isAuthorized(req,res,next){
    try {
        console.log('session body from middleware..................')
        console.log(req.session)
        if(req.session.userId){
            next()
        }else{
            return next(ErrorHandler(403,'You have no authority to take this action'))
        }
    } catch (error) {
        next(error)
    }
}
