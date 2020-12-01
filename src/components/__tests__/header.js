import React from "react"
import renderer from "react-test-renderer"
import {FetchHeader as Header} from "../header"

describe("Header", () => {
  it("renders correctly", () => {
    const mockData = {
      background: {
        childImageSharp: {
          fluid: 'mockImagePath.src'
        }
      }
    }

    const tree = renderer
      .create(<Header 
          location={{pathname:'mock-path'}} 
          title={'mock-title'}
          data={mockData}
        />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})