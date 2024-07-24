import { ErrorHandler } from '@utils/ErrorTypeHandler';
import { emailRegex, simpleRegex } from '@utils/RegexRequired';
import { useState } from 'react';
import type { FormulariosInterface } from '@customTypes/FormulariosInterface';
import type { FC, FormEvent } from 'react';
import SpinnerStyle from '@customStyles/reactStyles/Spinner.module.css';

export const LoginFormulario: FC<FormulariosInterface> = ({ title }) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [formError, setFormError] = useState<string>('');
    const [entrySite, setEntrySite] = useState<boolean>(false);
    const validateUsername = (username: string) => {
        return emailRegex.test(username);
    };

    const validatePassword = (password: string) => {
        return simpleRegex.test(password);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setDisabled(true);
            setIsLoading(true);
            let validToSend = true;
            setUsernameError('');
            setPasswordError('');
            setFormError('');

            if (!validateUsername(username)) {
                setUsernameError('No paso la validación de usuario');
                validToSend = false;
            }

            if (!validatePassword(password)) {
                setPasswordError('No paso la validación de password.');
                validToSend = true;
            }
            console.log(password, username, validToSend);

            if (validToSend) {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username, password }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('cosaSSdSD', response);
                const { AccessToken, IdToken, RefreshToken } =
                    await response.json();

                console.log(AccessToken, IdToken, RefreshToken);
                if (AccessToken && RefreshToken) {
                    localStorage.setItem('user1', AccessToken);
                    localStorage.setItem('user2', RefreshToken);
                }
            }
        } catch (err) {
            const newError = ErrorHandler(err);
            setFormError(newError.message);
        } finally {
            setDisabled(false);

            setIsLoading(false);
            if (
                localStorage.getItem('user1') &&
                localStorage.getItem('user2')
            ) {
                setEntrySite(true);
            } else {
                setEntrySite(false);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <div className={SpinnerStyle.spinnerOverlay}>
                    <div className={SpinnerStyle.spinner}></div>
                </div>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                disabled={disabled}
                            />
                            {usernameError && <p>{usernameError}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={disabled}
                                required
                            />
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                        <button type="submit" disabled={disabled}>
                            Login
                        </button>
                        {formError && <p>{formError}</p>}
                    </form>
                    {entrySite && (
                        <a className="link-card-grid" href="/cosas">
                            {'Bienvenido al sitio Click para entrar'}
                        </a>
                    )}
                </div>
            )}
        </>
    );
};
