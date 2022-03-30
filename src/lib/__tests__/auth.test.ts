import { render } from '@testing-library/svelte'
import Auth from '../auth.svelte'

test('1 + 2 = 3', () => {
  expect(1 + 2).toBe(3);
})


test("should render", () => {
  const result = render(Auth);

  console.log(result)
  expect(() => result.getByText("Hello world!")).not.toThrow();
});


export {}