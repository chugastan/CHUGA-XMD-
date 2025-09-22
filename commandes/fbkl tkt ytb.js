const {zokou} = require('../framework/zokou');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

zokou({nomCom : "igdl" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Veillez ins茅rer un lien video instagramme');return}; 

  try {
     
    let igvid = await axios('https://api.vihangayt.com/downloader/ig?url='+link)

    if (igvid.data.data.data[0].type == 'video') {
    zk.sendMessage(dest,{video : {url : igvid.data.data.data[0].url},caption : "ig video downloader powered by *饾懝饾懆饾懐饾懘饾懆饾懙饾懓_饾懘饾懌*",gifPlayback : false },{quoted : ms}) 
    }
    else {
        zk.sendMessage(dest,{image : {url : igvid.data.data.data[0].url},caption : "ig image downloader powered by *饾懝饾懆饾懐饾懘饾懆饾懙饾懓_饾懘饾懌*"})
    }
  
  } catch (e) {repondre("erreur survenue lors du t茅l茅chargement \n " + e)}
  
});


zokou({
  nomCom: "fbdl",
  categorie: "Download",
  reaction: "馃摻锔�"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: 'facebook video downloader powered by *饾懝饾懆饾懐饾懘饾懆饾懙饾懓_饾懘饾懌*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du t茅l茅chargement de la vid茅o :', error);
    repondre('Erreur lors du t茅l茅chargement de la vid茅o.' , error);
  }
});



zokou({ nomCom: "tiktok", categorie: "Download", reaction: "馃幍" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('https://api.onesytex.my.id/api/tiktok-dl='+ videoUrl) ;

  let tik = data.data.data

      // Envoi du message avec le thumbnail de la vid茅o
      const caption = `
Author: ${tik.author}
Description: ${tik.desc}
      `;

         
      zk.sendMessage(dest, { video: { url: tik.links[0].a} , caption : caption },{quoted : ms});    

  
});

zokou({
  nomCom: "fbdl2",
  categorie: "Download",
  reaction: "馃摻锔�"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link! !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: 'facebook video downloader powered by *饾懝饾懆饾懐饾懘饾懆饾懙饾懓_饾懘饾懌*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Erreur lors du t茅l茅chargement de la vid茅o :', error);
    repondre('Erreur lors du t茅l茅chargement de la vid茅o.' , error);
  }
});
