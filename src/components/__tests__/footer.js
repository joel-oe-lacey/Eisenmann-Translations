import React from "react"
import renderer from "react-test-renderer"
import {FetchFooter as Footer} from "../footer"
import { queriedMenu } from '../reference_data/pageQuery'

describe("Footer", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Footer 
          data={queriedMenu}
        />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})