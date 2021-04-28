
function CallTestAPI(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer EwCAA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAUEtMgVC5vo+MBNWIT0gztyZT3mDQuKdMLDdMJyiVoutooBDqGBrJc3UOT7Zm4JldTjtmjaeWtM8UKo330urTMq86R+X2uTVsPe3YSTzQqpEpq9mTiY8j8pnVZBkruw3Xlon5sgvUrIZVho2R8yRXLlrNkAXRh6CgYg7eW2SWYkfwkuVr1mJM67dmAIceYqKFTRmnsrSowihoY07gu2flKA52dMUuIBB1Poiv/maP27VdjfYVjHFmBygStDMqKb9WYOIlKVltMr2d/6xD3aq7iRLzpRVTrYeqt7cCcnDBuMgBxNLPBP5Gtd8fJFnKTAmNo2OU8Yut7EB3INB1SltpUcDZgAACKEt5uxTGpRIUALg/mQCLeRbDi2mdbC3DsBWjcPGiZvkz/fRr/JiAk2lvmmEPgQXzcb3iYNiyc5/dYOWRXeDB02eaeAHsYC4SCCIjrFI1YIgnACyxemY4coPy5o92bePZc9XjcafO+A9wTEAPtnb0ppmcZb9mb3tnJxs7Yvl8slEl11SqF2sCQ49heyxFHlb2s/lzlNp6ahm2h28dNwocxeMgve0G0D85VtIueqcZUDiAGdcf5bW6DsJzPidBvk3rjXrjuW5/jTxCIwKidQg9VosnLwBkAatSHsAmoa10Dtf0vgiHJRfMquHs6JPeb/rxmMOxnQwecTBBeNzE4ksPlOVenK+XEdKj73hJJZNolYp8XlGIdJnZRBYhe0XLbZPedscAWiH0Eqz9ALbgyF5ydpu2/iddDdSJR42YCgbc3dNOKcbOKWucID6GLtIvLQg42a70RNImivM8v7VRZQOMPB5mNqDgX0ejKFozJkRpvQdxN05MEo+3IbHfvXVZKnKrzX2qTE7p68N9vnZEBGOSGDIw5DU1TCugu4WDiJW1OBNJcvfGaA6WX+n9fjYjO1Rcb6K+vWV/s+CGTL+cjRawzhutZwHvsPWpNZEVbVEAxwEtRX04tdukMe9H2kTjX7A1UUMtVN8dlajOOSaBwi1s8A/1CB+1JI2JS9hCfWl4X45YqYeb8N9lFnCGWoySPz2kUmGbbrOpXJF0TWUKbuk9Jzl2wsouXlU9nzX6KQ6d3BYUeVFldID2i9eZJXGUI2gfQkTLkoMV4n4CLHw+BcVqdmAn1Hjguncfm1xnwI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://graph.microsoft.com/v1.0/me/drive/root/search(q='test')?select=name,id,webUrl", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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