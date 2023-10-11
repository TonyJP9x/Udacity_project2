import NavBar from "./NavBar";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./Store";
import { MemoryRouter } from "react-router-dom";

describe('navigation bar',() => {

    it("will have all expected field", () => {
        var component = render(
          <MemoryRouter>
            <Provider store={store}>
              <NavBar />
            </Provider>
          </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
      });

  
})