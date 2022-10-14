const request = require("request");
const Account = require("models/Account");

const admin_account = "0xC14656C3e35e0f53095021958e74e909D14C413C"; // 관리자 account

const image_url = "image_url";
const image_preview_url = "image_preview_url";
const image_thumbnail_url = "image_thumbnail_url";
const image_original_url = "image_original_url";

exports.returnListNFT = async (ctx) => {
    const { Userid } = ctx.params;
    console.log(Userid);
    let account = await Account.findByNickname(Userid);
    let url = "https://testnets-api.opensea.io/api/v1/assets?owner=" 
        + account.walletAddress + "&offset=0&include_orders=false";
    
    // const options = {
    //     uri: url
    // };
    const options = {
        uri: 'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false'
    };

    request.get(options, (error, response, body) => {
        console.log("error : ", error);
        var request_body = body;
        var wallet = JSON.parse(request_body);
        wallet = wallet['assets'];
        
        let nft_list = [];
        // console.log(wallet);
        // console.log(typeof(wallet['assets']));
        for (nft in wallet){
            // console.log("nfts: ", nfts, ", nft: ", nft);
            // console.log("id : ", wallet[nft]["id"]);
            // console.log("img : ", wallet[nft][image_url]);
            // console.log("creator : ", wallet[nft]["creator"]["address"]);
            // console.log(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
            if (wallet[nft]["creator"] != null){
                // if (wallet[nft]["creator"]["address"] == "0xbc19ffef966bff35cb0fee54741fef4f1a33662a"){
                //     nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
                //     console.log("creator : ", wallet[nft]["creator"]["address"]);
                // }

                // if (wallet[nft]["creator"]["address"] == admin_account){
                //     nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
                //     console.log("creator : ", wallet[nft]["creator"]["address"]);
                // }
                nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
            }
        }                
        console.log(nft_list);
        ctx.body = nft_list;
        ctx.status = 200;
    });
    // const temp = new Promise((resolve, reject) => {
    //     try{
    //         request.get(options, (error, response, body) => {
    //             var request_body = body;
    //             var wallet = JSON.parse(request_body);
    //             wallet = wallet['assets'];
                
    //             let nft_list = [];
    //             // console.log(wallet);
    //             // console.log(typeof(wallet['assets']));
    //             for (nft in wallet){
    //                 // console.log("nfts: ", nfts, ", nft: ", nft);
    //                 // console.log("id : ", wallet[nft]["id"]);
    //                 // console.log("img : ", wallet[nft][image_url]);
    //                 // console.log("creator : ", wallet[nft]["creator"]["address"]);
    //                 // console.log(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
    //                 if (wallet[nft]["creator"] != null){
    //                     // if (wallet[nft]["creator"]["address"] == "0xbc19ffef966bff35cb0fee54741fef4f1a33662a"){
    //                     //     nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
    //                     //     console.log("creator : ", wallet[nft]["creator"]["address"]);
    //                     // }

    //                     // if (wallet[nft]["creator"]["address"] == admin_account){
    //                     //     nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
    //                     //     console.log("creator : ", wallet[nft]["creator"]["address"]);
    //                     // }
    //                     nft_list.push(JSON.parse('{ "img" : "' + wallet[nft][image_url] + '" }'));
    //                 }
    //             }                
    //             resolve(nft_list);
    //         });
    //     }catch(e){
    //         reject(e);
    //     }
    // });

    // temp
    // .then(nft_list => {
    //     console.log(nft_list);
    //     ctx.body = nft_list;
    // })
};