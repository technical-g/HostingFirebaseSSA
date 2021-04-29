
//constant path for oneDrive API
const apiPath = {
    microsoftGraph : "https://graph.microsoft.com/v1.0",

    searchKeywordTest : "/me/drive/root/search(q='test')?select=name,id,webUrl",
    getUserInfoByEmail : "/users/"

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