import { assertEquals } from 'https://deno.land/std@0.51.0/testing/asserts.ts';
import { Search } from './search.ts'

const { test } = Deno

const s = new Search()
await s.init()

test({
  name: "ensure objejct is valid",
  async fn(): Promise<void> {
    const queryString = "fox"
    const result = s.query(queryString)

    assertEquals(result.length, 1)
    assertEquals(result[0], {
      name: "fox",
      repo: "fox",
      type: "github",
      owner: "eankeen",
      desc: "A cute little utility to help you bootstrap and sample Deno libraries"
    })
  }
})
