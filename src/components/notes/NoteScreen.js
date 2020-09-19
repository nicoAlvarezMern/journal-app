import React, { useEffect, useRef } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';


export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );
    const dispatch = useDispatch();
    const [ formValues, handleInputChange, reset] = useForm( note );
    const {body,title, id} = formValues;
    const activeId = useRef(note.id);
    useEffect(() => {
        if( note.id !== activeId.current ){
            reset(note);
            activeId.current = note.id;
        }
    }, [note,reset]);
    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}));
    }, [formValues,dispatch]);

    const handleDelete = ()=>{
        dispatch( startDelete(id));
    }
    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="some awesome title"
                    className="notes__tittle-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                    name="title"
                />
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    name="body"
                ></textarea>
                {
                    (note.url) &&
                    <div className="notes__image">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                    </div>
                }
            </div>
            <button className="btn btn-danger"
                    onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
