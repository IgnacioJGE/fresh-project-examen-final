
export default function   Logout(){
function handleclick(){
document.cookie="auth=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
window.location.href="/"
}
return(  
<a class="logout-button" onClick={()=>handleclick()}>Logout</a>
);
    
}