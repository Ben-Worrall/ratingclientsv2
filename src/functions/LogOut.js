const LogOut = () => {

    localStorage.setItem('logged-in', "false")
    window.location.reload()

}


export default LogOut
