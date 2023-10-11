import PollCreationPage from "./PollCreationPage";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "./Store";
import * as React from "react";
import { waitFor } from "@testing-library/react";


describe("PollCreationPage", () => {
    it('will have all expected field', () => {
        var component = render(
            <MemoryRouter>
              <Provider store={store}>
                <PollCreationPage />
              </Provider>
            </MemoryRouter>
          );
          expect(component).toMatchSnapshot();
    })
  
});
