


const ShowEachSavedResult = (e) => {
    
 //console.log(e.target.innerText)
 localStorage.setItem('SavedAs-Name', e.target.innerText)
 document.getElementById('ToSavedResult').click()
}


export default ShowEachSavedResult