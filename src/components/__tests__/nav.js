import React from "react"
import renderer from "react-test-renderer"
import { FetchNav as Nav } from "../nav"
import { queriedMenu } from '../reference_data/pageQuery'

describe("Nav", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Nav 
          data={queriedMenu}
        />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})