import express from 'express';
import { getAllCodeBlocks, getCodeBlockById, updateCodeBlock } from '../controllers/codeBlockController.js';



const router = express.Router();

router.get('/', getAllCodeBlocks);

router.get('/:id', getCodeBlockById);

router.put('/:id', updateCodeBlock);


export default router;