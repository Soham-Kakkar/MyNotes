import { handleApiError } from '../utils/general.utils'

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export interface NoteData {
    username?: string;
    userId?: string;
    title: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export class NotesAPI {
    static async createNote(data: NoteData): Promise<void> {
      const response = await fetch(`${API_URL}/notes/create-note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      await handleApiError(response);
      
    }
  
    static async getNotes(username: string): Promise<Array<NoteData>> {
      const response = await fetch(`${API_URL}/notes/get-notes?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      await handleApiError(response);
  
      return await response.json();
    }
  
    static async modifyNote(data: { id: string; title: string; content: string }): Promise<NoteData> {
      const response = await fetch(`${API_URL}/notes/modify-note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      await handleApiError(response);
  
      return await response.json();
    }
  
    static async deleteNote(id: string): Promise<void> {
      const response = await fetch(`${API_URL}/notes/delete-note`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      await handleApiError(response);
      
    }
}