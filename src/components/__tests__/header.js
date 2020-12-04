import React from "react"
import renderer from "react-test-renderer"
import {FetchHeader as Header} from "../header"
import { queriedHeader } from '../reference_data/pageQuery'


describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header 
          location={{pathname:'mock-path'}} 
          title={'mock-title'}
          data={queriedHeader}
        />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})