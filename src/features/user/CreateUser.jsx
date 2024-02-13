import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createName } from './userSlice';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router';

function CreateUser() {
    const dispatch = useDispatch();
    // const userState = useSelector((state) => state.user)
    // console.log(userState)
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username) return;
        dispatch(createName(username));
    }

    function handleStartOrder(e) {
        handleSubmit(e);
        navigate('/menu');
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <p className="mb-4 text-sm text-stone-600 md:text-base">
                👋 Welcome! Please start by telling us your name:
            </p>

            <input
                type="text"
                placeholder="Your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mb-8 w-72"
            />

            {username !== '' && (
                <div>
                    <Button type="primary" onClick={(e) => handleStartOrder(e)}>
                        Start ordering
                    </Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;
