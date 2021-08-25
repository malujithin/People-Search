import axios from 'axios';

/**
 * call API for get Slider
 * @constant
 * @type {function}
 * @param {string} keyword
 * @returns {promises}
 */
const urlAPIImageUpdate = process.env.IMAGE_UPDATE;
const urlSubmit = process.env.API_URL;
export const getSearchResults = ({ payload = {} }) => {
    const {
        firstName,
        secondFirstName,
        lastName,
        secondLastName,
        middleName,
        prefFirstName,
        GPID,
        emailAddress,
        prefLastName,
        workPhone,
        deskPhone,
        sector,
        jobTitle,
        region,
        territory,
        userFunction,
        subFunction,
        workAddress,
        fax,
        city,
        managerID,
        country,
        businessUnit,
        marketingUnit,
        division,
        timeZone
    } = payload;
    const header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
    let params = '';
    firstName && (params += `firstname:${firstName},`);
    secondFirstName && (params += `secondaryfname:${secondFirstName},`);
    lastName && (params += `lastname:${lastName},`);
    secondLastName && (params += `secondarylname:${secondLastName},`);
    middleName && (params += `middlename:${middleName},`);
    prefFirstName && (params += `preferredname:${prefFirstName},`);
    GPID && (params += `gpid:${GPID},`);
    emailAddress && (params += `mail:${emailAddress},`);
    prefLastName && (params += `preferredlname:${prefLastName},`);
    workPhone && (params += `workphone:${workPhone},`);
    deskPhone && (params += `deskphone:${deskPhone},`);
    sector && (params += `sector:${sector},`);
    jobTitle && (params += `jobtitle:${jobTitle},`);
    region && (params += `region:${region},`);
    territory && (params += `territory:${territory},`);
    userFunction && (params += `function:${userFunction},`);
    subFunction && (params += `subfunction:${subFunction},`);
    workAddress && (params += `workaddress:${workAddress},`);
    fax && (params += `fax:${fax},`);
    city && (params += `city:${city},`);
    managerID && (params += `managerid:${managerID},`);
    country && (params += `country:${country},`);
    businessUnit && (params += `businessunit:${businessUnit},`);
    marketingUnit && (params += `marketingunit:${marketingUnit},`);
    division && (params += `division:${division},`);
    timeZone && (params += `timezone:${timeZone},`);

    return axios.get(urlSubmit + params.slice(0, -1),header);
};

export const getIndividualDetail = gpid => {
    const individualDetailUrl = process.env.API_URL;
    let gpidFromClick = '';
    gpid && (gpidFromClick += `gpid:${gpid.payload}`);

    return axios.get(`${individualDetailUrl}${gpidFromClick}`);
};
export const getManagerDetails = managerId => {
    const managerDetailUrl = process.env.API_URL;

    return axios.get(`${managerDetailUrl}gpid:${managerId.payload}`);
};
export const getDirectReporteeCount = gpid => {
    const reporteeCountUrl = process.env.API_URL;
    return axios.get(`${reporteeCountUrl}countforreportees:${gpid.payload}`);
};

export const getDirectReportee = gpid => {
    const allReporteeUrl = process.env.API_URL;
    return axios.get(`${allReporteeUrl}managerid:${gpid}`);
};

export const getLevelReportee = (gpid, levelReports) => {
    const allLevelReportee = process.env.API_ORG_URL;
    return axios.get(`${allLevelReportee}${gpid}?level=${levelReports}`);
};

export const getUpLevelReportee = gpid => {
    const allLevelReportee = process.env.API_ORG_URL;
    return axios.get(`${allLevelReportee}${gpid.payload.gpid}`);
};

export const getChainOfCommand = gpid => {
    const allChainOfCommand = process.env.API_ORG_URL;
    return axios.get(`${allChainOfCommand}${gpid.payload}`);
};

export const getLoggedInUser = () => {
    const user = process.env.API_USER
    // const user = '/me';

    return axios.post(`${user}`);
};


export const getUserPhoto = gpid => {
    const userPhoto = process.env.API_PHOTO
    // const userPhoto = '/v1/photo/';

    return axios.get(`${userPhoto}${gpid.payload}`);
};


export const getLogoutUser = () => {
         const logooutURL = '/logout';

    return axios.post(`${logooutURL}`);
};

//profile image update


export const changeUserImage = (data) => {
    const config = {
        headers: {
          Accept: "*/* "        }
      };
      const urlUpdatePic = urlAPIImageUpdate + data.payload.gpid + "&photoext=jpg";
      return axios.post(urlUpdatePic, data.payload.base64imageString, config);;
};