
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
                //console.log('LOG Here :: ' + result);
                //console.log(typeof fetchedResult);
                getSharedItemResult(result);
            })
            .catch(error => console.log('error', error));

    }).catch(error => {
        console.error(error);
    });

}

/*
    This function will display value of Item from Fetch SharedFolder API
*/

function getSharedItemResult(textResult){

    var obj = JSON.parse(textResult);
    //document.getElementById("displayValue").innerHTML = obj["cTag"]; << อันนี้ใช้ได้
    // console.log(obj["children"][0]["name"])<< อันนี้ใช้ได้    
    //onsole.log(typeof obj["children"]);
    //console.log('length: ' + obj["children"].length);

    const tabList = document.getElementById("list-tab");
    tabList.innerHTML = ''; // clear tabList at each readMail call
    
    
    for(i=0 ; i<obj["children"].length; i++){

        console.log("i = " + i + " : " + obj["children"][i]["@microsoft.graph.downloadUrl"]);
        //document.getElementById("displayValue").innerHTML += obj["children"][i]["name"] + "\n";

        const listItem = document.createElement("a");
        listItem.setAttribute("class", "list-group-item list-group-item-action")
        listItem.setAttribute("id", "listItem" + i)
        //listItem.setAttribute("data-toggle", "list") This line make tag a can't go to downloadUrl
        if(obj["children"][i]["@microsoft.graph.downloadUrl"] == null){
            
        }else{
            listItem.setAttribute("href", obj["children"][i]["@microsoft.graph.downloadUrl"])
        }
        listItem.setAttribute("role", "tab")
        listItem.setAttribute("aria-controls", i)
        listItem.innerHTML = obj["children"][i]["name"];
        tabList.appendChild(listItem)
    }

}

