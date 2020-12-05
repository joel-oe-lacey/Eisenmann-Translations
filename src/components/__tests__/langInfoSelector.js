import React from "react"
import renderer from "react-test-renderer"
import { FetchInfoSelector as LangInfoSelector } from "../langInfoSelector"
import { queriedLang } from '../reference_data/pageQuery'


describe("LangInfoSelector", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<LangInfoSelector 
          data={queriedLang}
        />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})