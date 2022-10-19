import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class ConfigUtil {
  getAsset = async (assetFileName) => {
    console.debug('Getting asset:', assetFileName);
    const fetchUrl = `${process.env.ONE_CLICK_DEPLOY_BASE_URL}/get-asset-file`;
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      fileName: assetFileName,
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let config;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      config = await response.json();
      console.debug('CONFIG:', config);
    } catch (error) {
      console.error('Failed to get asset file');
    }
  
    return config;
  }

  updateConference = async (conferenceSid, announceUrl) => {
    console.debug('Updating Conference:', conferenceSid);
    const fetchUrl = `${process.env.ONE_CLICK_DEPLOY_BASE_URL}/update-conference`;
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      conferenceSid,
      announceUrl
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let conference;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      conference = await response.json();
      console.debug('Updated Conference:', conference);
    } catch (error) {
      console.error('Failed to update conference');
    }
    return conference;
  }

  getAnnouncement = async () =>{
    console.debug('Getting announcement:');
    const fetchUrl = `${process.env.ONE_CLICK_DEPLOY_BASE_URL}/get-announcement-twiml`;
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let config;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      //console.debug("Getting announcement response:", response)
      //config = await response.json();
      console.debug('CONFIG:', config);
    } catch (error) {
      console.error('Failed to get asset file');
    }
  
    return config;
  }
}

const configUtil = new ConfigUtil();

export default configUtil;