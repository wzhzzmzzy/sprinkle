import init, {greet as greetWasm} from 'excel-wasm'

let initWasm = false

export const greet = async (name: string) => {
  if (!initWasm) {
    await init()
    initWasm = true
  }
  return greetWasm(name)
}
