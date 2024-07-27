// Function to navigate to a specific Instagram account
const navigateToAccount = (link) => {
    window.location.href = link;
};

// Function to get the first 3 followers
const getFirst3Followers = async () => {
    let followers = [];

    // Placeholder logic: Simulate waiting for followers to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example selector for followers list
    const followersList = document.querySelectorAll('body > div.x1n2onr6.xzkaem6 > div:nth-child(2) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.xyi19xy.x1ccrb07.xtf3nb5.x1pc53ja.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6 > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1iyjqo2.xs83m0k.xeuugli.x1qughib.x6s0dn4.x1a02dak.x1q0g3np.xdl72j9 > div > div > div > div > div > a > div > div');

    // Select all elements with the class name 'example-class'
    const elements = document.querySelectorAll('body > div.x1n2onr6.xzkaem6 > div:nth-child(2) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.xyi19xy.x1ccrb07.xtf3nb5.x1pc53ja.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6 > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1iyjqo2.xs83m0k.xeuugli.x1qughib.x6s0dn4.x1a02dak.x1q0g3np.xdl72j9 > div > div > div > div > div > a > div > div');

// Iterate over the selected elements
    for (let element of elements) {
        console.log(element); // Do something with each element
    }


    followersList.forEach((follower, index) => {
        if (index < 1) { // Limit to first 3 followers
            followers.push({
                username: follower.querySelector('span').innerText
            });
        }
    });
    console.log(followers)

    return followers;
};

// Function to get the last 3 messages from a follower
const getLast3Messages = async () => {
    let messages = [];

    // Placeholder logic: Simulate waiting for messages to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example selector for message elements
    const messageElements = document.querySelectorAll('#mount_0_0_zv > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x1v4esvl > section > div > div > div > div.xjp7ctv > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k > div > div > div > div > div > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xmz0i5r.x6ikm8r.x10wlt62.x1n2onr6 > div > div > div > div > div > div > div:nth-child(3) > div');

    // Scrape the last 3 messages
    for (let i = 0; i < Math.min(1, messageElements.length); i++) {
        messages.push({
            message: messageElements[i].innerText,
        });
    }

    return messages;
};

// Function to scrape followers and their last 3 messages
const scrapeFollowersAndMessages = async () => {
    let followers = await getFirst3Followers();
    let result = [];

    for (let follower of followers) {
        let messages = await getLast3Messages(follower);
        result.push({
            follower: follower.username,
            messages: messages
        });
    }

    // Save the result in JSON format and initiate download
    saveAsJson(result);
};

// Function to save data as JSON and initiate download
const saveAsJson = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "followers_messages.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// Listen for the start scraping message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startScraping") {
        navigateToAccount(request.link); // Navigate to the specified Instagram account
        scrapeFollowersAndMessages().then(() => sendResponse({status: "done"}));
        return true; // Indicate async response handling
    }
});
