import './Services.css';
import bracesIcon from '../Assets/braces.png';
import implantIcon from '../Assets/implants.png';
import teethIcon from '../Assets/teeth-removal.png';
import bridgesCrownsIcon from '../Assets/crowns&bridges2.png';
import checkUpIcon from '../Assets/tooth-checkup.png';
import whiteningIcon from '../Assets/whitening-teeth.png';
import rootCanalIcon from '../Assets/root-canal.png';
import cleaningIcon from '../Assets/cleaning-teeth.png';
export const Services = () => {
    return (

        <><div className='services-container'>
            <h3>SERVICES</h3>

        </div>
        <div className='squares-container'>
        <div className="square1">
          <img src={bracesIcon} alt="Braces Icon" className="braces-icon" />
          <p>BRACES</p>
        </div>
        
        <div className="square2">
          <img src={implantIcon} alt="Implant Icon" className="implant-icon" />
          <p>IMLANTS</p>
        </div>
        
        <div className="square3">
          <img src={teethIcon} alt="Teeth Icon" className="teeth-icon" />
          <p>TEETH REMOVAL</p>
        </div>
        <div className="square4">
          <img src={bridgesCrownsIcon} alt="Bridges-Crowns-Icon" className="bridges-crowns-icon" />
          <p>CROWNS & BRIDGES</p>
        </div>
        <div className="square5">
          <img src={checkUpIcon} alt="CheckUp-Icon" className="chechup-icon" />
          <p>TOOTH CHECKUP</p>
        </div>
        <div className="square6">
          <img src={whiteningIcon} alt="Whitening-Teeth-Icon" className="whitening-teeth-icon" />
          <p>WHITENING TEETH</p>
        </div>
        <div className="square7">
          <img src={rootCanalIcon} alt="Root-Canal-Icon" className="root-canal-icon" />
          <p>ROOT CANAL </p>
        </div>
        <div className="square8">
          <img src={cleaningIcon} alt="Cleaning-Teeth-Icon" className="cleaning-teeth-icon" />
          <p>CLEANING TEETH </p>
        </div>
      </div>
    </>
  );
}