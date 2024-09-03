// Listen for the extension icon being clicked
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked!");
    // Open the extension's main page or popup
    chrome.tabs.create({ url: 'index.html' });
});

// Respond to messages from content scripts or the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_data') {
        // Retrieve data from storage
        chrome.storage.sync.get(['key'], (result) => {
            if (result.key) {
                console.log('Data retrieved:', result.key);
                sendResponse({ data: result.key });
            } else {
                console.log('No data found for the key.');
                sendResponse({ data: null });
            }
        });
    }
    // Ensure you return true to keep the message channel open for the asynchronous response
    return true;
});

// Example of using alarms (requires the 'alarms' permission)
chrome.alarms.create('myAlarm', { delayInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'myAlarm') {
        console.log('Alarm triggered!');
    }
});

// Example of saving data to storage (usually done in your content script or popup)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'save_data') {
        chrome.storage.sync.set({ key: request.data }, () => {
            console.log('Data saved:', request.data);
            sendResponse({ success: true });
        });
        return true;
    }
});

chrome.storage.sync.get('userInfo', function(data) {
    console.log('Retrieved data:', data.userInfo);
});
