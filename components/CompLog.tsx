



type logprops={
    fallo:boolean;
}


export default function CompLog(props:logprops){


    return(
<html>
    <body>
        <div class="login-container">
            <h2>Login</h2>
            {props.fallo==true &&
            <p class="error-message">Incorrect credentials or user does not exist</p>}
            <form method="POST" action="/login">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" required/>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required/>
                <button type="submit">Login</button>
                <p class="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    </body>
</html>

    );

}