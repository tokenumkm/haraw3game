import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

const transport = new AnchorLinkBrowserTransport()
const link = new AnchorLink({
  transport,
  chains: [{
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    nodeUrl: 'https://wax.greymass.com'
  }]
})

const anchorBtn = document.getElementById('anchorLogin')
const wcwBtn = document.getElementById('wcwLogin')
const output = document.getElementById('output')

anchorBtn.addEventListener('click', async () => {
  try {
    const identity = await link.login('web3game')
    const session = identity.session
    const account = session.auth.actor.toString()
    output.innerText = `✅ Anchor login berhasil: ${account}`
    sessionStorage.setItem('waxAccount', account)
  } catch (err) {
    console.error(err)
    output.innerText = '❌ Gagal login Anchor'
  }
})

wcwBtn.addEventListener('click', () => {
  const popup = window.open("popup-login.html", "waxLoginPopup", "width=500,height=700")
})

// Terima akun dari WCW login popup
window.addEventListener("message", function (event) {
  if (event.origin !== window.location.origin) return
  if (event.data?.type === "wax-login") {
    output.innerText = `✅ WCW login berhasil: ${event.data.account}`
    sessionStorage.setItem('waxAccount', event.data.account)
  } else if (event.data?.type === "wax-fail") {
    output.innerText = "❌ Login WCW dibatalkan atau gagal."
  }
})
