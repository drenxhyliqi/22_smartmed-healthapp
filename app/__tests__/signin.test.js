import React from 'react';
import { render } from '@testing-library/react-native';
import Signin from '../signin';
import { UserContext } from '../../context/userContext';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
}));

jest.mock('expo-router', () => ({
    Link: 'Link',
    useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaView: ({ children }) => children,
}));

jest.mock('../../firebase', () => ({
    auth: {},
    db: {},
}));

describe('Signin Snapshot', () => {
    it('renders correctly', () => {

        const mockContext = {
            setUserId: jest.fn(),
            setUserData: jest.fn(),
        };

        const tree = render(
            <UserContext.Provider value={mockContext}>
                <Signin />
            </UserContext.Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});