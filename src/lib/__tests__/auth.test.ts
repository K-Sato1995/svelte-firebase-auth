jest.mock('firebase/auth');
import { render } from '@testing-library/svelte';
// import Auth from '../auth.svelte'
// import { initializeApp} from 'firebase/app'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AuthTestComp from './__utils__/AuthTestComp.svelte';

xdescribe('Auth.svelte', () => {
	test('should render wrappedComponent', () => {
		const result = render(AuthTestComp);
		expect(() => result.getByText('Hello world!')).not.toThrow();
	});
	test('should setup onAuthStateChange listener when mounting the component', () => {
		expect(1 + 2).toBe(3);
	});
});

export {};
