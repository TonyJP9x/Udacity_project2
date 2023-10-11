import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "./Store";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";


const mockSuccessfullogin = {
  id: 'sarahedo',
  password:'password123'
}

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
  it("will  display a success message if input correct username or passowrd",  async () => {
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(component.queryByTestId("username"), { target: { value: mockSuccessfullogin.id } });
    fireEvent.change(component.queryByTestId("password"), { target: { value: mockSuccessfullogin.password } });
    fireEvent.click(component.queryByTestId("button"));
    await waitFor(() => {
      expect(component.queryByTestId("message")).toBeInTheDocument()
    })

  });
});
