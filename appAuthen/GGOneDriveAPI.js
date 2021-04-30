
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

/*
This function to get file and information of shared link that inputted on screen

*/
function getSharedItem(){

    var myHeaders = new Headers();
    var sharedLink = document.getElementById("SharedLinkInput").value ;  
    var fetchedResult;

    /*  To get Final Link of API
        - Encode link to base64    
        - Remove if link end with =
        - Replace / with _ and Replace + with - */
    var base64Link = window.btoa(sharedLink);
    if(base64Link.endsWith("=")){
        base64Link = base64Link.slice(0, -1);
    }
    var finalLink = "u!" + base64Link.replace("/", "_").replace("+","-");


    //Get Token and Fetch API To get data of Shared Link!
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
            .then(result => {
                fetchedResult = result;
                //console.log('LOG Here :: ' + fetchedResult);
                //console.log(typeof fetchedResult);
                getSharedItemResult(result);
            })
            .catch(error => console.log('error', error));

    }).catch(error => {
        console.error(error);
    });

}

function getSharedItemResult(textResult){
    //console.log('textResult!!!!!!' + textResult);
    var obj = JSON.parse(textResult);
    //document.getElementById("displayValue").innerHTML = obj["cTag"]; << อันนี้ใช้ได้
    // console.log(obj["children"][0]["name"])<< อันนี้ใช้ได้

    
    console.log(typeof obj["children"]);
    console.log('length: ' + obj["children"].length);

    
    
    for(i=0 ; i<obj["children"].length; i++){

        document.getElementById("displayValue").innerHTML += obj["children"][i]["name"] + " ";

    }
}