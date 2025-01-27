import mongoose from 'mongoose';



const codeBlockSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    initialCode: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    currentCode: {
        type: String,
        default: function() {
            return this.initialCode;
        }
    },
    mentorPresent: {
        type: Boolean,
        default: false
    },
    studentCount: {
        type: Number,
        default: 0,
        min: 0 // Ensure count never goes below 0
    },
    // Add lastActive field to track when the block was last used
    lastActive: {
        type: Date,
        default: Date.now
    }
});


// Pre-save middleware to update lastActive
codeBlockSchema.pre('save', function(next) {
    this.lastActive = new Date();
    next();
});


// Method to reset the block to initial state
codeBlockSchema.methods.reset = async function() {
    this.currentCode = this.initialCode;
    this.mentorPresent = false;
    this.studentCount = 0;
    return this.save();
};


export const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);