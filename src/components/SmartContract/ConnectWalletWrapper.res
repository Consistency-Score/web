
module ConnectWallet = {
  @react.component @module("./ConnectWallet.jsx")
  external make: unit => React.element = "ConnectWallet"
}

@react.component
let make = () => {
  <div> <ConnectWallet /> </div>
}