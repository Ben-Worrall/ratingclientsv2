

const ConfirmNoSave = () => {
    function closePopup(){
        document.getElementById('BackgroundClose').remove()
        document.getElementById('ClosePOPUP').remove()
    }
    function CloseServer(){
        document.getElementById('goHomNoSave').click()
    }


    //console.log('test')
    //show popup
    let div1111 = document.createElement('div')
    div1111.id = "ClosePOPUP"
    //background for popup
    let div2222 = document.createElement('div')
    div2222.id = "BackgroundClose"
    div2222.onclick = closePopup
    //text for the popup
    let div3333 = document.createElement('div')
    div3333.innerText = "Are you sure you want to close the server without saving?"
    div3333.id = "ClosePopupText"
    //button to confirm
    let div4444 = document.createElement('button')
    div4444.innerText = "Close Server without saving"
    div4444.id = "CloseServerBNT"
    div4444.onclick = CloseServer
    



     div1111.appendChild(div3333)
     div1111.appendChild(div4444)
    document.getElementById('HostRoomMainDisplay').appendChild(div1111)
    document.getElementById('HostRoomMainDisplay').appendChild(div2222)




    //document.getElementById('goHomNoSave').click()

}

export default ConfirmNoSave