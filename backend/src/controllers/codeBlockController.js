import { CodeBlock } from '../models/CodeBlock.js';



export const getAllCodeBlocks = async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find({}, 'title mentorPresent studentCount');
        res.json(codeBlocks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCodeBlockById = async (req, res) => {
    try {
        const codeBlock = await CodeBlock.findById(req.params.id);

        if (!codeBlock) {
            return res.status(404).json({ message: 'Code block not found' });
        }
        res.json(codeBlock);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCodeBlock = async (req, res) => {
    try {
        const { currentCode } = req.body;
        const codeBlock = await CodeBlock.findByIdAndUpdate(
            req.params.id,
            { currentCode },
            { new: true }
        );

        if (!codeBlock) {
            return res.status(404).json({ message: 'Code block not found' });
        }
        res.json(codeBlock);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};