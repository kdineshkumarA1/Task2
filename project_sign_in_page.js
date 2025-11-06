 const form=document.getElementById('sign-form')
 form.addEventListener('submit', async function(event)
{
    event.preventDefault();
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value.trim();
    if(!email || !password){
        alert('please enter both email and password')
        return;
    }
    try{
        const res=await fetch(`http://localhost:3000/api/login?email=${email}&password=${password}`,{method:"get"});
        let data;
        const rawText = await res.text();
        console.log("Raw response:", rawText);
        try {
            data = JSON.parse(rawText);} catch (err) {
            console.error("Invalid JSON from server");
            alert("Server returned invalid JSON");
            return;
            }
        console.log("Response:", res.status, data);
        if(res.ok)
        {
            alert('login successfull')
            <a href="application.html"></a>
        }
        else{
            alert(data.message || "invalid email or passwor");

        }
    }
        catch(err){
            console.error("Fetch error:", err.message);
            alert("Network error: " + err.message);
        }
});