import { Router } from 'express';
import { createNote, getNotes, modifyNote, deleteNote  } from '../controllers/notesController';

const router = Router();

router.post('/create-note', createNote);
router.get('/get-notes', getNotes);
router.post('/modify-note', modifyNote);
router.delete('/delete-note', deleteNote);

export default router;