import React from "react"
import renderer from "react-test-renderer"
import LangSwitch from "../langSwitch"

describe("Language Switch", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<LangSwitch />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})