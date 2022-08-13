(function() {

    function findWords(platform){
        if (platform == 'twitter'){
            return document.querySelectorAll('[data-testid="tweetText"] > [class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]');
        }
        else if (platform == 'reddit'){
            return document.querySelectorAll('[data-click-id="text"] > [class="_1qeIAgB0cPwnLhDF9XSiJM"]');
        }
        else if (platform == 'facebook'){
            return document.querySelectorAll('[data-ad-preview="message"] > [class="kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q"]');
        }
        else if (platform == 'instagram'){
            return document.querySelectorAll('[class="_aat6"] > [class="_aacl _aaco _aacu _aacx _aad7 _aade"]');
        }
        else if (platform == 'youtube'){
            return document.querySelectorAll('[class="style-scope ytd-comment-renderer"] > [id="inline-thumbnail-renderer"]');
        }
        else {
            return document.getElementsByTagName('*'); // Simply return everything otherwise
        }
    }

    function checkWords(platform) {

      // Returns to JOSN format
      async function getapi(url){
        const response = await fetch(url);

        var data = await response.json();

        return data;
      }

      async function getapi2(url){
        const response = await fetch(url);

        var data = await response.json();

        return data;
      }

      var wordContent = findWords(platform);
      let debug = true; // Set to false in production environment

      [].slice.call(wordContent).forEach(async function(e){
        var result;
        //let site_url = 'http://ispothate.eastus.cloudapp.azure.com:8000'; // Use this site URL for production purposes
        let site_url = 'http://localhost:8000';
        let url_homophobia = site_url + '/ishomophobia?text=' + e.textContent;
        resulthome = await getapi(url_homophobia);
        let url_hate = site_url + '/ishate?text=' + e.textContent;
        resulthate = await getapi2(url_hate);
        if (typeof resulthome !== 'undefined' && resulthome['ishomophobia'] == true){
            chrome.storage.local.set({'type': 'homophobia'}, function() {
                console.log('Value is set to ' + value);
            });
            e.innerHTML = ""; // Remove text
        }
        else if (typeof resulthate !== 'undefined' && resulthate['HATE'] > 0.4){
            chrome.storage.local.set({'type': 'hate'}, function() {
                console.log('Value is set to ' + value);
            });
            e.innerHTML = ""; // Remove text
        }
        else {
            
        }
      });
    }

    function tick() {
        let urlofpage = document.URL;
        if (urlofpage.includes('twitter')){
            checkWords('twitter');
        }
        else if (urlofpage.includes('reddit')){
            checkWords("reddit");
        }
        else if (urlofpage.includes('facebook')){
            checkWords('facebook');
        }
        else if (urlofpage.includes('instagram')){
            checkWords('instagram');
        }
        else if (urlofpage.includes('youtube')){
            checkWords('youtube');
        }
        else {
            checkWords('none');
        }
        window.setTimeout(tick, 5000);
    }
  
    tick();
})();