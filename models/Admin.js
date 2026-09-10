const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    email : {type : String,required : true,unique : true,trim : true, lowercase : true },
    username : {type : String,required : true,unique : true,trim : true, lowercase : true },
    password : {type : String,required : true, select : false},    
},
{
    timestamps : true
});

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    
});

adminSchema.methods.comparePassword  = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('Admin', adminSchema)