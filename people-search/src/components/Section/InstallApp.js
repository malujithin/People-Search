import React, {useState, useEffect, Fragment} from "react"

// import "./PWA.scss";

/**
 * PWA Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const InstallApp = () => {

  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installPromotion, setInstallPromotion] = useState(false)
  const [test, setTest] = useState("")

  useEffect(()=>{
      // Notification.requestPermission()
      

      window.addEventListener('beforeinstallprompt', function(event) {
        event.preventDefault();
        setDeferredPrompt(event)
        setInstallPromotion(true)
      });
      
      window.addEventListener('appinstalled', (evt) => {
        setTest('You application Succesfull Instaled!')
      });
  }, [])

  const installApp = () => {
    setInstallPromotion(false)
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
      } else {
      }
      setDeferredPrompt(null)
    });
  }

  const closeInstallPromotion = () => {
    setInstallPromotion(false)
  }

  return (
    <Fragment>
      {installPromotion &&
        <div className="show-install-promotion">
          <div className="install-promotion-content">
              Do you want to install this app?</div>
          <div className="install-promotion-buttons">
            <button onClick={installApp}> Install </button>
            <i onClick={closeInstallPromotion} role="presentation" className="fas fa-times"></i>
          </div>
        </div> 
      }
    </Fragment>
  )
}

export default InstallApp