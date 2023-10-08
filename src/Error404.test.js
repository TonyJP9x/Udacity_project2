import { render } from "@testing-library/react";
import * as React from 'react';
import Error404 from "./Error404";

describe('Error404',() => {
    it('will match snapshot', () => {
        var component = render(<Error404/>);
        expect(component).toMatchSnapshot();
    })
})