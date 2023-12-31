import LeaderBoard from "./LeaderBoard";
import { render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import { MemoryRouter } from "react-router-dom";

describe('leaderboard',() => {

    it("will have all expected field", () => {
        var component = render(
          <MemoryRouter>
            <Provider store={store}>
              <LeaderBoard />
            </Provider>
          </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
      });

  
})