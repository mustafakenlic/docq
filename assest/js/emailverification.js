const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  
 // main funtion
const mainFunction = () => {

    // get verify parameter from url
    const verificationCode = getParameterByName("verify");
  
    // if verify is null then don do rest of the page
    if (verificationCode === null) {
      alert("Expired verification page");
      return;
    }
  
    // if verify is not null continue from here
    console.log("Verify Code:", verificationCode);
  };
  
  // call the main func.
  mainFunction();