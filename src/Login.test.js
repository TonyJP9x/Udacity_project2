import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "./Store";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";




describe("Login", () => {
  it("will have all expected field", () => {
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
  it('will show message if all mandatory field has been filled', async () => {
    var component = render(
        <MemoryRouter>
          <Provider store={store}>
            <Login />
          </Provider>
        </MemoryRouter>
      );
    var option1 = component.getByTestId('username')
    fireEvent.change(option1, {target: {value:'sarahedo'}})
    var option2 = component.getByTestId('password')
    fireEvent.change(option2, {target: {value:'password123'}})
    var button = component.getByTestId('button')
    fireEvent.click(button)
    await waitFor(() => {
        expect(component.getByTestId('message')).toBeInTheDocument();
    })


})
});
