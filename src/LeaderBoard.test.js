import LeaderBoard from "./LeaderBoard";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "./Store";
import { MemoryRouter } from "react-router-dom";
import GlobalStateSlice from "./Slices/GlobalStateSlice";

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

      it('should arrange users based on the sum of answers and questions', () => {
        const { container } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LeaderBoard />
            </MemoryRouter>
          </Provider>
        );
    
        const getUserRows = () => container.querySelectorAll('tbody tr');
        const userSum = (user) =>
          Object.keys(user.answers).length + user.questions.length;
        const userRows = Array.from(getUserRows());
        for (let i = 0; i < userRows.length - 1; i++) {
          const currentUser = globalState.value[userRows[i]];
          const nextUser = globalState.value[userRows[i + 1]];
          expect(userSum(currentUser)).toBeGreaterThanOrEqual(userSum(nextUser));
        }
      });
})