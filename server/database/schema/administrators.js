import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema=mongoose.Schema
const Mixed=Schema.Types.Mixed
const SALT_WORK_FACTOR=10
const MAX_LOGIN_ATTEMPTS=5
const LOCK_TIME=2*60*60*1000
const administratorsSchema=new Schema({
    username:{
        require:true,
        unique:true,
        type:String
    },
    email:{
        require:true,
        unique:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    alipayUserId:{
        unique:true,
        type:String,
        default:''
    },
    loginAttempts:{
        require:true,
        type:Number,
        default:0
    },
    lockUntil:{
        require:true,
        type:Number,
        default:1
    }
}, { timestamps: { createdAt: 'created_at' ,updatedAt: 'updated_at' } })



administratorsSchema.virtual('isLocked').get(()=>{
    return this.lockUntil && this.lockUntil > Date.now()
})


administratorsSchema.pre('save',function(next){
    if(!this.isModified('password'))return next()
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)      
        bcrypt.hash(this.password,salt,(error,hash)=>{
            if(error) return next(error)
            console.log(this.password)
            this.password=hash
            console.log(this.password)
            next()
        })
    })
})
administratorsSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err)resolve(isMatch)
                else reject(err)
            })
        }) 
    },

    incLoginAttepts:(user)=>{
        return new Promise((resolve,reject)=>{
            if(this.lockUntil && this.lockUntil < Date.now())
            {
                this.update({
                    $set:{
                        loginAttempts:1,
                        lockUntil:1
                    }
                },err=>{
                    if(err) reject(err)
                    else resolve(true)
                })   
            }
            else
            {
               let updates={
                   $inc:{
                       loginAttempts:1
                   }
               }
               if(this.loginAttempts+1>= MAX_LOGIN_ATTEMPTS && !this.isLocked)
               {
                   updates.$set={
                       lockUntil:Date.now()+LOCK_TIME
                   }
               }
               this.update(updates,err=>{
                   if(err) reject(err)
                   else resolve(true)
               })
            }
        })      
    }
    
}

mongoose.model('Administrators',administratorsSchema)