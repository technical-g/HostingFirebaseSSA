
//constant path for oneDrive API
const apiPath = {
    microsoftGraph : "https://graph.microsoft.com/v1.0",

    searchKeywordTest : "/me/drive/root/search(q='test')?select=name,id,webUrl",
    getUserInfoByEmail : "/users/",
    getShared :"/shares/"

};


function callTestAPI(){

    var myHeaders = new Headers();

    getTokenRedirect(tokenRequest)
      .then(response => {
          
          myHeaders.append("Authorization", "Bearer " + response.accessToken);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch(apiPath.microsoftGraph + apiPath.searchKeywordTest, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

      }).catch(error => {
        console.error(error);
      });

}  

/*


*/
function getuserByEmail(){
    var myHeaders = new Headers();
    //get email from input of index.html
    var email = document.getElementById("emailForSearch").value ;

    getTokenRedirect(tokenRequest)
      .then(response => {
          
          myHeaders.append("Authorization", "Bearer " + response.accessToken);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch(apiPath.microsoftGraph + apiPath.getUserInfoByEmail+email, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }).catch(error => {
        console.error(error);
    });

}

function getSharedItem(){

    //LinkToTest = https://1drv.ms/f/s!AnDGcocSJpo9ijROFXg33pkOWnOm

    var myHeaders = new Headers();
    var sharedLink = document.getElementById("SharedLinkInput").value ;  
    var fetchedResult = [];

    //Encode link to base64    
    var base64Link = window.btoa(sharedLink);

    //Remove if link end with =
    if(base64Link.endsWith("=")){
        base64Link = base64Link.slice(0, -1);
    }

    //Replace / with _ and Replace + with -
    var finalLink = "u!" + base64Link.replace("/", "_").replace("+","-");

    console.log('Final Link : ' + finalLink);

    //Start call api

    getTokenRedirect(tokenRequest)
      .then(response => {
          myHeaders.append("Authorization", "Bearer " + response.accessToken);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch(apiPath.microsoftGraph + apiPath.getShared + finalLink + "/driveItem?$expand=children" , requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(result => fetchedResult.appendData(result))
            .catch(error => console.log('error', error));

    }).catch(error => {
        console.error(error);
    });
    

    document.getElementById("displayValue").innerHTML = fetchedResult[0];

}


/*function calOneDriveAPI(pathAccess) {

    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    

    var root = "https://api.onedrive.com/v1.0/drive/root:";
    var path = "/Documents/My Files/#nine.docx";
    var url = root + escape(path);

    var token = response.accessToken;
    

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to onedriveAPI at: ' + new Date().toString());

    fetch(url, options)
        .then(response => response.json())
        //.then(response => callback(response, endpoint))
        .catch(error => console.log(error));
}  */