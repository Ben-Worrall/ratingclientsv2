






const EditValues = (e) => {
     document.getElementById('EditValuePopup').style.display = ""
     document.getElementById('EditValuePopupBG').style.display = ""
    //console.log(e.target.previousSibling)
     //determine if its saved as or client name
      if(e.target.previousSibling.id == "ClientName-Text"){


      console.log('change clients name')
      document.getElementById('EditValuePopup').placeholder = "Client's Name"


      }else if(e.target.previousSibling.id == "SavedAs-Text"){


        document.getElementById('EditValuePopupBG').placeholder = "Saved As"
        console.log('change Saved As name')


      }


}



export default EditValues

